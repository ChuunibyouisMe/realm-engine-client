#include "pch-il2cpp.h"

#include "TargetSelector.h"
#include "AimMath.h"
#include "FeatMagnetAim.h"
#include "features/combat/enemytracker/EnemyTracker.h"
#include "gui/tabs/TestTAB.h"

#include <cmath>
#include <cstdint>
#include <algorithm>

namespace {

// ── Object type helpers (mirrors EnemyTracker constants, kept local to avoid coupling) ──
static constexpr int32_t kQuestTypes[] = {
    1337, 2048, 2340, 2349, 3448, 3449, 3452, 3613, 3622, 4312,
    4324, 4325, 4326, 5943, 8200, 24092, 24327, 24351, 24363, 24587,
    29003, 29021, 29039, 29341, 29342, 29723, 29764, 30026, 45104, 45371,
    45076, 28618, 28619, 32751, 29793
};
static constexpr int32_t kWhitelistedTypes[] = { 31104 };
static constexpr int32_t kFallbackTypes[]    = { 2928 };

static bool IsQuestType(int32_t t) {
    for (int32_t q : kQuestTypes) if (q == t) return true;
    return false;
}
static bool IsWhitelistedType(int32_t t) {
    for (int32_t v : kWhitelistedTypes) if (v == t) return true;
    return false;
}
static bool IsFallbackType(int32_t t) {
    for (int32_t v : kFallbackTypes) if (v == t) return true;
    return false;
}

struct TierState {
    float   bestDist = 0.f;
    int32_t bestHp   = -1;
    float   bestX = 0.f, bestY = 0.f;
    float   bestVx = 0.f, bestVy = 0.f;
    int32_t bestId = 0;
    int32_t bestObjType = 0;
    bool    found = false;
};

static void TierUpdate(TierState& tier, bool useHighestHp,
                       float distSq, int32_t hp,
                       float x, float y, float vx, float vy,
                       int32_t id, int32_t objType)
{
    bool better = false;
    if (!tier.found) {
        better = true;
    } else if (useHighestHp) {
        better = hp > tier.bestHp || (hp == tier.bestHp && distSq < tier.bestDist);
    } else {
        better = distSq < tier.bestDist;
    }
    if (!better) return;
    tier.found = true; tier.bestDist = distSq; tier.bestHp = hp;
    tier.bestX = x; tier.bestY = y; tier.bestVx = vx; tier.bestVy = vy;
    tier.bestId = id; tier.bestObjType = objType;
}

} // namespace

