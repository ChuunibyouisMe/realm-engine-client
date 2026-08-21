#include "pch-il2cpp.h"

#include "TargetSelector.h"
#include "FeatMagnetAim.h"
#include "features/combat/enemytracker/EnemyTracker.h"
#include "gui/tabs/TestTAB.h"
#include "gui/tabs/CameraTAB.h"
#include "game/math/W2S.h"
#include "platform/hooks/DirectX.h"

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
    float   bestDist = 99999999.f;
    int32_t bestHp   = -1;
    float   bestX = 0.f, bestY = 0.f;
    float   bestVx = 0.f, bestVy = 0.f;
    int32_t bestId = 0;
    int32_t bestObjType = 0;
    bool    found = false;
};

static void TierUpdate(TierState& tier, bool useHighestHp,
                       float metric, int32_t hp,
                       float x, float y, float vx, float vy,
                       int32_t id, int32_t objType)
{
    bool better = false;
    if (!tier.found) {
        better = true;
    } else if (useHighestHp) {
        better = hp > tier.bestHp || (hp == tier.bestHp && metric < tier.bestDist);
    } else {
        better = metric < tier.bestDist;
    }
    if (!better) return;
    tier.found = true; tier.bestDist = metric; tier.bestHp = hp;
    tier.bestX = x; tier.bestY = y; tier.bestVx = vx; tier.bestVy = vy;
    tier.bestId = id; tier.bestObjType = objType;
}

