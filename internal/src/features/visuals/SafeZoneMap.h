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

// Rebuild the field (self-throttled) — call once per frame from dPresent.
void Tick();

// Draw the cached field. Called every frame; cheap, it only projects cells.
void Render();

// ── Diagnostics for the settings panel ───────────────────────────────────────
int   GetThreatCount();     // projectiles folded into the last rebuild
float GetLastBuildUs();     // microseconds spent in the last rebuild
int   GetSafeCellCount();   // cells with no predicted impact in the horizon

} // namespace SafeZoneMap
