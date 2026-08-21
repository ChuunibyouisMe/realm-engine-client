#include "pch-il2cpp.h"
#include "FeatAutoAim.h"
#include "AutoAim.h"
#include "ProjNoclip.h"
#include "FeatureState.h"
#include "GameState.h"
#include "RuntimeOffsets.h"
#include "core/config/settings.h"
#include "core/config/keybinds.h"
#include "gui/tabs/CameraTAB.h"
#include "game/math/W2S.h"
#include "platform/hooks/DirectX.h"

#include <imgui/imgui.h>
#include <windows.h>
#include <shlobj.h>
#include <cmath>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <vector>

namespace CombatTAB {
namespace FeatAutoAim {

static bool  s_aimEnabled          = false;
static int   s_aimMode             = 1; // 0 = Distance, 1 = Cursor, 2 = Health
static bool  s_targetInvulnerable  = true;
static bool  s_predictiveAim       = true;
static float s_predictiveLead      = 1.0f;
static bool  s_magnetAim           = true;
static bool  s_magnetRangeExt      = true;
static float s_magnetAimRange      = 1.8f;
static bool  s_renderMagnetRange   = true;
static bool  s_renderNormalAimRange = true;
static bool  s_noclipEnabled       = false;
static bool  s_renderAimInfo       = true;
static bool  s_capturingKey        = false;

namespace {
    char s_cfgPath[MAX_PATH]{};

    const char* GetConfigPath() {
        if (!s_cfgPath[0]) {
            if (SUCCEEDED(SHGetFolderPathA(nullptr, CSIDL_PERSONAL, nullptr,
                                          SHGFP_TYPE_CURRENT, s_cfgPath))) {
                std::strncat(s_cfgPath, "\\realm_engine_aim.cfg", MAX_PATH - std::strlen(s_cfgPath) - 1);
            } else {
                GetModuleFileNameA(nullptr, s_cfgPath, MAX_PATH);
                char* slash = std::strrchr(s_cfgPath, '\\');
                if (slash) slash[1] = '\0';
                std::strncat(s_cfgPath, "realm_engine_aim.cfg", MAX_PATH - std::strlen(s_cfgPath) - 1);
            }
        }
        return s_cfgPath;
    }

    int ReadInt(const char* key, int defaultValue) {
        return GetPrivateProfileIntA("AutoAim", key, defaultValue, GetConfigPath());
    }

    float ReadFloat(const char* key, float defaultValue) {
        char fallback[32], text[64];
        std::snprintf(fallback, sizeof(fallback), "%.9g", defaultValue);
        GetPrivateProfileStringA("AutoAim", key, fallback, text, sizeof(text), GetConfigPath());
        char* end = nullptr;
        const float parsed = std::strtof(text, &end);
        return (end && end != text) ? parsed : defaultValue;
    }

    void WriteInt(const char* key, int value) {
        char text[32];
        std::snprintf(text, sizeof(text), "%d", value);
        WritePrivateProfileStringA("AutoAim", key, text, GetConfigPath());
    }

    void WriteFloat(const char* key, float value) {
        char text[32];
        std::snprintf(text, sizeof(text), "%.9g", value);
        WritePrivateProfileStringA("AutoAim", key, text, GetConfigPath());
    }

    void SaveConfig() {
        WriteInt("toggleKey", settings.KeyBinds.Toggle_AutoAim);
        WriteInt("autoAim", s_aimEnabled ? 1 : 0);
        WriteInt("targetInvulnerable", s_targetInvulnerable ? 1 : 0);
        WriteInt("predictiveAim", s_predictiveAim ? 1 : 0);
        WriteFloat("predictiveLead", s_predictiveLead);
        WriteInt("targetingStyle", s_aimMode);
        WriteInt("magnetAim", s_magnetAim ? 1 : 0);
        WriteInt("magnetRangeExt", s_magnetRangeExt ? 1 : 0);
        WriteFloat("magnetAimRange", s_magnetAimRange);
        WriteInt("renderMagnetRange", s_renderMagnetRange ? 1 : 0);
        WriteInt("renderNormalAimRange", s_renderNormalAimRange ? 1 : 0);
        WriteInt("projectileNoClip", s_noclipEnabled ? 1 : 0);
        WriteInt("renderAimInfo", s_renderAimInfo ? 1 : 0);
    }

