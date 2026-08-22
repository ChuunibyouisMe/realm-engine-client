#pragma once

#include "WeaponProfile.h"
#include <cstdint>

namespace TargetSelector {

enum class Mode : int {
    ClosestToPlayer = 0,
    HighestHP       = 1,
    ClosestToMouse  = 2,
    Locked          = 3, // Track a specific enemy by ID; falls back to ClosestToPlayer if it dies
};

struct Config {
    Mode           mode                 = Mode::ClosestToPlayer;
    bool           shootInvulnerable    = false;
    bool           prioritizeBosses     = true;
    bool           ignoreWalls          = true;  // skip noHealthBar entities
    float          rangeLeadBias        = 1.0f;  // extra tiles past weapon range
    float          leadStrength         = 1.0f;  // user multiplier on lead prediction
    bool           mouseBoundingEnabled = false;
    float          mouseBoundingRange   = 8.0f;
    int32_t        lockedEnemyId        = -1;    // used when mode == Locked
    const int32_t* skipObjTypes         = nullptr; // optional phase-skip list
    int            skipObjCount         = 0;
};

struct Result {
    bool    found   = false;
    float   aimX    = 0.f;   // lead-adjusted aim point
    float   aimY    = 0.f;
    int32_t enemyId = -1;
    int32_t objType = 0;
    // Un-led target state, so the shot hook can re-validate the enemy against
    // live memory and recompute the lead from where it actually is when the
    // shot fires, rather than trusting a point computed a frame ago.
    float   rawX    = 0.f;
    float   rawY    = 0.f;
    float   vx      = 0.f;   // tiles/ms
    float   vy      = 0.f;
    float   coherence = 0.f; // 0..1 directional consistency, see ApplyLead
    void*   ptr     = nullptr;
};

// Lead-prediction shared by the selector and the fire-time path so both use
// identical math. vx/vy are tiles/ms; the result is a world-space aim point.
//
// `coherence` (0..1) comes from EnemyTracker and reports how consistently the
// target is travelling: jittering enemies approach 0 and are led far less,
// which stops the aim swinging to either side of an enemy twitching in place.
// `leadStrength` is the user's multiplier on top.
void ApplyLead(float launchX, float launchY,
               float targetX, float targetY,
               float vx, float vy, float coherence, float leadStrength,
               const WeaponProfile& weapon,
               float& outX, float& outY);

// playerX/Y and mouseX/Y in world-space tiles.
// Reads the current EnemyTracker snapshot — call after EnemyTracker::Tick().
Result Select(const Config& cfg,
              float playerX, float playerY,
              float mouseX,  float mouseY,
              const WeaponProfile& weapon);

} // namespace TargetSelector
