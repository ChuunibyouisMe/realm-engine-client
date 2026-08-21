#include "pch-il2cpp.h"

#include "EnemyTracker.h"
#include "GameState.h"
#include "RuntimeOffsets.h"

#include <windows.h>
#include <atomic>
#include <cmath>
#include <cstdint>
#include <unordered_map>
#include <vector>

namespace {

// ── Offset aliases ───────────────────────────────────────────────────────────
static const uint32_t& kOffPosX          = RuntimeOffsets::PosX;
static const uint32_t& kOffPosY          = RuntimeOffsets::PosY;
static const uint32_t& kOffHp            = RuntimeOffsets::HP;
static const uint32_t& kOffMaxHp         = RuntimeOffsets::MaxHP;
static const uint32_t& kOffObjProps      = RuntimeOffsets::ObjProps;
static const uint32_t& kOffOpIsEnemy     = RuntimeOffsets::OP_IsEnemy;
static const uint32_t& kOffOpNoHealthBar = RuntimeOffsets::OP_NoHealthBar;
static const uint32_t& kOffOpInvincElem  = RuntimeOffsets::OP_InvincibleElem;
static const uint32_t& kOffObjType       = RuntimeOffsets::ObjType;
static const uint32_t& kOffWmDict        = RuntimeOffsets::WM_AllDict;

// IL2CPP Dictionary<int,T> layout constants
constexpr uint32_t kOffDictEnt  = 0x18;
constexpr uint32_t kOffDictCnt  = 0x20;
constexpr uint32_t kOffArrMax   = 0x18;
constexpr uint32_t kOffArrData  = 0x20;
constexpr int      kEntryStride = 24;

// ── Object type lists ────────────────────────────────────────────────────────
// Non-enemy entity types to reject outright, and whitelisted types that bypass
// the maxHp==200 decoy heuristic. Quest/fallback tiering lives in TargetSelector.
static constexpr int32_t kIgnoredTypes[]     = { 28491 };
static constexpr int32_t kWhitelistedTypes[] = { 31104 };

static bool IsIgnoredType(int32_t t) {
    for (int32_t v : kIgnoredTypes) if (v == t) return true;
    return false;
}
static bool IsWhitelistedType(int32_t t) {
    for (int32_t v : kWhitelistedTypes) if (v == t) return true;
    return false;
}

static inline bool AddrOk(const void* p) {
    const uintptr_t a = reinterpret_cast<uintptr_t>(p);
    return a > 0x10000 && a < 0x7FFFFFFFFFFFULL;
}

// ── Velocity tracking ────────────────────────────────────────────────────────
struct VelEntry {
    float     x = 0.f, y = 0.f;
    ULONGLONG t = 0;
    float     vx = 0.f, vy = 0.f;
};

static std::unordered_map<int32_t, VelEntry> s_velMap;
static ULONGLONG s_pruneAt = 0;

static constexpr float kServerTickMsMin  = 115.f;
static constexpr float kServerTickMsMax  = 290.f;
static constexpr float kMaxVelTilesPerMs = 0.1f;
static constexpr float kMoVelSmooth      = 0.65f;
static constexpr float kMaxInstTilesPerMs = 0.08f;

static void UpdateVelocity(int32_t id, float ex, float ey, ULONGLONG now, void* entity)
{
    float moVx = 0.f, moVy = 0.f;
    bool  haveMo = false;
    const uint32_t velOff = RuntimeOffsets::MoVelocity;
    if (velOff != 0 && AddrOk(entity)) {
        __try {
            uint8_t* ent = reinterpret_cast<uint8_t*>(entity);
            float rvx = *reinterpret_cast<float*>(ent + velOff);
            float rvy = *reinterpret_cast<float*>(ent + velOff + 4);
            // Only use MoVelocity when it reports actual movement — the field reads
            // 0.0 on enemies when the offset is wrong or the entity is stationary,
            // which would otherwise drive chord-estimated velocity toward 0 via blending.
            if (std::isfinite(rvx) && std::isfinite(rvy) &&
                fabsf(rvx) < kMaxVelTilesPerMs && fabsf(rvy) < kMaxVelTilesPerMs &&
                (fabsf(rvx) > 1e-5f || fabsf(rvy) > 1e-5f)) {
                moVx = rvx; moVy = rvy; haveMo = true;
            }
        } __except (EXCEPTION_EXECUTE_HANDLER) {}
    }

    static ULONGLONG s_lastCleanup = 0;
    if (now - s_lastCleanup > 3000) {
        s_lastCleanup = now;
        for (auto itClean = s_velMap.begin(); itClean != s_velMap.end(); ) {
            if (now - itClean->second.t > 2000) {
                itClean = s_velMap.erase(itClean);
            } else {
                ++itClean;
            }
        }
    }

    auto it = s_velMap.find(id);
    if (it == s_velMap.end()) {
        s_velMap[id] = { ex, ey, now, 0.f, 0.f };
        return;
    }

    VelEntry& e = it->second;
    const float dtSec = static_cast<float>(now - e.t) / 1000.0f;
    if (dtSec > 0.005f && dtSec < 0.35f) {
        const float vx = (ex - e.x) / dtSec; // tiles per second
        const float vy = (ey - e.y) / dtSec; // tiles per second
        const float speed = sqrtf(vx * vx + vy * vy);
        if (speed < 35.0f) {
            const float curVx = e.vx * 1000.f;
            const float curVy = e.vy * 1000.f;
            const float newVx = curVx * 0.25f + vx * 0.75f;
            const float newVy = curVy * 0.25f + vy * 0.75f;
            e.vx = newVx / 1000.f; // store as tiles per ms
            e.vy = newVy / 1000.f;
        }
        e.x = ex;
        e.y = ey;
        e.t = now;
    } else if (now - e.t > 200ULL) {
        e.vx = 0.f;
        e.vy = 0.f;
        e.x = ex;
        e.y = ey;
        e.t = now;
    }
}

// ── World scan helpers ───────────────────────────────────────────────────────
static bool SehReadLocalKlassAndPos(void* local, float* outX, float* outY, uint64_t* outKlass)
{
    __try {
        uint8_t* lp = reinterpret_cast<uint8_t*>(local);
        *outX   = *reinterpret_cast<float*>(lp + kOffPosX);
        *outY   = *reinterpret_cast<float*>(lp + kOffPosY);
        *outKlass = *reinterpret_cast<uint64_t*>(lp);
        return true;
    } __except (EXCEPTION_EXECUTE_HANDLER) { return false; }
}

struct CandidateOut {
    int32_t id, objType, hp, maxHp;
    float   x, y;
    bool    isInvulnerable, hasHealthBar;
    void*   ptr;
};

// Returns true if the dict entry describes a targetable enemy.
// Soft properties (invulnerable, hasHealthBar) are always populated so callers
// can apply their own targeting policies.
static bool SehReadCandidate(uint8_t* entry, void* local, uint64_t localKlass, CandidateOut& out)
{
    __try {
        if (*reinterpret_cast<int32_t*>(entry) < 0)
            return false;
        void* entity = *reinterpret_cast<void**>(entry + 16);
        if (!entity || entity == local)
            return false;
        if (*reinterpret_cast<uint64_t*>(entity) == localKlass)
            return false;

        void* objProps = *reinterpret_cast<void**>(reinterpret_cast<uint8_t*>(entity) + kOffObjProps);
        if (!AddrOk(objProps))
            return false;
        uint8_t* op  = reinterpret_cast<uint8_t*>(objProps);
        uint8_t* ent = reinterpret_cast<uint8_t*>(entity);

        if (!*reinterpret_cast<uint8_t*>(op + kOffOpIsEnemy))
            return false;

        // noHealthBar (walls/destructibles) — stored as metadata, not hard-rejected
        const uint8_t noHB = *reinterpret_cast<uint8_t*>(op + kOffOpNoHealthBar);

        // XML <Invincible/> — mark as invulnerable rather than hard-rejecting
        void* invPtr = *reinterpret_cast<void**>(op + kOffOpInvincElem);
        bool isInvuln = (invPtr && AddrOk(invPtr));

        const int32_t hp    = *reinterpret_cast<int32_t*>(ent + kOffHp);
        const int32_t maxHp = *reinterpret_cast<int32_t*>(ent + kOffMaxHp);
        if (hp <= 0 || maxHp <= 0 || hp > maxHp)
            return false;

        const int32_t objType = *reinterpret_cast<int32_t*>(ent + kOffObjType);
        if (!IsWhitelistedType(objType)) {
            if (maxHp == 200)
                return false;
            if (IsIgnoredType(objType))
                return false;
        }

        // Runtime condition check (Dead drops immediately; Stasis/Invincible/Invulnerable set isInvuln)
        uint32_t cond0 = 0, cond1 = 0;
        const bool condOk = RuntimeOffsets::TryReadMapObjectConditions(entity, &cond0, &cond1);
        if (condOk && (cond0 | cond1)) {
            const uint64_t full = RuntimeOffsets::GetFullConditions(cond0, cond1);
            if (RuntimeOffsets::HasCondition(full, RuntimeOffsets::ConditionEffects::Dead))
                return false;
            if (RuntimeOffsets::HasCondition(full, RuntimeOffsets::ConditionEffects::Stasis) ||
                RuntimeOffsets::HasCondition(full, RuntimeOffsets::ConditionEffects::Invincible) ||
                RuntimeOffsets::HasCondition(full, RuntimeOffsets::ConditionEffects::Invulnerable)) {
                isInvuln = true;
            }
        }

        const float ex2 = *reinterpret_cast<float*>(ent + kOffPosX);
        const float ey2 = *reinterpret_cast<float*>(ent + kOffPosY);
        if (!std::isfinite(ex2) || !std::isfinite(ey2) || (ex2 == 0.f && ey2 == 0.f))
            return false;

        out.id            = *reinterpret_cast<int32_t*>(entry + 8);
        out.objType       = objType;
        out.hp            = hp;
        out.maxHp         = maxHp;
        out.x             = ex2;
        out.y             = ey2;
        out.isInvulnerable = isInvuln;
        out.hasHealthBar  = (noHB == 0);
        out.ptr           = entity;
        return true;
    } __except (EXCEPTION_EXECUTE_HANDLER) { return false; }
}

// ── Frame state ──────────────────────────────────────────────────────────────
static std::vector<EnemyTracker::Entry> s_snapshot;
static std::atomic<int32_t>  s_localPlayerObjectId{ 0 };
static ULONGLONG             s_lastTickMs = 0;

} // namespace

