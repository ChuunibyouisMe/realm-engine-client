#pragma once

#include <cstdint>

// MinHook detours for the three game methods involved in shot angle redirection.
// Install() resolves IL2CPP method pointers and creates hooks; safe to call
// every tick until it succeeds (self-guards with installed flag).
namespace AimHooks {

bool Install();
void Uninstall();
bool IsInstalled();

// Called by AutoAim coordinator each tick before hooks may fire.
void SetEnabled(bool enabled);
void SetTarget(bool hasTarget, float x, float y);

// Resolves the aim point at the instant a shot fires, on the game's logic
// thread. Registered by AutoAim::Install (a function pointer rather than a
// direct call, to keep AimHooks free of a circular include on AutoAim).
//
// Returning false means "don't redirect this shot" — the player's own angle is
// passed through untouched. That is the correct answer when the target just
// died, when nothing is in range, or when state is unreadable, and it replaces
// the old behaviour of replaying a cached point indefinitely.
using ShotAimResolver = bool (*)(void* player, float& outX, float& outY);
void SetShotAimResolver(ShotAimResolver resolver);

// Weapon-specific angle tweaks
void SetReverseCultStaff(bool v);
void SetOffsetColossusSword(bool v);

} // namespace AimHooks
