#pragma once

// OffsetRecovery — a self-contained offset-fingerprinting tool that runs ONLY
// while the game is broken and shuts itself off once it has recovered everything
// it can. It is deliberately separate from the dodge capture/dispatch hooks:
//
//   * turns ON  when BootGate reports degraded (a patch renamed fields that the
//     name pass can't resolve) AND it still has targets left to recover;
//   * turns OFF when its targets are all recovered, or the game is healthy.
//
// While on, it installs its OWN minimal detour on the projectile spawn method and
// value-fingerprints the renamed fields against the ground-truth spawn arguments
// (angle, ProjectileProperties*), committing an offset only after several
// consistent samples. The detour does bounded, SEH-guarded il2cpp field scans and
// NEVER reads a registered/stale offset, so it cannot crash the way the feature
// hooks would. It and the feature capture hook target the same game method but are
// mutually exclusive by BootGate state, so they never install at once.
namespace OffsetRecovery {
    void Tick();                                   // call every frame (from dPresent)
    bool IsActive();                               // sampling detour currently installed?
    void GetProgress(int& recovered, int& total);  // for the recovery UI
}
