#pragma once

#include <cstdint>
#include <vector>

// Shared enemy snapshot. Call Tick() (self-throttled to ~125 Hz) then consume
// via GetSnapshot / Enumerate. Velocity fields (vx, vy) are tiles/ms, blended
// from MoVelocity + chord estimation.
//
// Threading: the snapshot is built on the render thread (dPresent) and also
// read from the game's logic thread by the shot hook, which resolves its aim at
// fire time. Callers that Tick() or hold a reference from GetSnapshot() must do
// so between Acquire() and Release(); the returned vector is only valid while
// the lock is held.
namespace EnemyTracker {

struct Entry {
    int32_t id;
    int32_t objType;
    float   x, y;
    int32_t hp, maxHp;
    float   vx, vy;          // tiles/ms; 0 until first velocity sample
    bool    isInvulnerable;  // XML <Invincible/> flag or runtime condition
    bool    hasHealthBar;    // false for walls/destructibles (noHealthBar)
    bool    isQuest;         // true for quest bosses/gods
    void*   ptr;             // raw entity pointer (for direct field reads)
};

// Rebuilds the snapshot from the world dictionary. Self-throttled, so any
// consumer may call it before reading and redundant calls within a frame are
// cheap no-ops.
void Tick();

// All entries from the last Tick (no filtering).
const std::vector<Entry>& GetSnapshot();

using Callback = void(*)(const Entry&, void* user);
void Enumerate(Callback cb, void* user);

// Refreshes and copies the snapshot, taking the lock internally. Prefer this
// over Acquire/Tick/GetSnapshot whenever the consumer runs caller-supplied
// callbacks: invoking unknown code while holding a non-recursive lock is a
// deadlock waiting to happen, and a slow callback would stall the shot hook.
void CopySnapshot(std::vector<Entry>& out);

// Object ID of the local player's world-dict entry, updated each Tick.
// More reliable than ProjectileTracking::GetLocalPlayerObjectId() which
// depends on WorldTAB having fired at least once.
int32_t GetLocalPlayerObjectId();

// Snapshot lock. Plain calls rather than an RAII guard on purpose: the callers
// use __try/__except, which MSVC forbids in a function holding objects with
// destructors (C2712).
void Acquire();
void Release();

// Re-reads an entity's live state straight from its pointer, bypassing the
// snapshot. The shot hook uses this to confirm a target is still alive and
// where the snapshot says it is, in the moments between the last Tick and the
// shot actually leaving. Returns false if the entity is unreadable, dead, or
// has become untargetable.
bool ValidateLive(void* ptr, float& outX, float& outY, int32_t& outHp);

} // namespace EnemyTracker
