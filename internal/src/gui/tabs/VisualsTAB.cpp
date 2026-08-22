#include "pch-il2cpp.h"
#include "features/visuals/SafeZoneMap.h"
#include "core/config/keybinds.h"
#include "core/config/settings.h"
#include "VisualsTAB.h"
#include "WorldTAB.h"
#include <imgui/imgui.h>
#include <cstdio>
#include <cstring>
#include <cctype>
#include <algorithm>
#include "Il2CppResolver.h"
#include "RuntimeOffsets.h"
#include "SkinChanger.h"
#include "FeatureState.h"
#include "SkinDatabase.h"

// All field offsets are resolved centrally by RuntimeOffsets::EnsureAll()
// (called once per frame from DirectX.cpp before any tab Tick).
//
// KJMONHENJEN base fields (objectType, pos, etc.) — no ACTK shift.
// LKHPPBEGNOM own fields >= dump 0x1B8 — +0x50 ACTK shift.
// FKALGHJIADI own fields — +0x50 ACTK shift.

static bool AddrValid(const void* p)
{
    if (!p)
        return false;
    MEMORY_BASIC_INFORMATION mbi{};
    if (VirtualQuery(p, &mbi, sizeof(mbi)) == 0)
        return false;
    return (mbi.State == MEM_COMMIT)
        && (mbi.Protect
            & (PAGE_READWRITE | PAGE_EXECUTE_READWRITE | PAGE_READONLY | PAGE_EXECUTE_READ));
}

static int32_t ReadInt32At(void* local, uint32_t fieldOffset)
{
    if (!local || !AddrValid(local))
        return 0;
    int32_t v = 0;
    __try {
        v = *reinterpret_cast<int32_t*>(reinterpret_cast<uint8_t*>(local) + fieldOffset);
    } __except (EXCEPTION_EXECUTE_HANDLER) {
        v = 0;
    }
    return v;
}

static void WriteInt32At(void* local, uint32_t fieldOffset, int32_t v)
{
    if (!local || !AddrValid(local))
        return;
    __try {
        *reinterpret_cast<int32_t*>(reinterpret_cast<uint8_t*>(local) + fieldOffset) = v;
    } __except (EXCEPTION_EXECUTE_HANDLER) {}
}

// ── MaxHP (NCBIICBDGAG) override ──────────────────────────────────────────
static bool     g_kjnhlOverride = false;
static int32_t  g_kjnhlEdit = 0;
static int32_t  g_kjnhlLastRead = 0;

// ── objectType (HFDNHJFNEKA) — KJMONHENJEN base field, no ACTK shift ──────
// Changing this client-side alters the sprite/entity type displayed for the local player.
static bool     g_objTypeOverride = false;
static int32_t  g_objTypeEdit = 0;
static int32_t  g_objTypeLastRead = 0;

static bool     g_hadLocalLastTick = false;

// ── Skin Browser ──────────────────────────────────────────────────────────────
static char     g_skinFilter[128]  = {};
static int      g_skinSelected     = -1;
static std::vector<const SkinEntry*> g_skinFiltered;

static void RebuildSkinFilter()
{
    g_skinFiltered.clear();
    const auto& all = SkinDatabase::GetAll();

    // Case-insensitive substring match
    std::string needle = g_skinFilter;
    std::transform(needle.begin(), needle.end(), needle.begin(), ::tolower);

    for (const auto& e : all) {
        if (needle.empty()) {
            g_skinFiltered.push_back(&e);
        } else {
            std::string hay = e.name;
            std::transform(hay.begin(), hay.end(), hay.begin(), ::tolower);
            if (hay.find(needle) != std::string::npos)
                g_skinFiltered.push_back(&e);
        }
    }

    g_skinSelected = -1;
}

