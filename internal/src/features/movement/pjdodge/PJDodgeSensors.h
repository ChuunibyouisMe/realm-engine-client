#pragma once

#include "PJDodgeTypes.h"

// PJDodge sensors — one cached world snapshot per game-thread tick, built from
// the existing hooks/caches (ProjectileTracking, AoeTracking, EnemyTracker,
// WorldTAB tile maps). Fixed buffers; no per-frame heap allocation.
namespace PJDodge { namespace Sensors {

// Build the snapshot into `out` (game-update thread only).
void Build(Snapshot& out, float playerX, float playerY, const Settings& settings);

// Walkability probe for Core's Env: false on walls, and on damaging ground
// when safeWalk is set. Hazard lookups are memoized per tile per tick.
bool CanOccupy(float worldX, float worldY, bool safeWalk);

// Damaging-ground probe (same per-tick memo as CanOccupy).
bool IsHazardAt(float worldX, float worldY);

} } // namespace PJDodge::Sensors
