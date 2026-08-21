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
    Mode           mode                 = Mode::ClosestToMouse;
    bool           shootInvulnerable    = true;
    bool           prioritizeBosses     = false;
    bool           ignoreWalls          = false;  // skip noHealthBar entities
    float          rangeLeadBias        = 0.9f;  // extra tiles past weapon range
    bool           mouseBoundingEnabled = false;
    float          mouseBoundingRange   = 2.5f;
    bool           predictiveAim        = true;
    float          predictiveLead       = 1.0f;
    bool           magnetAim            = true;
    bool           magnetRangeExt       = true;
    float          magnetAimRange       = 1.8f;
    int32_t        lockedEnemyId        = -1;    // used when mode == Locked
    const int32_t* skipObjTypes         = nullptr; // optional phase-skip list
    int            skipObjCount         = 0;
};

struct Result {
    bool    found   = false;
    float   aimX    = 0.f;
    float   aimY    = 0.f;
    int32_t enemyId = -1;
    int32_t objType = 0;
};

// playerX/Y and mouseX/Y in world-space tiles.
// Reads the current EnemyTracker snapshot — call after EnemyTracker::Tick().
Result Select(const Config& cfg,
              float playerX, float playerY,
              float mouseX,  float mouseY,
              const WeaponProfile& weapon);

} // namespace TargetSelector
