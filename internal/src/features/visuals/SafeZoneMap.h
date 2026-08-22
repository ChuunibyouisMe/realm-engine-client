#pragma once

#include <cstdint>

// SafeZoneMap — a "where can I stand" heatmap built from the projectiles that
// are *currently in flight*.
//
// This is the passive replacement for auto-dodge. It computes the same kind of
// threat field the dodge planners did, but never touches movement: nothing is
// sent to the server and no input is synthesised, so there is nothing for an
// observer (or another player watching your movement) to notice.
//
// Each grid cell stores the time until the first predicted impact at that spot.
// Cells nothing reaches inside the horizon read as safe; cells about to be hit
// read as imminent. That answers the question a player actually has in a bullet
// hell — "how long can I stand here" — rather than drawing every trajectory,
// which is unreadable once a boss fills the screen.
//
// Scope: it only knows about shots already fired. An enemy that has not fired
// yet can still shoot into a cell marked safe.
namespace SafeZoneMap {

void SetEnabled(bool on);
bool IsEnabled();

// How far ahead to predict, in milliseconds. Longer sees more incoming fire but
// paints more of the screen as unsafe.
void  SetHorizonMs(float ms);
float GetHorizonMs();

// Overlay alpha multiplier, 0..1.
void  SetOpacity(float a);
float GetOpacity();

// Draw danger as well as safety. Off = only safe ground is tinted, which is
// much calmer to read.
void SetShowDanger(bool on);
bool IsShowDanger();

// How far ahead danger is *painted*, in milliseconds — deliberately separate
// from the look-ahead used to decide safety. Safety needs a long window (ground
// is only safe if nothing arrives for a while), but shading danger that far out
// is misleading: a shot a second away from a tile is not a threat to you
// standing there now, you will have moved. Painting it anyway drew a long red
// streak ahead of every travelling bullet and buried the gaps between shots.
void  SetDangerWindowMs(float ms);
float GetDangerWindowMs();

// Rendering style. Outlines trace the exact boundary of each region at the
// field's native resolution; fills are the soft wash. Bullets are thin, so
// outline-led drawing reads far closer to the real shape of the danger.
enum class Style : int { FillOnly = 0, OutlineOnly = 1, Both = 2 };
void  SetStyle(Style s);
Style GetStyle();

// Minimum clearance, in tiles, before a safe pocket is worth showing. The field
// already accounts for the player's hitbox, so a cell marked safe is one you
// would technically fit in — but a gap only as wide as your hitbox is not a gap
// a human can actually steer into. This is the margin on top: raise it to be
// shown only roomy pockets, lower it if you want to attempt tighter ones.
void  SetComfortTiles(float tiles);
float GetComfortTiles();

// Maximum distance from the player to display, in tiles. Also clamped by how
// far you could actually travel within the look-ahead window at your current
// speed — safe ground you cannot reach in time is not useful information.
void  SetMaxReachTiles(float tiles);
float GetMaxReachTiles();

// Effective reach used by the last render (min of the cap and speed x horizon).
float GetEffectiveReachTiles();

// Edge-detects the configured toggle key. Called from Tick(); exposed so the
// binding UI can share the same entry point.
void PollHotkey();

// Rebuild the field (self-throttled) — call once per frame from dPresent.
void Tick();

// Draw the cached field. Called every frame; cheap, it only projects cells.
void Render();

// ── Diagnostics for the settings panel ───────────────────────────────────────
int   GetThreatCount();     // projectiles folded into the last rebuild
float GetLastBuildUs();     // microseconds spent in the last rebuild
int   GetSafeCellCount();   // cells with no predicted impact in the horizon

} // namespace SafeZoneMap