    bool s_configLoaded = false;
    void LoadConfig() {
        if (s_configLoaded) return;
        s_configLoaded = true;

        settings.KeyBinds.Toggle_AutoAim = static_cast<uint8_t>(ReadInt("toggleKey", settings.KeyBinds.Toggle_AutoAim));
        s_aimEnabled = ReadInt("autoAim", s_aimEnabled ? 1 : 0) != 0;
        s_targetInvulnerable = ReadInt("targetInvulnerable", s_targetInvulnerable ? 1 : 0) != 0;
        s_predictiveAim = ReadInt("predictiveAim", s_predictiveAim ? 1 : 0) != 0;
        s_predictiveLead = ReadFloat("predictiveLead", s_predictiveLead);
        s_aimMode = ReadInt("targetingStyle", s_aimMode);
        s_magnetAim = ReadInt("magnetAim", s_magnetAim ? 1 : 0) != 0;
        s_magnetRangeExt = ReadInt("magnetRangeExt", s_magnetRangeExt ? 1 : 0) != 0;
        s_magnetAimRange = ReadFloat("magnetAimRange", s_magnetAimRange);
        s_renderMagnetRange = ReadInt("renderMagnetRange", s_renderMagnetRange ? 1 : 0) != 0;
        s_renderNormalAimRange = ReadInt("renderNormalAimRange", s_renderNormalAimRange ? 1 : 0) != 0;
        s_noclipEnabled = ReadInt("projectileNoClip", s_noclipEnabled ? 1 : 0) != 0;
        s_renderAimInfo = ReadInt("renderAimInfo", s_renderAimInfo ? 1 : 0) != 0;

        FeatureState::SetAutoAimEnabled(s_aimEnabled);
        AutoAim::SetShootInvulnerable(s_targetInvulnerable);
        AutoAim::SetPredictiveAim(s_predictiveAim);
        AutoAim::SetPredictiveLead(s_predictiveLead);
        AutoAim::SetMagnetAim(s_magnetAim);
        AutoAim::SetMagnetRangeExt(s_magnetRangeExt);
        AutoAim::SetMagnetAimRange(s_magnetAimRange);
        AutoAim::SetRenderMagnetRange(s_renderMagnetRange);
        AutoAim::SetRenderNormalAimRange(s_renderNormalAimRange);
        AutoAim::SetRenderAimInfo(s_renderAimInfo);
        ProjNoclip::SetEnabled(s_noclipEnabled);

        TargetSelector::Mode resolved = TargetSelector::Mode::ClosestToMouse;
        if (s_aimMode == 0) resolved = TargetSelector::Mode::ClosestToPlayer;
        else if (s_aimMode == 1) resolved = TargetSelector::Mode::ClosestToMouse;
        else if (s_aimMode == 2) resolved = TargetSelector::Mode::HighestHP;
        FeatureState::SetAutoAimMode(s_aimMode == 0 ? 0 : (s_aimMode == 2 ? 1 : 2));
        AutoAim::SetAimMode(resolved);
    }
}

static bool DrawRangeCircle(float centerX, float centerY, float radius,
                            ImU32 fill, ImU32 shadow, ImU32 outline)
{
    if (radius <= 0.05f) return false;
    float angleDeg = CameraTAB::GetAngle();
    float ortho    = CameraTAB::GetZoom();
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

    constexpr int kSegments = 96;
    constexpr float kTwoPi = 6.28318530718f;
    std::vector<ImVec2> points;
    points.reserve(kSegments);
    for (int i = 0; i < kSegments; ++i) {
        const float angle = kTwoPi * static_cast<float>(i) / static_cast<float>(kSegments);
        const float wx = centerX + cosf(angle) * radius;
        const float wy = centerY + sinf(angle) * radius;
        float sx = 0.f, sy = 0.f;
        if (!W2S(wx, wy, sx, sy, centerX, centerY, angleRad, zoom, cx, cy))
            return false;
        points.emplace_back(sx, sy);
    }

    ImDrawList* draw = ImGui::GetBackgroundDrawList();
    if ((fill & IM_COL32_A_MASK) != 0)
        draw->AddConvexPolyFilled(points.data(), static_cast<int>(points.size()), fill);
    draw->AddPolyline(points.data(), static_cast<int>(points.size()), shadow, ImDrawFlags_Closed, 3.0f);
    draw->AddPolyline(points.data(), static_cast<int>(points.size()), outline, ImDrawFlags_Closed, 1.35f);
    return true;
}

static void DrawAimRanges()
{
    if (!ImGui::GetCurrentContext()) return;
    const bool showMagnet = s_renderMagnetRange && s_magnetAim;
    const bool showNormal = s_renderNormalAimRange && s_aimEnabled;
    if (!showMagnet && !showNormal) return;

    void* local = GameState::GetLocalPtr();
    if (!local) return;
    float px = 0.f, py = 0.f;
    __try {
        uint8_t* lp = reinterpret_cast<uint8_t*>(local);
        px = *reinterpret_cast<float*>(lp + RuntimeOffsets::PosX);
        py = *reinterpret_cast<float*>(lp + RuntimeOffsets::PosY);
    } __except (EXCEPTION_EXECUTE_HANDLER) { return; }

    if (showNormal) {
        const WeaponProfile& wp = AutoAim::GetWeaponProfile();
        float normalRadius = wp.rangeTiles > 0.1f ? wp.rangeTiles : 15.f;
        DrawRangeCircle(px, py, normalRadius,
                        IM_COL32(76, 181, 225, 8),
                        IM_COL32(5, 18, 24, 175),
                        IM_COL32(92, 203, 245, 205));
    }

    if (showMagnet) {
        DrawRangeCircle(px, py, s_magnetAimRange,
                        IM_COL32(139, 117, 230, 15),
                        IM_COL32(17, 13, 31, 180),
                        IM_COL32(164, 146, 244, 220));
    }
}

void Tick(bool /*menuOpen*/)
{
    LoadConfig();

    if (settings.KeyBinds.Toggle_AutoAim != 0 && KeyBinds::IsKeyPressed(settings.KeyBinds.Toggle_AutoAim) && !s_capturingKey) {
        s_aimEnabled = !s_aimEnabled;
        FeatureState::SetAutoAimEnabled(s_aimEnabled);
        SaveConfig();
    } else {
        s_aimEnabled = FeatureState::GetAutoAimEnabled();
    }

    s_targetInvulnerable   = AutoAim::IsShootInvulnerable();
    s_predictiveAim        = AutoAim::IsPredictiveAim();
    s_predictiveLead       = AutoAim::GetPredictiveLead();
    s_magnetAim            = AutoAim::IsMagnetAim();
    s_magnetRangeExt       = AutoAim::IsMagnetRangeExt();
    s_magnetAimRange       = AutoAim::GetMagnetAimRange();
    s_renderMagnetRange    = AutoAim::IsRenderMagnetRange();
    s_renderNormalAimRange = AutoAim::IsRenderNormalAimRange();
    s_renderAimInfo        = AutoAim::IsRenderAimInfo();
    s_noclipEnabled        = ProjNoclip::IsEnabled();

    // Map internal Mode to UI style (0=Distance, 1=Cursor, 2=Health)
    const TargetSelector::Mode mode = AutoAim::GetAimMode();
    if (mode == TargetSelector::Mode::ClosestToPlayer) s_aimMode = 0;
    else if (mode == TargetSelector::Mode::ClosestToMouse) s_aimMode = 1;
    else if (mode == TargetSelector::Mode::HighestHP) s_aimMode = 2;

    if (!ProjNoclip::IsInstalled())
        ProjNoclip::Install();

    DrawAimRanges();
}

void Render()
{
    ImGui::TextUnformatted("Auto Aim Settings");
    ImGui::Separator();

    // Hotkey Widget
    char keyBtnLabel[64];
    if (s_capturingKey) {
        snprintf(keyBtnLabel, sizeof(keyBtnLabel), "[ Press Key ]##aimbotHotkey");
    } else if (settings.KeyBinds.Toggle_AutoAim != 0) {
        snprintf(keyBtnLabel, sizeof(keyBtnLabel), "Magnet Aim Toggle: [ %s ]##aimbotHotkey", KeyBinds::ToString(settings.KeyBinds.Toggle_AutoAim));
    } else {
        snprintf(keyBtnLabel, sizeof(keyBtnLabel), "Magnet Aim Toggle: [ None ]##aimbotHotkey");
    }

    ImGui::PushStyleColor(ImGuiCol_Button, s_capturingKey ? ImVec4(0.5f, 0.2f, 0.2f, 1.0f) : ImVec4(0.2f, 0.25f, 0.3f, 0.85f));
    if (ImGui::Button(keyBtnLabel)) {
        s_capturingKey = !s_capturingKey;
    }
    ImGui::PopStyleColor();

    if (s_capturingKey) {
        for (uint8_t k : KeyBinds::GetValidKeys()) {
            if (KeyBinds::IsKeyPressed(k)) {
                if (k == VK_ESCAPE) {
                    settings.KeyBinds.Toggle_AutoAim = 0;
                } else {
                    settings.KeyBinds.Toggle_AutoAim = k;
                }
                s_capturingKey = false;
                SaveConfig();
                break;
            }
        }
    }

    if (ImGui::Checkbox("Auto Aim  ##claudebawtAutoAim", &s_aimEnabled)) {
        FeatureState::SetAutoAimEnabled(s_aimEnabled);
        SaveConfig();
    }

    if (ImGui::Checkbox("Target Invulnerable Enemies##claudebawtTargetInvuln", &s_targetInvulnerable)) {
        AutoAim::SetShootInvulnerable(s_targetInvulnerable);
        SaveConfig();
    }

    if (ImGui::Checkbox("Predictive Aim (Lead Moving Enemies)##claudebawtPredictiveAim", &s_predictiveAim)) {
        AutoAim::SetPredictiveAim(s_predictiveAim);
        SaveConfig();
    }

    if (s_predictiveAim) {
        if (ImGui::SliderFloat("Lead Multiplier##claudebawtLeadMult", &s_predictiveLead, 0.25f, 2.0f, "%.2fx")) {
            AutoAim::SetPredictiveLead(s_predictiveLead);
            SaveConfig();
        }
        ImGui::TextDisabled("Calculates projectile travel time and target velocity to lead fast targets.");
    }

    static const char* styles[] = { "Distance", "Cursor", "Health" };
    int uiStyle = (s_aimMode >= 0 && s_aimMode <= 2) ? s_aimMode : 1;
    if (ImGui::Combo("Targeting Style##claudebawtTargetStyle", &uiStyle, styles, 3)) {
        s_aimMode = uiStyle;
        TargetSelector::Mode resolved = TargetSelector::Mode::ClosestToMouse;
        if (uiStyle == 0) resolved = TargetSelector::Mode::ClosestToPlayer;
        else if (uiStyle == 1) resolved = TargetSelector::Mode::ClosestToMouse;
        else if (uiStyle == 2) resolved = TargetSelector::Mode::HighestHP;
        FeatureState::SetAutoAimMode(uiStyle == 0 ? 0 : (uiStyle == 2 ? 1 : 2));
        AutoAim::SetAimMode(resolved);
        SaveConfig();
    }

    if (ImGui::Checkbox("Magnet Aim##claudebawtMagnetAim", &s_magnetAim)) {
        AutoAim::SetMagnetAim(s_magnetAim);
        SaveConfig();
    }

    if (ImGui::Checkbox("Magnet Aim Range Extension##claudebawtMagnetRangeExt", &s_magnetRangeExt)) {
        AutoAim::SetMagnetRangeExt(s_magnetRangeExt);
        SaveConfig();
    }

    if (ImGui::SliderFloat("Magnet Aim Range (Ctrl + Click to type)##claudebawtMagnetRange", &s_magnetAimRange, 1.0f, 2.25f, "%.3f")) {
        AutoAim::SetMagnetAimRange(s_magnetAimRange);
        SaveConfig();
    }

    if (ImGui::Checkbox("Show Magnet Aim Range Circle##claudebawtShowMagnetCircle", &s_renderMagnetRange)) {
        AutoAim::SetRenderMagnetRange(s_renderMagnetRange);
        SaveConfig();
    }

    if (ImGui::Checkbox("Show Normal Aim Range Circle##claudebawtShowNormalCircle", &s_renderNormalAimRange)) {
        AutoAim::SetRenderNormalAimRange(s_renderNormalAimRange);
        SaveConfig();
    }
    ImGui::TextDisabled("Normal range follows the equipped weapon's projectile reach.");

    if (ImGui::Checkbox("Projectile No Clip##claudebawtProjNoclip", &s_noclipEnabled)) {
        ProjNoclip::SetEnabled(s_noclipEnabled);
        SaveConfig();
    }

    if (ImGui::Checkbox("Render Aim Info##claudebawtRenderAimInfo", &s_renderAimInfo)) {
        AutoAim::SetRenderAimInfo(s_renderAimInfo);
        SaveConfig();
    }

    if (s_renderAimInfo && s_aimEnabled) {
        ImGui::Indent();
        if (AutoAim::HasTarget()) {
            float tx = 0.f, ty = 0.f;
            AutoAim::GetAimTarget(tx, ty);
            ImGui::TextColored(ImVec4(0.4f, 1.f, 0.5f, 1.f), "Target: (%.2f, %.2f)  ID: %d",
                               static_cast<double>(tx), static_cast<double>(ty),
                               AutoAim::GetAimFocusEnemyId());
        } else {
            ImGui::TextDisabled("Target: None");
        }
        const WeaponProfile& wp = AutoAim::GetWeaponProfile();
        if (wp.speedRaw > 0.f || wp.lifetimeMs > 0.f) {
            ImGui::TextDisabled("Proj: speed %.0f | lifetime %.0fms | reach %.2f tiles",
                                static_cast<double>(wp.speedRaw),
                                static_cast<double>(wp.lifetimeMs),
                                static_cast<double>(wp.rangeTiles));
        }
        ImGui::Unindent();
    }
}

} // namespace FeatAutoAim
} // namespace CombatTAB
