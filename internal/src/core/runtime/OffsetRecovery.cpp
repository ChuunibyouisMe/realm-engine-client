#include "pch-il2cpp.h"
#include "OffsetRecovery.h"
#include "RuntimeOffsets.h"
#include "BootGate.h"
#include "DbgFileLog.h"

#include "minhook/MinHook.h"
#include <windows.h>
#include <cstdint>
#include <cmath>
#include <cstring>

namespace {

// The projectile spawn method. We own it only while degraded; the feature hook is
// gated off then, so the two never install simultaneously.
//
// We do NOT look it up by name. Verified against the live 2026-07-16 metadata: the
// old name (KOBMINBDOBD) and EVERY other registry name is gone — BeeByte re-randomises
// them every patch, including the `ProjectileProperties` anchor the structural class
// scan keys off. What a rename cannot touch is the method's SHAPE, because changing it
// would change the game's own behaviour. So we search for the signature instead:
//
//   12 params: (ref, ref, i4, u4, r4, i4, ref, ref, r4, r4, bool, bool)
//     [0] objProps  [1] projProps  [2] attackerObjId [3] ownerObjId  [4] angle
//     [5] bulletId  [6] name       [7] group         [8] startX      [9] startY
//     [10] canHitPlayer  [11] isAbility
//
// The match hands us everything with no names at all: the DECLARING class is the
// projectile class, and param[1]'s class is ProjectileProperties.
constexpr int kSpawnParams = 12;

// IL2CPP type kinds (il2cpp-types.h).
constexpr int  kType_BOOLEAN = 0x02;
constexpr int  kType_I4      = 0x08;
constexpr int  kType_U4      = 0x09;
constexpr int  kType_R4      = 0x0c;
constexpr int  kType_STRING  = 0x0e;
constexpr int  kType_CLASS   = 0x12;
constexpr int  kType_SZARRAY = 0x1d;
constexpr int  kType_OBJECT  = 0x1c;
constexpr int  kCommitVotes  = 3;   // consecutive consistent samples before commit

// Retry cadence for the (expensive) assembly-wide signature walk. The projectile
// types don't exist until a world loads, so a boot-time scan legitimately finds
// nothing — it must keep trying rather than latch.
constexpr uint64_t kScanRetryMs = 3000;

using SpawnFn = void* (__fastcall*)(void*, void*, void*, int32_t, uint32_t, float,
                                    int32_t, void*, void*, float, float, bool, bool, void*);

SpawnFn g_orig      = nullptr;
void*   g_target    = nullptr;
bool    g_installed = false;
bool    g_mhInit    = false;

const MethodInfo* g_spawn      = nullptr;   // resolved by signature, never by name
uint64_t          g_lastScanMs = 0;

// One renamed field we recover by matching a live value to a known ground truth.
struct Target {
    uint32_t*   outPtr;      // RuntimeOffsets offset var to write on commit
    const char* name;        // for the log
    bool        wantFloat;   // true = match a float arg; false = match a pointer arg
    bool        recovered;
    uint32_t    candidate;   // current best-guess offset
    int         confidence;  // consecutive consistent matches for `candidate`
};

// v1: the param-matchable projectile fields (exact + varies per shot -> converges
// fast, no thresholds). More fingerprints (radius cross-ref, age behavioural) plug
// in here later.
Target g_targets[] = {
    { &RuntimeOffsets::Hbeak_Angle,        "Projectile angle",   true,  false, 0, 0 },
    { &RuntimeOffsets::Hbeak_ProjPropsPtr, "Projectile props*",  false, false, 0, 0 },
};
constexpr int kTargetCount = static_cast<int>(sizeof(g_targets) / sizeof(g_targets[0]));

bool AddrOk(const void* p) {
    const uintptr_t a = reinterpret_cast<uintptr_t>(p);
    return a > 0x10000 && a < 0x7FFFFFFFFFFFULL;
}

// SEH-guarded raw reads — a wrong candidate offset must never fault the game thread.
bool SafeReadU32(const void* base, uint32_t off, uint32_t& out) {
    if (!AddrOk(base)) return false;
    __try { out = *reinterpret_cast<const uint32_t*>(reinterpret_cast<const uint8_t*>(base) + off); return true; }
    __except (EXCEPTION_EXECUTE_HANDLER) { return false; }
}
bool SafeReadPtr(const void* base, uint32_t off, void*& out) {
    if (!AddrOk(base)) return false;
    __try { out = *reinterpret_cast<void* const*>(reinterpret_cast<const uint8_t*>(base) + off); return true; }
    __except (EXCEPTION_EXECUTE_HANDLER) { return false; }
}

// The single field offset on cls (+ parents) whose live value == want. Returns 0
// on no match OR ambiguity (>1 match) so we never commit a coincidence.
uint32_t MatchFloatField(Il2CppClass* cls, void* inst, float want) {
    uint32_t hit = 0; int hits = 0;
    for (Il2CppClass* k = cls; k; k = il2cpp_class_get_parent(k)) {
        void* it = nullptr;
        for (FieldInfo* f; (f = il2cpp_class_get_fields(k, &it)) != nullptr; ) {
            const Il2CppType* ft = il2cpp_field_get_type(f);
            if (!ft || il2cpp_type_get_type(ft) != kType_R4) continue;
            const uint32_t off = static_cast<uint32_t>(il2cpp_field_get_offset(f));
            uint32_t raw; if (!SafeReadU32(inst, off, raw)) continue;
            float v; std::memcpy(&v, &raw, sizeof(v));
            if (std::isfinite(v) && std::fabs(v - want) < 1e-4f) { hit = off; if (++hits > 1) return 0; }
        }
    }
    return hits == 1 ? hit : 0;
}
uint32_t MatchPtrField(Il2CppClass* cls, void* inst, void* want) {
    if (!AddrOk(want)) return 0;
    uint32_t hit = 0; int hits = 0;
    for (Il2CppClass* k = cls; k; k = il2cpp_class_get_parent(k)) {
        void* it = nullptr;
        for (FieldInfo* f; (f = il2cpp_class_get_fields(k, &it)) != nullptr; ) {
            const Il2CppType* ft = il2cpp_field_get_type(f);
            if (!ft) continue;
            const int tk = il2cpp_type_get_type(ft);
            if (tk != kType_CLASS && tk != kType_OBJECT) continue;
            const uint32_t off = static_cast<uint32_t>(il2cpp_field_get_offset(f));
            void* v; if (!SafeReadPtr(inst, off, v)) continue;
            if (v == want) { hit = off; if (++hits > 1) return 0; }
        }
    }
    return hits == 1 ? hit : 0;
}

void Vote(Target& t, uint32_t off) {
    if (off == 0) return;
    if (off == t.candidate) {
        if (++t.confidence >= kCommitVotes && !t.recovered &&
            RuntimeOffsets::CommitRecoveredOffset(t.outPtr, off)) {
            t.recovered = true;
            DBG_FILE_LOG("[OffsetRecovery] " << t.name << " recovered -> 0x" << std::hex << off
                << std::dec << " (" << kCommitVotes << " consistent samples)");
        }
    } else {
        t.candidate  = off;
        t.confidence = 1;
    }
}

void SampleProjectile(void* inst, float angle, void* projProps) {
    Il2CppClass* cls = RuntimeOffsets::GetRecoveredProjClass();
    if (!cls || !AddrOk(inst)) return;
    for (int i = 0; i < kTargetCount; ++i) {
        Target& t = g_targets[i];
        if (t.recovered) continue;
        const uint32_t off = t.wantFloat ? MatchFloatField(cls, inst, angle)
                                         : MatchPtrField(cls, inst, projProps);
        Vote(t, off);
    }
}

void* __fastcall RecoverySpawnDetour(void* projInstance, void* objProps, void* projProps,
    int32_t attackerObjId, uint32_t ownerObjId, float angle, int32_t bulletId, void* name,
    void* group, float startX, float startY, bool canHitPlayer, bool isAbility, void* methodInfo)
{
    void* ret = g_orig(projInstance, objProps, projProps, attackerObjId, ownerObjId, angle,
                       bulletId, name, group, startX, startY, canHitPlayer, isAbility, methodInfo);
    // Sample-only. The whole scan is SEH-wrapped so a bad candidate offset degrades
    // to "no match this frame" instead of faulting the game thread.
    __try { SampleProjectile(projInstance, angle, projProps); }
    __except (EXCEPTION_EXECUTE_HANDLER) {}
    return ret;
}

bool AllDone() {
    for (int i = 0; i < kTargetCount; ++i) if (!g_targets[i].recovered) return false;
    return true;
}

bool IsRefKind(int tk) {
    return tk == kType_CLASS || tk == kType_OBJECT || tk == kType_STRING || tk == kType_SZARRAY;
}

// Does `m` have the spawn shape? Only the unambiguously-typed slots are constrained;
// that pattern is specific enough on its own, and pinning the ref slots to exact
// classes would just re-introduce a rename dependency.
bool HasSpawnSignature(const MethodInfo* m) {
    if (!m) return false;
    if (il2cpp_method_get_param_count(m) != static_cast<uint32_t>(kSpawnParams)) return false;
    static const int kWant[kSpawnParams] = {
        -1,       -1,       kType_I4, kType_U4,      kType_R4,      kType_I4,
        -1,       -1,       kType_R4, kType_R4,      kType_BOOLEAN, kType_BOOLEAN
    };
    for (int i = 0; i < kSpawnParams; ++i) {
        const Il2CppType* pt = il2cpp_method_get_param(m, static_cast<uint32_t>(i));
        if (!pt) return false;
        const int tk = il2cpp_type_get_type(pt);
        if (kWant[i] < 0) { if (!IsRefKind(tk)) return false; }
        else if (tk != kWant[i])                return false;
    }
    return true;
}

struct ScanCtx { const MethodInfo* found; Il2CppClass* cls; int hits; int classes; };

// Walk every class the runtime knows and find the spawn method by shape alone.
// This has to run in-process: the on-disk global-metadata.dat header is encrypted,
// so the same search cannot be done offline — but the live runtime has already
// decrypted everything for us.
void ResolveSpawnBySignature() {
    ScanCtx ctx{ nullptr, nullptr, 0, 0 };
    il2cpp_class_for_each([](Il2CppClass* klass, void* ud) {
        auto* c = static_cast<ScanCtx*>(ud);
        ++c->classes;
        if (c->hits > 1) return;                     // already ambiguous
        void* it = nullptr;
        __try {
            for (const MethodInfo* m; (m = il2cpp_class_get_methods(klass, &it)) != nullptr; ) {
                if (!HasSpawnSignature(m)) continue;
                if (++c->hits == 1) { c->found = m; c->cls = klass; }
            }
        } __except (EXCEPTION_EXECUTE_HANDLER) {}    // a half-built class must not kill the scan
    }, &ctx);

    if (ctx.hits == 1 && ctx.found && ctx.found->methodPointer && ctx.cls) {
        const char* mn = il2cpp_method_get_name(ctx.found);
        const char* cn = il2cpp_class_get_name(ctx.cls);
        DBG_FILE_LOG("[OffsetRecovery] spawn method FOUND by signature — class='" << (cn ? cn : "?")
            << "' method='" << (mn ? mn : "?") << "' (scanned " << ctx.classes
            << " classes; matched on shape alone, zero names)");
        g_spawn = ctx.found;
        RuntimeOffsets::AdoptProjectileClass(ctx.cls);
        return;
    }
    DBG_FILE_LOG("[OffsetRecovery] spawn method NOT resolved — " << ctx.hits << " signature match(es) across "
        << ctx.classes << " classes"
        << (ctx.hits > 1 ? "; AMBIGUOUS, refusing to guess (tighten the signature)"
                         : "; projectile types likely not created until a world loads — will retry"));
}

// NOTE: every bail here logs. The previous version returned silently on each failure,
// so a 184 MB trace contained ZERO OffsetRecovery lines while it bailed every frame —
// the bug was invisible for two days. A recovery tool that cannot say why it failed
// is not a recovery tool.
void Install() {
    if (g_installed) return;
    if (!g_spawn || !g_spawn->methodPointer) return;   // ResolveSpawnBySignature logs this case
    if (!g_mhInit) {
        const MH_STATUS s = MH_Initialize();
        if (s != MH_OK && s != MH_ERROR_ALREADY_INITIALIZED) {
            DBG_FILE_LOG("[OffsetRecovery] MH_Initialize failed (status=" << s << ") — cannot sample");
            return;
        }
        g_mhInit = true;
    }
    g_target = reinterpret_cast<void*>(g_spawn->methodPointer);
    g_orig   = reinterpret_cast<SpawnFn>(g_target);
    const MH_STATUS cs = MH_CreateHook(g_target, reinterpret_cast<void*>(&RecoverySpawnDetour),
                                       reinterpret_cast<void**>(&g_orig));
    if (cs != MH_OK) {
        DBG_FILE_LOG("[OffsetRecovery] MH_CreateHook failed (status=" << cs << ") on the signature-resolved spawn method");
        g_target = nullptr; return;
    }
    const MH_STATUS es = MH_EnableHook(g_target);
    if (es != MH_OK) {
        DBG_FILE_LOG("[OffsetRecovery] MH_EnableHook failed (status=" << es << ")");
        MH_RemoveHook(g_target); g_target = nullptr; return;
    }
    g_installed = true;
    DBG_FILE_LOG("[OffsetRecovery] sampling detour INSTALLED — fingerprinting projectile fields from live shots");
}

void Uninstall() {
    if (!g_installed) return;
    if (g_target) { MH_DisableHook(g_target); MH_RemoveHook(g_target); }
    g_installed = false;
    g_target = nullptr;
    DBG_FILE_LOG("[OffsetRecovery] sampling detour REMOVED (recovery done or game healthy)");
}

} // namespace

namespace OffsetRecovery {

void Tick() {
    // On while the game is broken and there is still something to recover; off once
    // everything is found (or the game is healthy again).
    const bool needed = BootGate::Degraded() && !AllDone();
    if (!needed) { Uninstall(); return; }

    // Nothing can be sampled until the spawn method is located. Resolving it can
    // legitimately fail early (the projectile types don't exist until a world loads),
    // so retry on a throttle rather than latching — the previous one-shot scan burned
    // its only attempt ~90ms into boot and never recovered for the rest of the session.
    if (!g_spawn) {
        const uint64_t now = GetTickCount64();
        if (g_lastScanMs == 0 || now - g_lastScanMs >= kScanRetryMs) {
            g_lastScanMs = now;
            ResolveSpawnBySignature();
        }
        if (!g_spawn) return;
    }
    Install();
}

bool IsActive() { return g_installed; }

void GetProgress(int& recovered, int& total) {
    total = kTargetCount;
    recovered = 0;
    for (int i = 0; i < kTargetCount; ++i) if (g_targets[i].recovered) ++recovered;
}

} // namespace OffsetRecovery
