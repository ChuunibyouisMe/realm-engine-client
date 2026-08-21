#include "pch-il2cpp.h"
#include "FeatMagnetAim.h"

#include <imgui/imgui.h>

namespace CombatTAB {
namespace FeatMagnetAim {

static bool  s_enabled = false;
static float s_visualOffsetTiles = 2.5f;

void Tick(bool /*menuOpen*/)
{
}

bool IsEnabled()
{
    return s_enabled;
}

float GetVisualOffsetTiles()
{
    return s_visualOffsetTiles;
}

void Render()
{
    ImGui::TextColored(ImVec4(0.5f, 0.95f, 0.65f, 1.f), "MAGNET AIM");
    ImGui::Spacing();

    ImGui::Checkbox("Enable##magnetAimEnable", &s_enabled);
    if (s_enabled) {
        ImGui::SliderFloat("Offset Distance##magnetOffset", &s_visualOffsetTiles, 0.5f, 10.0f, "%.1f tiles");
    }
    ImGui::TextDisabled("Advances the local SpawnProjectile origin toward the target.");
    ImGui::TextDisabled("Extends effective range and reduces projectile flight time.");
}

} // namespace FeatMagnetAim
} // namespace CombatTAB