namespace EnemyTracker {

void Tick()
{
    // Self-throttle: dedupes the aim path and EnumerateLiveEnemies callers within
    // a frame, and bounds the world-dict walk to ~125 Hz. On a throttled call the
    // previous snapshot (≤8 ms old) is kept rather than cleared.
    const ULONGLONG now = GetTickCount64();
    if (now - s_lastTickMs < 8ULL) return;
    s_lastTickMs = now;

    s_snapshot.clear();

    void* local = GameState::GetLocalPtr();
    if (!local) return;

    float px = 0.f, py = 0.f;
    uint64_t localKlass = 0;
    if (!SehReadLocalKlassAndPos(local, &px, &py, &localKlass) || localKlass == 0)
        return;

    void* wm = GameState::GetWorldMgr();
    if (!AddrOk(wm)) return;

    void* allDict = nullptr;
    __try { allDict = *reinterpret_cast<void**>(reinterpret_cast<uint8_t*>(wm) + kOffWmDict); }
    __except (EXCEPTION_EXECUTE_HANDLER) { return; }
    if (!AddrOk(allDict)) return;

    void*   entries = nullptr;
    int32_t count   = 0;
    __try {
        entries = *reinterpret_cast<void**>(reinterpret_cast<uint8_t*>(allDict) + kOffDictEnt);
        count   = *reinterpret_cast<int32_t*>(reinterpret_cast<uint8_t*>(allDict) + kOffDictCnt);
    } __except (EXCEPTION_EXECUTE_HANDLER) { return; }
    if (!AddrOk(entries) || count <= 0) return;

    int32_t maxLen = 0;
    __try { maxLen = *reinterpret_cast<int32_t*>(reinterpret_cast<uint8_t*>(entries) + kOffArrMax); }
    __except (EXCEPTION_EXECUTE_HANDLER) { return; }

    const int32_t limit = (count < maxLen ? count : maxLen) < 4096
                        ? (count < maxLen ? count : maxLen) : 4096;

    uint8_t* base = reinterpret_cast<uint8_t*>(entries) + kOffArrData;

    s_snapshot.reserve(static_cast<size_t>(limit / 4));

    for (int32_t i = 0; i < limit; ++i) {
        uint8_t* entry = base + i * kEntryStride;

        // Opportunistically capture local player's dict key.
        // The entry at offset +8 is the dict key (object ID); +16 is the entity pointer.
        __try {
            if (*reinterpret_cast<int32_t*>(entry) >= 0) {
                void* ent = *reinterpret_cast<void**>(entry + 16);
                if (ent == local)
                    s_localPlayerObjectId.store(*reinterpret_cast<int32_t*>(entry + 8),
                                                std::memory_order_relaxed);
            }
        } __except (EXCEPTION_EXECUTE_HANDLER) {}

        CandidateOut cand{};
        if (!SehReadCandidate(entry, local, localKlass, cand))
            continue;

        UpdateVelocity(cand.id, cand.x, cand.y, now, cand.ptr);

        Entry e{};
        e.id             = cand.id;
        e.objType        = cand.objType;
        e.x              = cand.x;
        e.y              = cand.y;
        e.hp             = cand.hp;
        e.maxHp          = cand.maxHp;
        e.isInvulnerable = cand.isInvulnerable;
        e.hasHealthBar   = cand.hasHealthBar;
        e.ptr            = cand.ptr;

        // Populate velocity from the just-updated map
        auto it = s_velMap.find(cand.id);
        if (it != s_velMap.end()) {
            e.vx = it->second.vx;
            e.vy = it->second.vy;
        }
        s_snapshot.push_back(e);
    }

    // Prune stale velocity entries every 5 seconds
    if (now >= s_pruneAt) {
        s_pruneAt = now + 5000ULL;
        for (auto it2 = s_velMap.begin(); it2 != s_velMap.end();) {
            if (now - it2->second.t > 8000ULL) it2 = s_velMap.erase(it2);
            else ++it2;
        }
    }
}

const std::vector<Entry>& GetSnapshot() { return s_snapshot; }

void Enumerate(Callback cb, void* user)
{
    if (!cb) return;
    for (const Entry& e : s_snapshot) cb(e, user);
}

int32_t GetLocalPlayerObjectId()
{
    return s_localPlayerObjectId.load(std::memory_order_relaxed);
}

} // namespace EnemyTracker