static bool ProjectEnemyToScreen(float ex, float ey, float playerX, float playerY, float& outSX, float& outSY)
{
    float angleDeg = CameraTAB::GetAngle();
    float ortho = CameraTAB::GetZoom();
    if (ortho == 0.f) ortho = 8.f;
    const float angleRad = angleDeg * (3.1415926535f / 180.f);

    HWND wnd = DirectX::window;
    if (!wnd) return false;
    RECT r;
    GetClientRect(wnd, &r);
    const float screenW = static_cast<float>(r.right - r.left);
    const float screenH = static_cast<float>(r.bottom - r.top);
    if (screenW <= 0.f || screenH <= 0.f) return false;

    float cx = screenW * 0.5f;
    float cy = screenH * 0.5f;
    float zoom = screenH / (2.f * ortho);

    const float prX = CameraTAB::GetPixelRectX();
    const float prY = CameraTAB::GetPixelRectY();
    const float prW = CameraTAB::GetPixelRectW();
    const float prH = CameraTAB::GetPixelRectH();
    if (prW > 16.f && prH > 16.f) {
        cx = prX + prW * 0.5f;
        cy = screenH - (prY + prH * 0.5f);
        zoom = prH / (2.f * ortho);
    }

    return W2S(ex, ey, outSX, outSY, playerX, playerY, angleRad, zoom, cx, cy);
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
    const float magnetOffset = (cfg.magnetAim && cfg.magnetRangeExt) ? cfg.magnetAimRange : (CombatTAB::FeatMagnetAim::IsEnabled() ? CombatTAB::FeatMagnetAim::GetVisualOffsetTiles() : 0.f);
    const float maxWeaponRange = weaponRange + magnetOffset + (cfg.predictiveAim ? (cfg.predictiveLead * 0.5f) : 0.f);
    const float maxWeaponRangeSq = maxWeaponRange * maxWeaponRange;

    // ── Locked mode: bypass all tier logic ──────────────────────────────────
    if (cfg.mode == Mode::Locked && cfg.lockedEnemyId >= 0) {
        for (const EnemyTracker::Entry& e : snap) {
            if (e.id != cfg.lockedEnemyId) continue;
            if (cfg.ignoreWalls && !e.hasHealthBar) break;
            if (e.isInvulnerable && !cfg.shootInvulnerable) break;

            Result r;
            r.found   = true;
            r.enemyId = e.id;
            r.objType = e.objType;

            float aimX = e.x, aimY = e.y;
            const float projSpeed = (weapon.avgSpeedTps > 0.1f) ? weapon.avgSpeedTps : 16.0f;
            if (cfg.predictiveAim && projSpeed > 0.1f) {
                const float dist = sqrtf((aimX - playerX) * (aimX - playerX) + (aimY - playerY) * (aimY - playerY));
                float travelTime = dist / projSpeed;
                const float maxTime = (weapon.lifetimeMs > 0.f) ? (weapon.lifetimeMs / 1000.f) : 1.5f;
                travelTime = (std::min)(travelTime, maxTime);
                const float lead = std::clamp(cfg.predictiveLead, 0.0f, 2.5f);
                aimX += (e.vx * 1000.f) * travelTime * lead;
                aimY += (e.vy * 1000.f) * travelTime * lead;
            }
            r.aimX = aimX;
            r.aimY = aimY;
            return r;
        }
    }

    const bool useMouseRef  = (cfg.mode == Mode::ClosestToMouse);
    const bool useHighestHp = (cfg.mode == Mode::HighestHP);

    const float mouseSX = TestTAB::GetMouseScreenX();
    const float mouseSY = TestTAB::GetMouseScreenY();
    const float mouseWX = TestTAB::GetMouseWorldX();
    const float mouseWY = TestTAB::GetMouseWorldY();
    const bool  haveW2S = TestTAB::IsW2SValid();

    const float mouseBoundingRangeSq = (useMouseRef && cfg.mouseBoundingEnabled && cfg.mouseBoundingRange > 0.f)
                                       ? (cfg.mouseBoundingRange * cfg.mouseBoundingRange) : 0.f;

    // ── Four-tier accumulation (Quest > Normal > Fallback > Invuln) ──────────
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

            // Optional mouse world bounding
            if (mouseBoundingRangeSq > 0.f) {
                const float mwDx = e.x - mouseWX, mwDy = e.y - mouseWY;
                if ((mwDx * mwDx + mwDy * mwDy) > mouseBoundingRangeSq) goto next_entry;
            }

            // Metric calculation (claudebawt-deck method)
            float metric = distToPlayerSq;
            if (useMouseRef) {
                float esx = 0.f, esy = 0.f;
                if (haveW2S && ProjectEnemyToScreen(e.x, e.y, playerX, playerY, esx, esy)) {
                    const float sDx = esx - mouseSX, sDy = esy - mouseSY;
                    metric = sDx * sDx + sDy * sDy;
                } else {
                    const float mwDx = e.x - mouseWX, mwDy = e.y - mouseWY;
                    metric = mwDx * mwDx + mwDy * mwDy;
                }
            }

            const bool isQuest      = IsQuestType(e.objType);
            const bool whitelisted  = IsWhitelistedType(e.objType);
            const bool isFallback   = IsFallbackType(e.objType);

            if (cfg.prioritizeBosses && isQuest && !whitelisted) {
                TierUpdate(quest, useHighestHp, metric, e.hp, e.x, e.y, e.vx, e.vy, e.id, e.objType);
            } else if (e.isInvulnerable) {
                TierUpdate(invuln, useHighestHp, metric, e.hp, e.x, e.y, e.vx, e.vy, e.id, e.objType);
            } else if (isFallback) {
                TierUpdate(fallback, useHighestHp, metric, e.hp, e.x, e.y, e.vx, e.vy, e.id, e.objType);
            } else {
                TierUpdate(normal, useHighestHp, metric, e.hp, e.x, e.y, e.vx, e.vy, e.id, e.objType);
            }
        }
        next_entry:;
    }

    // ── Priority resolution ──────────────────────────────────────────────────
    const TierState* winner = nullptr;
    if (quest.found)                          winner = &quest;
    else if (normal.found)                    winner = &normal;
    else if (fallback.found)                  winner = &fallback;
    else if (invuln.found)                    winner = &invuln;

    // Fallback to nearest live enemy if no primary candidate was selected
    if (!winner) {
        for (const EnemyTracker::Entry& e : snap) {
            if (e.hp <= 0) continue;
            if (cfg.ignoreWalls && !e.hasHealthBar) continue;
            const float pDx = e.x - playerX, pDy = e.y - playerY;
            const float distToPlayerSq = pDx * pDx + pDy * pDy;
            if (distToPlayerSq > maxWeaponRangeSq) continue;
            TierUpdate(fallback, false, distToPlayerSq, e.hp, e.x, e.y, e.vx, e.vy, e.id, e.objType);
        }
        if (fallback.found) winner = &fallback;
    }

    if (!winner) return {};

    Result r;
    r.found   = true;
    r.enemyId = winner->bestId;
    r.objType = winner->bestObjType;

    // Magnet aim launch adjustment
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

    // Lead prediction using claudebawt-deck's travel-time formula
    float aimX = winner->bestX;
    float aimY = winner->bestY;
    const float projSpeed = (weapon.avgSpeedTps > 0.1f) ? weapon.avgSpeedTps : 16.0f;
    if (cfg.predictiveAim && projSpeed > 0.1f) {
        const float dx = aimX - playerX;
        const float dy = aimY - playerY;
        const float dist = sqrtf(dx * dx + dy * dy);
        float travelTime = dist / projSpeed;
        const float maxTime = (weapon.lifetimeMs > 0.f) ? (weapon.lifetimeMs / 1000.f) : 1.5f;
        travelTime = (std::min)(travelTime, maxTime);
        const float lead = std::clamp(cfg.predictiveLead, 0.0f, 2.5f);
        aimX += (winner->bestVx * 1000.f) * travelTime * lead;
        aimY += (winner->bestVy * 1000.f) * travelTime * lead;
    }

    r.aimX = aimX;
    r.aimY = aimY;

    return r;
}

} // namespace TargetSelector
