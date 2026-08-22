#include "pch-il2cpp.h"

#include "SafeZoneMap.h"

#include "GameState.h"
#include "RuntimeOffsets.h"
#include "W2S.h"
#include "gui/tabs/WorldTAB.h"
#include "gui/tabs/TestTAB.h"
#include "features/movement/dodge/ProjectileTracking.h"
#include "features/projectiles/ProjectileTrajectory.h"
#include "FeatureState.h"
#include "core/config/settings.h"
#include "core/config/keybinds.h"

#include <windows.h>
#include <imgui/imgui.h>
#include <atomic>
#include <cfloat>
#include <cmath>
#include <cstdint>
#include <vector>

namespace {

// ── Field geometry ───────────────────────────────────────────────────────────
// A player-centred window at half-tile resolution. 40x40 tiles comfortably
// covers the visible play area at normal zoom.
constexpr float kHalfExtentTiles = 20.f;
constexpr float kCellTiles       = 0.5f;
constexpr int   kGridDim         = static_cast<int>((kHalfExtentTiles * 2.f) / kCellTiles); // 80
constexpr int   kCellCount       = kGridDim * kGridDim;                                     // 6400

// Nothing reaches this cell within the horizon.
constexpr float kSafe = FLT_MAX;

// Rebuild cadence. The field is re-projected every frame, but recomputing it at
// ~12 Hz is plenty: projectile paths are deterministic, so between rebuilds the
// field is only stale by its own age, not wrong.
constexpr ULONGLONG kRebuildMs = 80;

// Walking pace along a trajectory segment when stamping, as a fraction of a
// cell. Below 1.0 so a fast bullet cannot tunnel between cells.
constexpr float kStampStrideCells = 0.75f;

// Padding added to each bullet radius, in tiles. Prediction is not exact — the
// store tracks a real residual — so a cell right on the boundary of a path
// should not be advertised as safe.
constexpr float kSafetyPadTiles = 0.15f;

// ── State ────────────────────────────────────────────────────────────────────
static std::atomic<bool>  s_enabled{ false };
static std::atomic<float> s_horizonMs{ 1400.f };
static std::atomic<float> s_opacity{ 0.55f };
static std::atomic<bool>  s_showDanger{ true };
static std::atomic<float> s_comfortTiles{ 0.7f };
static std::atomic<float> s_maxReachTiles{ 9.f };
static std::atomic<float> s_effReachTiles{ 0.f };
static std::atomic<float> s_dangerWindowMs{ 450.f };
static std::atomic<int>   s_style{ 2 };   // Style::Both

// Per-cell render classification, rebuilt each frame: 0 = draw nothing,
// 1 = comfortable safe ground, 2 = imminent danger.
static uint8_t s_class[kCellCount];

static float     s_field[kCellCount];
// Distance, in tiles, from each safe cell to the nearest unsafe one. This is
// what separates a pocket you can actually steer into from a hitbox-width slot
// that is only theoretically survivable.
static float     s_clearance[kCellCount];
static float     s_originX = 0.f, s_originY = 0.f;  // world pos of cell (0,0) corner
static bool      s_haveField = false;
static ULONGLONG s_lastBuildMs = 0;

static std::atomic<int>   s_threatCount{ 0 };
static std::atomic<float> s_lastBuildUs{ 0.f };
static std::atomic<int>   s_safeCells{ 0 };

static std::vector<WorldProjectile> s_projScratch;

static inline bool AddrOk(const void* p) {
    const uintptr_t a = reinterpret_cast<uintptr_t>(p);
    return a > 0x10000 && a < 0x7FFFFFFFFFFFULL;
}

static bool ReadPlayerPos(void* local, float& px, float& py)
{
    if (!AddrOk(local)) return false;
    __try {
        uint8_t* lp = reinterpret_cast<uint8_t*>(local);
        px = *reinterpret_cast<float*>(lp + RuntimeOffsets::PosX);
        py = *reinterpret_cast<float*>(lp + RuntimeOffsets::PosY);
    } __except (EXCEPTION_EXECUTE_HANDLER) { return false; }
    return std::isfinite(px) && std::isfinite(py);
}

// Effective radius of a projectile for "would this touch me", in tiles.
static float ProjRadiusTiles(const WorldProjectile& p)
{
    float r = (p.runtimeChebyshevHalf > 0.f) ? p.runtimeChebyshevHalf : p.projHalfSize;
    if (!(r > 0.f) || !std::isfinite(r)) r = 0.25f;
    if (r > 4.f) r = 4.f;
    return r;
}

// Stamp a disc of "impact at tMs" into the field, keeping the earliest time.
// This is the scatter half of the algorithm: cost scales with the bullet's path
// length, never with the size of the grid.
static void StampDisc(float wx, float wy, float radiusTiles, float tMs)
{
    const float invCell = 1.f / kCellTiles;
    const float minX = wx - radiusTiles, maxX = wx + radiusTiles;
    const float minY = wy - radiusTiles, maxY = wy + radiusTiles;

    int cx0 = static_cast<int>((minX - s_originX) * invCell);
    int cx1 = static_cast<int>((maxX - s_originX) * invCell);
    int cy0 = static_cast<int>((minY - s_originY) * invCell);
    int cy1 = static_cast<int>((maxY - s_originY) * invCell);
    if (cx1 < 0 || cy1 < 0 || cx0 >= kGridDim || cy0 >= kGridDim) return;
    if (cx0 < 0) cx0 = 0;
    if (cy0 < 0) cy0 = 0;
    if (cx1 >= kGridDim) cx1 = kGridDim - 1;
    if (cy1 >= kGridDim) cy1 = kGridDim - 1;

    const float r2 = radiusTiles * radiusTiles;
    for (int cy = cy0; cy <= cy1; ++cy) {
        const float wyC = s_originY + (static_cast<float>(cy) + 0.5f) * kCellTiles;
        const float dy = wyC - wy;
        float* row = &s_field[cy * kGridDim];
        for (int cx = cx0; cx <= cx1; ++cx) {
            const float wxC = s_originX + (static_cast<float>(cx) + 0.5f) * kCellTiles;
            const float dx = wxC - wx;
            if (dx * dx + dy * dy > r2) continue;
            if (tMs < row[cx]) row[cx] = tMs;
        }
    }
}

// Stamp the swept segment between two consecutive trajectory samples, so a fast
// projectile leaves a continuous trail rather than dotted holes.
static void StampSegment(float x0, float y0, float x1, float y1,
                         float radiusTiles, float t0Ms, float t1Ms)
{
    const float dx = x1 - x0, dy = y1 - y0;
    const float len = sqrtf(dx * dx + dy * dy);
    const float stride = kCellTiles * kStampStrideCells;
    int steps = static_cast<int>(len / stride);
    if (steps < 1) steps = 1;
    if (steps > 64) steps = 64;   // bound pathological samples

    for (int i = 0; i <= steps; ++i) {
        const float f = static_cast<float>(i) / static_cast<float>(steps);
        StampDisc(x0 + dx * f, y0 + dy * f, radiusTiles, t0Ms + (t1Ms - t0Ms) * f);
    }
}

static void Rebuild(float px, float py)
{
    const LARGE_INTEGER t0 = [] { LARGE_INTEGER v; QueryPerformanceCounter(&v); return v; }();

    // Snap the origin to the cell lattice so the field doesn't shimmer as the
    // player walks — cells stay put in world space between rebuilds.
    s_originX = floorf((px - kHalfExtentTiles) / kCellTiles) * kCellTiles;
    s_originY = floorf((py - kHalfExtentTiles) / kCellTiles) * kCellTiles;

    for (int i = 0; i < kCellCount; ++i) s_field[i] = kSafe;

    s_projScratch.clear();
    ProjectileTracking::CopyActiveForDraw(s_projScratch);

    const float horizon = s_horizonMs.load(std::memory_order_relaxed);
    const float playerHalf = TestTAB::GetPlayerHitboxSize() * 0.5f;
    const ULONGLONG nowMs = GetTickCount64();
    const int32_t localId = ProjectileTracking::GetLocalPlayerObjectId();

    // Sample step: fine enough that a typical shot advances well under a cell,
    // with the segment stamp covering anything faster.
    constexpr float kStepMs = 40.f;
    const int maxSteps = static_cast<int>(horizon / kStepMs) + 1;

    int threats = 0;
    for (const WorldProjectile& p : s_projScratch) {
        if (!p.valid) continue;
        // Our own shots can't hurt us.
        if (localId != 0 && (p.attackerObjId == localId ||
                             static_cast<int32_t>(p.ownerObjId) == localId)) continue;
        if (!p.canHitPlayer && p.attackerObjId == 0 && p.ownerObjId == 0) continue;
        if (!std::isfinite(p.x) || !std::isfinite(p.y)) continue;

        const float radius = ProjRadiusTiles(p) + playerHalf + kSafetyPadTiles;
        const float elapsedMs =
            static_cast<float>(nowMs > p.spawnTick ? (nowMs - p.spawnTick) : 0ULL);

        float prevX = p.x, prevY = p.y, prevT = 0.f;
        bool  havePrev = false;
        bool  stamped = false;

        for (int i = 0; i <= maxSteps; ++i) {
            const float futureMs = kStepMs * static_cast<float>(i);
            if (futureMs > horizon) break;
            const float tMs = elapsedMs + futureMs;
            if (p.lifetime > 0.f && tMs > p.lifetime) break;

            float x = p.x, y = p.y;
            if (i != 0 && !ProjectileTrajectory::GetPositionAtTime(p, tMs, x, y)) break;
            if (!std::isfinite(x) || !std::isfinite(y)) break;

            // Skip work entirely for paths outside the window.
            const bool inWindow =
                x >= s_originX - radius && x <= s_originX + kHalfExtentTiles * 2.f + radius &&
                y >= s_originY - radius && y <= s_originY + kHalfExtentTiles * 2.f + radius;

            if (havePrev && (inWindow || stamped)) {
                StampSegment(prevX, prevY, x, y, radius, prevT, futureMs);
                stamped = true;
            } else if (inWindow) {
                StampDisc(x, y, radius, futureMs);
                stamped = true;
            }
            prevX = x; prevY = y; prevT = futureMs; havePrev = true;
        }
        if (stamped) ++threats;
    }

    // ── Clearance ────────────────────────────────────────────────────────────
    // Two-pass chamfer distance transform: unsafe cells are 0, safe cells take
    // the distance to the nearest unsafe one. ~2 sweeps over 6400 cells, which
    // is nothing next to the stamping above, and it is what lets the overlay
    // hide micro-gaps that no human could thread.
    constexpr float kOrtho = 1.f;
    constexpr float kDiag  = 1.41421356f;
    constexpr float kFar   = 1.0e9f;

    for (int i = 0; i < kCellCount; ++i)
        s_clearance[i] = (s_field[i] == kSafe) ? kFar : 0.f;

    for (int y = 0; y < kGridDim; ++y) {
        for (int x = 0; x < kGridDim; ++x) {
            float d = s_clearance[y * kGridDim + x];
            if (d == 0.f) continue;
            if (x > 0)                 d = (std::min)(d, s_clearance[y * kGridDim + (x - 1)] + kOrtho);
            if (y > 0)                 d = (std::min)(d, s_clearance[(y - 1) * kGridDim + x] + kOrtho);
            if (x > 0 && y > 0)        d = (std::min)(d, s_clearance[(y - 1) * kGridDim + (x - 1)] + kDiag);
            if (x + 1 < kGridDim && y > 0)
                                       d = (std::min)(d, s_clearance[(y - 1) * kGridDim + (x + 1)] + kDiag);
            s_clearance[y * kGridDim + x] = d;
        }
    }
    for (int y = kGridDim - 1; y >= 0; --y) {
        for (int x = kGridDim - 1; x >= 0; --x) {
            float d = s_clearance[y * kGridDim + x];
            if (d == 0.f) continue;
            if (x + 1 < kGridDim)      d = (std::min)(d, s_clearance[y * kGridDim + (x + 1)] + kOrtho);
            if (y + 1 < kGridDim)      d = (std::min)(d, s_clearance[(y + 1) * kGridDim + x] + kOrtho);
            if (x + 1 < kGridDim && y + 1 < kGridDim)
                                       d = (std::min)(d, s_clearance[(y + 1) * kGridDim + (x + 1)] + kDiag);
            if (x > 0 && y + 1 < kGridDim)
                                       d = (std::min)(d, s_clearance[(y + 1) * kGridDim + (x - 1)] + kDiag);
            s_clearance[y * kGridDim + x] = d;
        }
    }
    // Cell units -> tiles. Cells at the window edge report a large clearance
    // they have not earned, but those are culled by reach long before drawing.
    for (int i = 0; i < kCellCount; ++i)
        if (s_clearance[i] < kFar) s_clearance[i] *= kCellTiles;

    const float comfort = s_comfortTiles.load(std::memory_order_relaxed);
    int safeCells = 0;
    for (int i = 0; i < kCellCount; ++i)
        if (s_field[i] == kSafe && s_clearance[i] >= comfort) ++safeCells;

    LARGE_INTEGER t1, freq;
    QueryPerformanceCounter(&t1);
    QueryPerformanceFrequency(&freq);
    s_lastBuildUs.store(freq.QuadPart
        ? static_cast<float>((t1.QuadPart - t0.QuadPart) * 1000000.0 / static_cast<double>(freq.QuadPart))
        : 0.f, std::memory_order_relaxed);
    s_threatCount.store(threats, std::memory_order_relaxed);
    s_safeCells.store(safeCells, std::memory_order_relaxed);
    s_haveField = true;
}

} // namespace

