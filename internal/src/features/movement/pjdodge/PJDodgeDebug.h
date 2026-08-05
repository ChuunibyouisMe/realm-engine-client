#pragma once

#include "PJDodgeTypes.h"

namespace PJDodge { namespace Debug {

// Render the world overlay from a published snapshot (render thread).
void Render(const DebugSnapshot& snap,
            float camX, float camY, float angle, float zoom, float cx, float cy);

} } // namespace PJDodge::Debug
