#include "pch-il2cpp.h"

#include "AimHooks.h"
#include "WeaponProfile.h"
#include "GameState.h"
#include "RuntimeOffsets.h"
#include "Il2CppResolver.h"
#include "minhook/MinHook.h"

#include <windows.h>
#include <atomic>
#include <cmath>
#include <cstdint>

namespace {

// ── IL2CPP method names ───────────────────────────────────────────────────────
static const char* kShootClass = "FKALGHJIADI";
static const char* kSWAMethod  = "EHGHCACPAGH"; // ShootWithAngle

static const uint32_t& kOffPosX = RuntimeOffsets::PosX;
static const uint32_t& kOffPosY = RuntimeOffsets::PosY;

// ── Weapon-specific proj IDs ──────────────────────────────────────────────────
static constexpr int32_t kProjIdCultStaff    = 0xB0EB; // Staff of Unholy Sacrifice
static constexpr int32_t kProjIdColossusSlash = 0xB106; // Sword of the Colossus

// ── Shared aim state (written each tick by AutoAim coordinator) ───────────────
static std::atomic<bool>  s_hasTarget{ false };
static std::atomic<float> s_targetX{ 0.f };
static std::atomic<float> s_targetY{ 0.f };
static std::atomic<bool>  s_reverseCultStaff{ false };
static std::atomic<bool>  s_offsetColossus{ false };
static std::atomic<bool>  s_enabled{ false };
static std::atomic<AimHooks::ShotAimResolver> s_resolver{ nullptr };

// ── Hook function-pointer types ───────────────────────────────────────────────
using ShootWithAngleFn = void(__fastcall*)(void*, float, void*);

static ShootWithAngleFn g_swaOrig   = nullptr;
static void*            g_swaTarget = nullptr;
static bool             s_installed = false;

static inline bool AddrOk(const void* p) {
    const uintptr_t a = reinterpret_cast<uintptr_t>(p);
    return a > 0x10000 && a < 0x7FFFFFFFFFFFULL;
}

static float ApplyWeaponTweaks(float angle)
{
    const int32_t pid = WeaponCalibrator::GetProfile().projId;
    if (s_reverseCultStaff.load(std::memory_order_relaxed) && pid == kProjIdCultStaff)
        angle += 3.14159265f;
    if (s_offsetColossus.load(std::memory_order_relaxed) && pid == kProjIdColossusSlash)
        angle += 0.f;
    return angle;
}

static bool ShouldRedirect(void* player)
{
    if (!s_enabled.load(std::memory_order_relaxed)) return false;
    if (!AddrOk(player)) return false;
    void* local = GameState::GetLocalPtr();
    return local && player == local;
}
// Deliberately not gated on s_hasTarget: that flag is written by the render
// thread, and consulting it here would make firing depend on the render thread
// still ticking — the coupling this change exists to remove. The resolver
// decides, per shot, against live state; s_hasTarget is now only for the UI.

// ── Detour implementations ────────────────────────────────────────────────────
void __fastcall ShootWithAngleDetour(void* player, float angle, void* method)
{
    if (ShouldRedirect(player)) {
        float px = 0.f, py = 0.f;
        bool ok = false;
        __try {
            uint8_t* lp = reinterpret_cast<uint8_t*>(player);
            px = *reinterpret_cast<float*>(lp + kOffPosX);
            py = *reinterpret_cast<float*>(lp + kOffPosY);
            ok = true;
        } __except (EXCEPTION_EXECUTE_HANDLER) {}

        // Resolve against live game state now, rather than replaying whatever
        // the render thread last cached. If the resolver declines the shot, the
        // player's own angle goes through unmodified.
        if (ok) {
            float tx = 0.f, ty = 0.f;
            AimHooks::ShotAimResolver resolver = s_resolver.load(std::memory_order_relaxed);
            if (resolver && resolver(player, tx, ty))
                angle = ApplyWeaponTweaks(atan2f(ty - py, tx - px));
        }
    }
    g_swaOrig(player, angle, method);
}

static void* ResolveMethod(const char* cls, const char* method, int params)
{
    Il2CppClass* klass = Resolver::GetClass("", cls);
    if (!klass) return nullptr;
    const MethodInfo* mi = il2cpp_class_get_method_from_name(klass, method, params);
    return (mi && mi->methodPointer) ? reinterpret_cast<void*>(mi->methodPointer) : nullptr;
}

} // namespace

namespace AimHooks {

bool Install()
{
    if (s_installed) return true;

    g_swaTarget = ResolveMethod(kShootClass, kSWAMethod, 1);
    if (!g_swaTarget) return false;

    static bool s_mhInit = false;
    if (!s_mhInit) {
        MH_STATUS st = MH_Initialize();
        if (st != MH_OK && st != MH_ERROR_ALREADY_INITIALIZED) return false;
        s_mhInit = true;
    }

    if (MH_CreateHook(g_swaTarget, reinterpret_cast<void*>(&ShootWithAngleDetour),
                      reinterpret_cast<void**>(&g_swaOrig)) != MH_OK) return false;

    MH_EnableHook(g_swaTarget);

    s_installed = true;
    return true;
}

void Uninstall()
{
    if (!s_installed) return;
    s_enabled.store(false, std::memory_order_release);
    if (g_swaTarget) { MH_DisableHook(g_swaTarget); MH_RemoveHook(g_swaTarget); }
    g_swaOrig   = nullptr;
    g_swaTarget = nullptr;
    s_installed = false;
}

bool IsInstalled() { return s_installed; }

void SetEnabled(bool enabled)
{
    s_enabled.store(enabled, std::memory_order_relaxed);
    if (!enabled) {
        s_hasTarget.store(false, std::memory_order_relaxed);
    }
}

void SetTarget(bool hasTarget, float x, float y)
{
    s_hasTarget.store(hasTarget, std::memory_order_relaxed);
    if (hasTarget) {
        s_targetX.store(x, std::memory_order_relaxed);
        s_targetY.store(y, std::memory_order_relaxed);
    }
}

void SetShotAimResolver(ShotAimResolver resolver)
{
    s_resolver.store(resolver, std::memory_order_relaxed);
}

void SetReverseCultStaff(bool v)   { s_reverseCultStaff.store(v, std::memory_order_relaxed); }
void SetOffsetColossusSword(bool v) { s_offsetColossus.store(v, std::memory_order_relaxed); }

} // namespace AimHooks