namespace TargetSelector {

Result Select(const Config& cfg,
              float playerX, float playerY,
              float mouseX,  float mouseY,
              const WeaponProfile& weapon)
{
    const std::vector<EnemyTracker::Entry>& snap = EnemyTracker::GetSnapshot();

    const float weaponRange = (weapon.rangeTiles > 2.f) ? weapon.rangeTiles : 15.f;
    const float magnetOffset = CombatTAB::FeatMagnetAim::IsEnabled() ? CombatTAB::FeatMagnetAim::GetVisualOffsetTiles() : 0.f;
    const float maxWeaponRange = weaponRange + cfg.rangeLeadBias + magnetOffset;
    const float maxWeaponRangeSq = maxWeaponRange * maxWeaponRange;

    // ── Locked mode: bypass all tier logic ──────────────────────────────────
    if (cfg.mode == Mode::Locked && cfg.lockedEnemyId >= 0) {
        for (const EnemyTracker::Entry& e : snap) {
            if (e.id != cfg.lockedEnemyId) continue;
            if (cfg.ignoreWalls && !e.hasHealthBar) break;
            if (e.isInvulnerable && !cfg.shootInvulnerable) break;

            const float pDx = e.x - playerX, pDy = e.y - playerY;
            if ((pDx * pDx + pDy * pDy) > maxWeaponRangeSq) break;

            Result r;
            r.found   = true;
            r.enemyId = e.id;
            r.objType = e.objType;

            float aimX = e.x, aimY = e.y;
            const float projSpeed = (weapon.avgSpeedTps > 0.1f) ? weapon.avgSpeedTps : 16.0f;
            if (projSpeed > 0.1f) {
                const float dist = sqrtf(pDx * pDx + pDy * pDy);
                float travelTime = dist / projSpeed;
                const float maxTime = (weapon.lifetimeMs > 0.f) ? (weapon.lifetimeMs / 1000.f) : 1.5f;
                travelTime = (std::min)(travelTime, maxTime);
                aimX += (e.vx * 1000.f) * travelTime;
                aimY += (e.vy * 1000.f) * travelTime;
            }
            r.aimX = aimX;
            r.aimY = aimY;
            return r;
        }
        // Lock target gone/invalid — fall through to normal selection
    }

    // ── Reference point and range ────────────────────────────────────────────
    const bool useMouseRef  = (cfg.mode == Mode::ClosestToMouse);
    const bool useHighestHp = (cfg.mode == Mode::HighestHP);

    float refX = playerX, refY = playerY;
    if (useMouseRef) {
        const float mx = TestTAB::GetMouseWorldX();
        const float my = TestTAB::GetMouseWorldY();
        if (mx != 0.f || my != 0.f) { refX = mx; refY = my; }
    }

    const float mouseRadiusSq = (useMouseRef && cfg.mouseBoundingEnabled && cfg.mouseBoundingRange > 0.f)
                                ? (cfg.mouseBoundingRange * cfg.mouseBoundingRange) : 0.f;

    // ── Four-tier accumulation ───────────────────────────────────────────────
    TierState quest, normal, fallback, invuln;

    for (const EnemyTracker::Entry& e : snap) {
        // Phase-skip filter
        for (int i = 0; i < cfg.skipObjCount; ++i)
            if (e.objType == cfg.skipObjTypes[i]) goto next_entry;

        // Soft filters
        if (cfg.ignoreWalls && !e.hasHealthBar) goto next_entry;
        if (e.isInvulnerable && !cfg.shootInvulnerable && (!cfg.prioritizeBosses || !IsQuestType(e.objType))) goto next_entry;

        {
            // Range check from player (must be in weapon reach)
            const float pDx = e.x - playerX, pDy = e.y - playerY;
            const float distToPlayerSq = pDx * pDx + pDy * pDy;
            if (distToPlayerSq > maxWeaponRangeSq) goto next_entry;

            // Mouse bounding check (if ClosestToMouse and bounding enabled)
            float scoreDistSq = distToPlayerSq;
            if (useMouseRef) {
                const float mDx = e.x - refX, mDy = e.y - refY;
                const float distToMouseSq = mDx * mDx + mDy * mDy;
                if (mouseRadiusSq > 0.f && distToMouseSq > mouseRadiusSq) goto next_entry;
                scoreDistSq = distToMouseSq;
            }

            const bool isQuest      = IsQuestType(e.objType);
            const bool whitelisted  = IsWhitelistedType(e.objType);
            const bool isFallback   = IsFallbackType(e.objType);

            if (cfg.prioritizeBosses && isQuest && !whitelisted) {
                TierUpdate(quest, useHighestHp, scoreDistSq, e.hp, e.x, e.y, e.vx, e.vy, e.id, e.objType);
            } else if (e.isInvulnerable) {
                TierUpdate(invuln, useHighestHp, scoreDistSq, e.hp, e.x, e.y, e.vx, e.vy, e.id, e.objType);
            } else if (isFallback) {
                TierUpdate(fallback, useHighestHp, scoreDistSq, e.hp, e.x, e.y, e.vx, e.vy, e.id, e.objType);
            } else {
                TierUpdate(normal, useHighestHp, scoreDistSq, e.hp, e.x, e.y, e.vx, e.vy, e.id, e.objType);
            }
        }
        next_entry:;
    }

    // ── Priority resolution: quest > normal > fallback > invuln ──────────────
    const TierState* winner = nullptr;
    if (quest.found)                          winner = &quest;
    else if (normal.found)                    winner = &normal;
    else if (fallback.found)                  winner = &fallback;
    else if (invuln.found)                    winner = &invuln;

    if (!winner) return {};

    Result r;
    r.found   = true;
    r.enemyId = winner->bestId;
    r.objType = winner->bestObjType;

    // Apply lead prediction with launch point adjusted for Magnet Aim
    float launchX = playerX;
    float launchY = playerY;
    if (magnetOffset > 0.f) {
        const float dx = winner->bestX - playerX;
        const float dy = winner->bestY - playerY;
        const float len = sqrtf(dx * dx + dy * dy);
        if (len > 0.1f) {
            const float advance = (std::min)(magnetOffset, len * 0.9f);
            launchX += (dx / len) * advance;
            launchY += (dy / len) * advance;
        }
    }

    float aimX = winner->bestX;
    float aimY = winner->bestY;
    const float projSpeed = (weapon.avgSpeedTps > 0.1f) ? weapon.avgSpeedTps : 16.0f;
    if (projSpeed > 0.1f) {
        const float dx = aimX - launchX;
        const float dy = aimY - launchY;
        const float dist = sqrtf(dx * dx + dy * dy);
        float travelTime = dist / projSpeed;
        const float maxTime = (weapon.lifetimeMs > 0.f) ? (weapon.lifetimeMs / 1000.f) : 1.5f;
        travelTime = (std::min)(travelTime, maxTime);
        aimX += (winner->bestVx * 1000.f) * travelTime;
        aimY += (winner->bestVy * 1000.f) * travelTime;
    }

    r.aimX = aimX;
    r.aimY = aimY;

    return r;
}

} // namespace TargetSelector