namespace VisualsTAB {

void Tick(bool /*menuVisible*/)
{
    void* lp = WorldTAB::GetLocalPtr();
    g_hadLocalLastTick = (lp != nullptr && AddrValid(lp));

    if (g_hadLocalLastTick) {
        g_kjnhlLastRead    = ReadInt32At(lp, RuntimeOffsets::MaxHP);
        g_objTypeLastRead  = ReadInt32At(lp, RuntimeOffsets::ObjType);

        if (g_kjnhlOverride)
            WriteInt32At(lp, RuntimeOffsets::MaxHP, g_kjnhlEdit);
        if (g_objTypeOverride)
            WriteInt32At(lp, RuntimeOffsets::ObjType, g_objTypeEdit);
    }
}

void Render()
{
    // ── Safe-zone heatmap ────────────────────────────────────────────────────
    ImGui::TextColored(ImVec4(0.5f, 0.95f, 0.65f, 1.f), "SAFE ZONE HEATMAP");
    ImGui::TextWrapped(
        "Shades ground by how long until an in-flight shot reaches it. "
        "Green = nothing incoming within the horizon. Read-only: it never moves "
        "your character, so there is nothing for other players to notice.");
    {
        bool enabled = SafeZoneMap::IsEnabled();
        if (ImGui::Checkbox("Enable##szmEnable", &enabled))
            SafeZoneMap::SetEnabled(enabled);

        // Rebindable toggle, mirroring the Auto Aim key capture.
        ImGui::SameLine();
        static bool s_capturingSzmKey = false;
        char szmKeyLabel[48];
        if (s_capturingSzmKey)
            snprintf(szmKeyLabel, sizeof(szmKeyLabel), "[ Press Key ]##szmKey");
        else if (settings.KeyBinds.Toggle_SafeZones != 0)
            snprintf(szmKeyLabel, sizeof(szmKeyLabel), "[ Key: %s ]##szmKey",
                     KeyBinds::ToString(settings.KeyBinds.Toggle_SafeZones));
        else
            snprintf(szmKeyLabel, sizeof(szmKeyLabel), "[ Key: None ]##szmKey");

        ImGui::PushStyleColor(ImGuiCol_Button, s_capturingSzmKey
            ? ImVec4(0.5f, 0.2f, 0.2f, 1.0f) : ImVec4(0.2f, 0.25f, 0.3f, 0.85f));
        if (ImGui::Button(szmKeyLabel)) s_capturingSzmKey = !s_capturingSzmKey;
        ImGui::PopStyleColor();

        if (s_capturingSzmKey) {
            for (uint8_t k : KeyBinds::GetValidKeys()) {
                if (KeyBinds::IsKeyPressed(k)) {
                    settings.KeyBinds.Toggle_SafeZones = (k == VK_ESCAPE) ? 0 : k;
                    s_capturingSzmKey = false;
                    break;
                }
            }
        }

        int styleIdx = static_cast<int>(SafeZoneMap::GetStyle());
        ImGui::PushItemWidth(180.f);
        if (ImGui::Combo("Style##szmStyle", &styleIdx, "Fill only\0Outline only\0Both\0"))
            SafeZoneMap::SetStyle(static_cast<SafeZoneMap::Style>(styleIdx));
        ImGui::PopItemWidth();
        ImGui::SameLine(); ImGui::TextDisabled("(?)");
        if (ImGui::IsItemHovered())
            ImGui::SetTooltip("Outlines trace the exact edge of each region at full field\nresolution. Fills alone read soft and blur the gaps together.");

        bool showDanger = SafeZoneMap::IsShowDanger();
        if (ImGui::Checkbox("Also shade danger##szmDanger", &showDanger))
            SafeZoneMap::SetShowDanger(showDanger);
        ImGui::SameLine(); ImGui::TextDisabled("(?)");
        if (ImGui::IsItemHovered())
            ImGui::SetTooltip("Off = only safe ground is tinted, which is much calmer to read\nin a dense bullet pattern.");

        float horizon = SafeZoneMap::GetHorizonMs();
        ImGui::PushItemWidth(180.f);
        if (ImGui::SliderFloat("Look ahead (ms)##szmHorizon", &horizon, 300.f, 4000.f, "%.0f"))
            SafeZoneMap::SetHorizonMs(horizon);

        int minDmg = SafeZoneMap::GetMinDamage();
        if (ImGui::SliderInt("Ignore damage below##szmMinDmg", &minDmg, 0, 200))
            SafeZoneMap::SetMinDamage(minDmg);
        ImGui::PopItemWidth();
        ImGui::SameLine(); ImGui::TextDisabled("(?)");
        if (ImGui::IsItemHovered())
            ImGui::SetTooltip(
                "Shots weaker than this are left out entirely, so chip damage\n"
                "stops closing off ground you would happily stand on.\n"
                "0 disables the filter. Compares against a shot's MAX damage,\n"
                "and shots whose damage cannot be read are always kept.\n"
                "Note this is raw damage, before your defense.");
        ImGui::PushItemWidth(180.f);

        float dangerWin = SafeZoneMap::GetDangerWindowMs();
        if (ImGui::SliderFloat("Danger window (ms)##szmDangerWin", &dangerWin, 100.f, 2000.f, "%.0f"))
            SafeZoneMap::SetDangerWindowMs(dangerWin);
        ImGui::PopItemWidth();
        ImGui::SameLine(); ImGui::TextDisabled("(?)");
        if (ImGui::IsItemHovered())
            ImGui::SetTooltip(
                "How soon a shot must arrive before its tile is painted red.\n"
                "Separate from look-ahead on purpose: a bullet a second away\n"
                "from a tile is no threat to you standing there now, and\n"
                "shading it anyway hides the gaps between shots.");
        ImGui::PushItemWidth(180.f);

        float comfort = SafeZoneMap::GetComfortTiles();
        if (ImGui::SliderFloat("Comfort margin (tiles)##szmComfort", &comfort, 0.f, 3.f, "%.2f"))
            SafeZoneMap::SetComfortTiles(comfort);
        ImGui::PopItemWidth();
        ImGui::SameLine(); ImGui::TextDisabled("(?)");
        if (ImGui::IsItemHovered())
            ImGui::SetTooltip(
                "How much room a safe pocket needs before it is shown.\n"
                "Your hitbox is already accounted for, so 0 shows every gap you\n"
                "would technically fit in — including ones no human could steer\n"
                "into. Raise it to be shown only pockets you can realistically take.");

        ImGui::PushItemWidth(180.f);
        float reach = SafeZoneMap::GetMaxReachTiles();
        if (ImGui::SliderFloat("Max reach (tiles)##szmReach", &reach, 2.f, 20.f, "%.0f"))
            SafeZoneMap::SetMaxReachTiles(reach);

        float opacity = SafeZoneMap::GetOpacity();
        if (ImGui::SliderFloat("Opacity##szmOpacity", &opacity, 0.f, 1.f, "%.2f"))
            SafeZoneMap::SetOpacity(opacity);
        ImGui::PopItemWidth();
        ImGui::SameLine(); ImGui::TextDisabled("(?)");
        if (ImGui::IsItemHovered())
            ImGui::SetTooltip(
                "Ground further than this is not drawn. Also clamped by how far\n"
                "you could actually run inside the look-ahead window, so safe\n"
                "ground you could never reach in time stays hidden.");

        if (SafeZoneMap::IsEnabled()) {
            ImGui::TextDisabled("effective reach: %.1f tiles (from SPD stat, not live speed)",
                                static_cast<double>(SafeZoneMap::GetEffectiveReachTiles()));
            ImGui::TextDisabled("ignored as too weak: %d shot(s)", SafeZoneMap::GetFilteredCount());
            ImGui::TextDisabled("shots folded in: %d   comfortable cells: %d   rebuild: %.0f us",
                                SafeZoneMap::GetThreatCount(),
                                SafeZoneMap::GetSafeCellCount(),
                                static_cast<double>(SafeZoneMap::GetLastBuildUs()));
            ImGui::TextDisabled("Only knows shots already fired — an enemy that has not");
            ImGui::TextDisabled("fired yet can still shoot into green ground.");
        }
    }
    ImGui::Spacing();
    ImGui::Separator();
    ImGui::Spacing();

    void* lp = WorldTAB::GetLocalPtr();
    const bool haveLocal = (lp != nullptr && AddrValid(lp));

    ImGui::TextColored(ImVec4(0.4f, 0.85f, 1.f, 1.f), "Max HP (NCBIICBDGAG)");
    ImGui::TextWrapped(
        "int at LKHPPBEGNOM + 0x%X — resolved at runtime. Writes each frame while Override is on.",
        static_cast<unsigned>(RuntimeOffsets::MaxHP));

    if (!haveLocal) {
        ImGui::TextColored(ImVec4(1.f, 0.55f, 0.35f, 1.f),
            "No local player — open World tab and refresh, or enter a realm.");
    } else {
        const int32_t kLive = ReadInt32At(lp, RuntimeOffsets::MaxHP);
        ImGui::Text("Live read:  %d", static_cast<int>(kLive));
        ImGui::TextDisabled("Last tick read:  %d", static_cast<int>(g_kjnhlLastRead));
        if (ImGui::Button("Copy live -> editor##kjnhl"))
            g_kjnhlEdit = kLive;
        ImGui::Checkbox("Override##kjnhl", &g_kjnhlOverride);
        ImGui::SameLine();
        ImGui::SetNextItemWidth(160.f);
        ImGui::InputInt("##kjnhl_val", &g_kjnhlEdit);
        if (g_kjnhlOverride) {
            ImGui::TextColored(ImVec4(1.f, 0.85f, 0.35f, 1.f),
                "Override active — use at your own risk.");
        }
    }

    ImGui::Spacing();
    ImGui::Separator();
    ImGui::Spacing();

    // ── Skin Changer (direct KJNHLADHEMH write) ──────────────────────────────
    ImGui::TextColored(ImVec4(0.5f, 0.95f, 0.65f, 1.f), "Skin Changer (KJNHLADHEMH)");
    ImGui::TextWrapped(
        "Writes KJNHLADHEMH (RuntimeOffsets::HP — current HP field on LKHPPBEGNOM). "
        "Legacy skin UI; re-applies on map change.");

    {
        bool overrideOn = FeatureState::GetSkinOverrideEnabled();
        int skinOverrideId = FeatureState::GetSkinOverrideId();

        if (!haveLocal) {
            ImGui::TextDisabled("  (need local player — will auto-resolve on realm entry)");
        } else {
            const int32_t live = ReadInt32At(lp, RuntimeOffsets::HP);
            ImGui::Text("Current KJNHLADHEMH: %d", static_cast<int>(live));
            if (ImGui::Button("Copy current -> editor##skin"))
                skinOverrideId = live;
        }

        ImGui::SetNextItemWidth(160.f);
        if (ImGui::InputInt("Skin ID##skin_val", &skinOverrideId))
            FeatureState::SetSkinOverride(overrideOn, skinOverrideId);

        bool on = overrideOn;
        if (ImGui::Checkbox("Override##skin", &on))
            FeatureState::SetSkinOverride(on, skinOverrideId);

        if (overrideOn) {
            // Keep the stored skin ID in sync with the editor while override is active.
            if (skinOverrideId != FeatureState::GetSkinOverrideId())
                FeatureState::SetSkinOverride(true, skinOverrideId);

            ImGui::SameLine();
            if (ImGui::Button("Apply now##skin"))
                SkinChanger::Apply();

            if (SkinChanger::IsApplied())
                ImGui::TextColored(ImVec4(0.4f, 1.f, 0.5f, 1.f),
                    "Applied -> %d", skinOverrideId);
            else
                ImGui::TextColored(ImVec4(1.f, 0.85f, 0.35f, 1.f),
                    "Pending — waiting for local player ptr...");
        }
    }

    ImGui::Spacing();
    ImGui::Separator();
    ImGui::Spacing();

    // ── objectType (Skin / Entity Type) ──────────────────────────────────────
    ImGui::TextColored(ImVec4(1.f, 0.75f, 0.3f, 1.f), "Object Type (Skin / Entity Type)");
    ImGui::TextWrapped(
        "int at KJMONHENJEN + 0x%X (HFDNHJFNEKA) — no ACTK shift. "
        "Controls the entity/sprite type ID. Writes each frame while Override is on.",
        static_cast<unsigned>(RuntimeOffsets::ObjType));

    if (!haveLocal) {
        ImGui::TextDisabled("  (need local player)");
    } else {
        const int32_t ot = ReadInt32At(lp, RuntimeOffsets::ObjType);
        ImGui::Text("Live:  %d   |   last tick:  %d", static_cast<int>(ot),
            static_cast<int>(g_objTypeLastRead));
        if (ImGui::Button("Copy live -> editor##objtype"))
            g_objTypeEdit = ot;
        ImGui::Checkbox("Override##objtype", &g_objTypeOverride);
        ImGui::SameLine();
        ImGui::SetNextItemWidth(160.f);
        ImGui::InputInt("##objtype_val", &g_objTypeEdit);
        if (g_objTypeOverride) {
            ImGui::TextColored(ImVec4(1.f, 0.85f, 0.35f, 1.f),
                "Override active — client-side only, server may reject or reset.");
        }
    }

    ImGui::Spacing();
    ImGui::Separator();
    ImGui::Spacing();

    // ── Skin Browser ─────────────────────────────────────────────────────────
    ImGui::TextColored(ImVec4(0.7f, 0.6f, 1.f, 1.f), "Skin Browser");

    if (!SkinDatabase::IsLoaded()) {
        if (ImGui::Button("Load skin list from objects.xml")) {
            if (SkinDatabase::Load())
                RebuildSkinFilter();
        }
    } else {
        ImGui::TextDisabled("%d skins loaded", static_cast<int>(SkinDatabase::GetAll().size()));

        ImGui::SetNextItemWidth(-1.f);
        if (ImGui::InputText("##skinfilter", g_skinFilter, sizeof(g_skinFilter)))
            RebuildSkinFilter();

        if (g_skinFiltered.empty() && SkinDatabase::IsLoaded())
            RebuildSkinFilter();

        // Listbox — 8 rows tall
        ImGui::SetNextItemWidth(-1.f);
        if (ImGui::BeginListBox("##skinlist", ImVec2(-1.f, 8 * ImGui::GetTextLineHeightWithSpacing()))) {
            for (int i = 0; i < static_cast<int>(g_skinFiltered.size()); ++i) {
                const SkinEntry* e = g_skinFiltered[i];
                char label[256];
                snprintf(label, sizeof(label), "%s  (0x%04X)", e->name.c_str(), static_cast<unsigned>(e->id));

                bool selected = (g_skinSelected == i);
                if (ImGui::Selectable(label, selected)) {
                    g_skinSelected = i;
                    FeatureState::SetSkinOverride(true, e->id);
                }
                if (selected)
                    ImGui::SetItemDefaultFocus();
            }
            ImGui::EndListBox();
        }

        if (g_skinSelected >= 0 && g_skinSelected < static_cast<int>(g_skinFiltered.size())) {
            const SkinEntry* e = g_skinFiltered[g_skinSelected];
            ImGui::Text("Selected: %s (0x%04X)", e->name.c_str(), static_cast<unsigned>(e->id));
            ImGui::SameLine();
            if (ImGui::SmallButton("Apply##browser"))
                SkinChanger::Apply();
            ImGui::SameLine();
            if (ImGui::SmallButton("Clear##browser")) {
                g_skinSelected = -1;
                FeatureState::SetSkinOverride(false, 0);
            }
        }
    }
}

} // namespace VisualsTAB