namespace SafeZoneMap {

void SetEnabled(bool on) { s_enabled.store(on, std::memory_order_relaxed); }
bool IsEnabled()         { return s_enabled.load(std::memory_order_relaxed); }

void SetHorizonMs(float ms) {
    if (!std::isfinite(ms)) return;
    if (ms < 300.f) ms = 300.f;
    if (ms > 4000.f) ms = 4000.f;
    s_horizonMs.store(ms, std::memory_order_relaxed);
}
float GetHorizonMs() { return s_horizonMs.load(std::memory_order_relaxed); }

void SetOpacity(float a) {
    if (!std::isfinite(a)) return;
    if (a < 0.f) a = 0.f;
    if (a > 1.f) a = 1.f;
    s_opacity.store(a, std::memory_order_relaxed);
}
float GetOpacity() { return s_opacity.load(std::memory_order_relaxed); }

void SetShowDanger(bool on) { s_showDanger.store(on, std::memory_order_relaxed); }
bool IsShowDanger()         { return s_showDanger.load(std::memory_order_relaxed); }

void SetDangerWindowMs(float ms) {
    if (!std::isfinite(ms)) return;
    if (ms < 100.f) ms = 100.f;
    if (ms > 2000.f) ms = 2000.f;
    s_dangerWindowMs.store(ms, std::memory_order_relaxed);
}
float GetDangerWindowMs() { return s_dangerWindowMs.load(std::memory_order_relaxed); }

void  SetStyle(Style st) { s_style.store(static_cast<int>(st), std::memory_order_relaxed); }
Style GetStyle()         { return static_cast<Style>(s_style.load(std::memory_order_relaxed)); }

void SetComfortTiles(float t) {
    if (!std::isfinite(t)) return;
    if (t < 0.f) t = 0.f;
    if (t > 3.f) t = 3.f;
    s_comfortTiles.store(t, std::memory_order_relaxed);
}
float GetComfortTiles() { return s_comfortTiles.load(std::memory_order_relaxed); }

void SetMaxReachTiles(float t) {
    if (!std::isfinite(t)) return;
    if (t < 2.f) t = 2.f;
    if (t > kHalfExtentTiles) t = kHalfExtentTiles;
    s_maxReachTiles.store(t, std::memory_order_relaxed);
}
float GetMaxReachTiles()       { return s_maxReachTiles.load(std::memory_order_relaxed); }
float GetEffectiveReachTiles() { return s_effReachTiles.load(std::memory_order_relaxed); }

int   GetThreatCount()  { return s_threatCount.load(std::memory_order_relaxed); }
float GetLastBuildUs()  { return s_lastBuildUs.load(std::memory_order_relaxed); }
int   GetSafeCellCount(){ return s_safeCells.load(std::memory_order_relaxed); }

// GetAsyncKeyState is process-wide, so gate on the game actually having focus —
// otherwise a '`' typed into the dashboard or a browser would toggle the overlay.
static bool GameWindowFocused()
{
    const HWND fg = GetForegroundWindow();
    if (!fg) return false;
    DWORD pid = 0;
    GetWindowThreadProcessId(fg, &pid);
    return pid == GetCurrentProcessId();
}

void PollHotkey()
{
    const uint8_t key = settings.KeyBinds.Toggle_SafeZones;
    if (key == 0 || !GameWindowFocused()) return;
    if (KeyBinds::IsKeyPressed(key))
        SetEnabled(!IsEnabled());
}

void Tick()
{
    PollHotkey();
    if (!s_enabled.load(std::memory_order_relaxed)) { s_haveField = false; return; }

    const ULONGLONG now = GetTickCount64();
    if (now - s_lastBuildMs < kRebuildMs) return;
    s_lastBuildMs = now;

    void* local = GameState::GetLocalPtr();
    float px = 0.f, py = 0.f;
    if (!ReadPlayerPos(local, px, py)) { s_haveField = false; return; }

    Rebuild(px, py);
}

void Render()
{
    if (!s_enabled.load(std::memory_order_relaxed) || !s_haveField) return;

    float camX, camY, angleRad, zoom, cx, cy;
    if (!TestTAB::GetCamState(camX, camY, angleRad, zoom, cx, cy)) return;

    ImDrawList* dl = ImGui::GetBackgroundDrawList();
    if (!dl) return;

    const float horizon  = s_horizonMs.load(std::memory_order_relaxed);
    const float opacity  = s_opacity.load(std::memory_order_relaxed);
    const bool  showDang = s_showDanger.load(std::memory_order_relaxed);

    // Classify at the field's native half-tile resolution. The previous pass
    // merged 2x2 cells and filled them with soft alpha, which is what made the
    // overlay read like watercolour — adjacent quads blended into blobs several
    // times wider than the bullets they represented.
    const float comfort   = s_comfortTiles.load(std::memory_order_relaxed);
    const float dangerWin = s_dangerWindowMs.load(std::memory_order_relaxed);
    const Style style     = static_cast<Style>(s_style.load(std::memory_order_relaxed));
    const bool  drawFill  = (style != Style::OutlineOnly);
    const bool  drawEdge  = (style != Style::FillOnly);
    const bool  showDanger = s_showDanger.load(std::memory_order_relaxed);

    // Reach: safe ground you cannot get to inside the look-ahead window is not
    // actionable, so bound the drawing by how far you could actually travel,
    // capped by the user's preference.
    //
    // Derived from the SPD *stat*, not the live move speed. The game's
    // CalcMoveSpeed folds in Speedy, Slowed, paralyse and every other transient
    // effect, so sizing the overlay from it made the region visibly grow and
    // shrink during a fight — distracting, and it moved for reasons that have
    // nothing to do with where the bullets are. The stat only changes when gear
    // or level does. FeatureState::GetClientSpeed is base + bonus, pushed from
    // NEWTICK by the auto-aim plugin; -1 means the client has not sent one yet.
    const float cap = s_maxReachTiles.load(std::memory_order_relaxed);
    const int32_t statSpd = FeatureState::GetClientSpeed();
    // Flash speed curve: tiles/sec = 4.0 + 5.6 * spd/75. SPD 50 when unknown.
    const float spdForCurve = (statSpd >= 0 && statSpd <= 200)
        ? static_cast<float>(statSpd) : 50.f;
    const float baseTilesPerSec = 4.0f + 5.6f * (spdForCurve / 75.f);
    float reach = (std::min)(cap, baseTilesPerSec * (horizon / 1000.f));
    if (reach < 2.f) reach = 2.f;
    s_effReachTiles.store(reach, std::memory_order_relaxed);

    float pxNow = camX, pyNow = camY;
    {
        void* lp = GameState::GetLocalPtr();
        float tx = 0.f, ty = 0.f;
        if (ReadPlayerPos(lp, tx, ty)) { pxNow = tx; pyNow = ty; }
    }
    const float reachSq = reach * reach;

    for (int cy = 0; cy < kGridDim; ++cy) {
        const float wy = s_originY + (static_cast<float>(cy) + 0.5f) * kCellTiles;
        const float ddy = wy - pyNow;
        for (int cx = 0; cx < kGridDim; ++cx) {
            const int i = cy * kGridDim + cx;
            const float wx = s_originX + (static_cast<float>(cx) + 0.5f) * kCellTiles;
            const float ddx = wx - pxNow;
            if (ddx * ddx + ddy * ddy > reachSq) { s_class[i] = 0; continue; }

            const float v = s_field[i];
            if (v == kSafe) {
                // Only pockets with room to actually steer into.
                s_class[i] = (s_clearance[i] >= comfort) ? 1 : 0;
            } else {
                // Danger is painted only inside its own, much shorter window.
                s_class[i] = (showDanger && v <= dangerWin) ? 2 : 0;
            }
        }
    }

    // Camera basis hoisted: every cell is the same rotated square, so its corner
    // offsets in screen space are constant for the frame.
    const float cosA = cosf(angleRad) * zoom;
    const float sinA = sinf(angleRad) * zoom;
    const float h = kCellTiles * 0.5f;
    const float qx0 = -h * cosA + h * sinA, qy0 = -h * sinA - h * cosA;
    const float qx1 =  h * cosA + h * sinA, qy1 =  h * sinA - h * cosA;
    const float qx2 =  h * cosA - h * sinA, qy2 =  h * sinA + h * cosA;
    const float qx3 = -h * cosA - h * sinA, qy3 = -h * sinA + h * cosA;

    auto project = [&](float wx, float wy, float& sx, float& sy) {
        sx = cx + (wx - camX) * cosA - (wy - camY) * sinA;
        sy = cy + (wx - camX) * sinA + (wy - camY) * cosA;
    };

    // ── Fills ────────────────────────────────────────────────────────────────
    // Kept deliberately faint. The fill says "region", the outline says "edge",
    // and it is the edge that carries the information.
    if (drawFill) {
        for (int cyi = 0; cyi < kGridDim; ++cyi) {
            const float wy = s_originY + (static_cast<float>(cyi) + 0.5f) * kCellTiles;
            for (int cxi = 0; cxi < kGridDim; ++cxi) {
                const uint8_t k = s_class[cyi * kGridDim + cxi];
                if (!k) continue;
                const float wx = s_originX + (static_cast<float>(cxi) + 0.5f) * kCellTiles;

                ImU32 col;
                if (k == 1) {
                    const int a = static_cast<int>(30.f * opacity);
                    if (a <= 2) continue;
                    col = IM_COL32(60, 225, 130, a);
                } else {
                    const float u = 1.f - (s_field[cyi * kGridDim + cxi] / dangerWin);
                    const int a = static_cast<int>((18.f + 46.f * u) * opacity);
                    if (a <= 2) continue;
                    col = IM_COL32(240, 70, 70, a);
                }

                float sxC, syC;
                project(wx, wy, sxC, syC);
                dl->AddQuadFilled(ImVec2(sxC + qx0, syC + qy0), ImVec2(sxC + qx1, syC + qy1),
                                  ImVec2(sxC + qx2, syC + qy2), ImVec2(sxC + qx3, syC + qy3), col);
            }
        }
    }

    // ── Outlines ─────────────────────────────────────────────────────────────
    // Trace the boundary of each region by emitting a segment wherever a cell
    // differs from its right or lower neighbour. That draws the exact silhouette
    // of a pocket as a thin line instead of a soft blob, which is what makes the
    // gaps between shots legible. Only boundary cells emit anything, so this is
    // a few hundred segments, not one per cell.
    if (drawEdge) {
        const int aSafe   = static_cast<int>(215.f * opacity);
        const int aDanger = static_cast<int>(200.f * opacity);
        const ImU32 colSafe   = IM_COL32(90, 255, 150, aSafe   < 0 ? 0 : aSafe);
        const ImU32 colDanger = IM_COL32(255, 80, 80, aDanger < 0 ? 0 : aDanger);

        auto edge = [&](float ax, float ay, float bx, float by, ImU32 col) {
            float sx0, sy0, sx1, sy1;
            project(ax, ay, sx0, sy0);
            project(bx, by, sx1, sy1);
            dl->AddLine(ImVec2(sx0, sy0), ImVec2(sx1, sy1), col, 1.6f);
        };

        for (int cyi = 0; cyi < kGridDim; ++cyi) {
            for (int cxi = 0; cxi < kGridDim; ++cxi) {
                const uint8_t k = s_class[cyi * kGridDim + cxi];
                const uint8_t kr = (cxi + 1 < kGridDim) ? s_class[cyi * kGridDim + (cxi + 1)] : 0;
                const uint8_t kd = (cyi + 1 < kGridDim) ? s_class[(cyi + 1) * kGridDim + cxi] : 0;

                const float x0 = s_originX + static_cast<float>(cxi) * kCellTiles;
                const float y0 = s_originY + static_cast<float>(cyi) * kCellTiles;
                const float x1 = x0 + kCellTiles;
                const float y1 = y0 + kCellTiles;

                if (k != kr) {
                    const uint8_t owner = k ? k : kr;
                    edge(x1, y0, x1, y1, owner == 1 ? colSafe : colDanger);
                }
                if (k != kd) {
                    const uint8_t owner = k ? k : kd;
                    edge(x0, y1, x1, y1, owner == 1 ? colSafe : colDanger);
                }
            }
        }
    }
}

} // namespace SafeZoneMap
