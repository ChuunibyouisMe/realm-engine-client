#pragma once

#include "PJDodgeTypes.h"

// PJDodge core — the pure controller. Host-independent: everything it knows
// about the world arrives through CoreInput (snapshot + env probe), everything
// it decides leaves through CoreOutput. No IL2CPP, no globals.
//
// Layer 1: 34 straight-line candidates (stand / 32 headings / intent) swept
//          against every threat with exact relative-motion Chebyshev CCD,
//          selected survival-first (impact time → corridor → clearance →
//          enemy clearance → intent), then the intent-preservation ladder.
// Layer 2: when NO straight candidate survives the whole horizon, a best-first
//          depth-limited search over piecewise-constant-velocity trajectories
//          (re-decide heading just before death) refines candidate survival
//          times; selection and the ladder then run on the refined numbers.
//          Receding horizon: only the first heading is committed; the next
//          frame replans.
namespace PJDodge { namespace Core {

// Evaluate one frame. `state` carries hysteresis across frames.
void Evaluate(const CoreInput& in, CoreState& state, CoreOutput& out);

} } // namespace PJDodge::Core
