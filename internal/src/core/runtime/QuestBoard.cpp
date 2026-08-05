#include "pch-il2cpp.h"
#include "QuestBoard.h"
#include "BootGate.h"

#include <imgui/imgui.h>
#include <cstdio>
#include <windows.h>

namespace {

using State = BootGate::State;

// Once boot reaches a clean Ready, fade the board out over this long, then hide.
constexpr float kReadyFadeMs = 1800.f;

// ASCII-only strings — the default ImGui font has no check/em-dash/ellipsis glyphs
// (they render as '?'), so keep everything in the base ASCII range.
const char* CaptionFor(State s)
{
    switch (s) {
    case State::WaitingForMetadata: return "Waiting for the game to load...";
    case State::Resolving:          return "Resolving offsets...";
    case State::Auditing:           return "Checking for a game update...";
    case State::UpdateDetected:     return "Game update detected - recovering...";
    case State::Discovery:          return "Recovering offsets...";
    case State::Ready:              return "Ready";
    }
    return "...";
}

} // namespace

namespace QuestBoard {

void Render()
{
    const State st       = BootGate::Current();
    const bool  degraded = BootGate::Degraded();
    const bool  clean    = (st == State::Ready && !degraded);

    // Latch the moment we first reach clean-Ready so we can fade out from there.
    static uint64_t s_readyAtMs = 0;
    if (clean) { if (s_readyAtMs == 0) s_readyAtMs = GetTickCount64(); }
    else       { s_readyAtMs = 0; }

    float alpha = 1.f;
    if (clean) {
        const float age = static_cast<float>(GetTickCount64() - s_readyAtMs);
        if (age > kReadyFadeMs) return;                 // fully faded — draw nothing
        alpha = 1.f - (age / kReadyFadeMs);
    }

    ImDrawList* fg = ImGui::GetForegroundDrawList();
    if (!fg) return;
    const ImGuiIO& io = ImGui::GetIO();
    if (io.DisplaySize.x < 1.f) return;

    int healthy = 0, total = 0;
    BootGate::GetProgress(healthy, total);
    BootGate::AnchorView anchors[16];
    const int na    = BootGate::GetAnchorReport(anchors, 16);
    const int nrows = (na < 16) ? na : 16;
    BootGate::FeatureView feats[8];
    const int nfr = BootGate::GetFeatureReport(feats, 8);
    const int nfrows = (nfr < 8) ? nfr : 8;

    const int A = static_cast<int>(alpha * 255.f);
    auto col = [A](int r, int g, int b) { return IM_COL32(r, g, b, A); };

    const float lineH = ImGui::GetFontSize() + 5.f;
    const float boxW  = 400.f;

    int stillStaleCrit = 0;
    for (int i = 0; i < nrows; ++i)
        if (anchors[i].stale && anchors[i].critical) ++stillStaleCrit;
    const bool showHint = (stillStaleCrit > 0) &&
                          (st == State::UpdateDetected || st == State::Discovery || degraded);

    const float rowsH = lineH * static_cast<float>(nrows);
    const float featH = lineH * (1.f + static_cast<float>(nfrows)) + 3.f;
    const float hintH = showHint ? (lineH * 2.f + 4.f) : 0.f;
    const float boxH  = lineH * 4.f + rowsH + featH + hintH + 16.f;
    const float x0    = (io.DisplaySize.x - boxW) * 0.5f;
    const float y0    = io.DisplaySize.y * 0.13f;

    fg->AddRectFilled(ImVec2(x0, y0), ImVec2(x0 + boxW, y0 + boxH),
                      IM_COL32(12, 14, 20, static_cast<int>(alpha * 236.f)), 6.f);
    fg->AddRect(ImVec2(x0, y0), ImVec2(x0 + boxW, y0 + boxH),
                clean ? col(90, 220, 120) : col(90, 150, 220), 6.f, 0, 1.5f);

    const float tx = x0 + 12.f;
    float y = y0 + 8.f;
    char line[192];

    fg->AddText(ImVec2(tx, y), col(222, 236, 255), "Realm Engine  -  Offset Recovery");
    y += lineH + 2.f;

    fg->AddText(ImVec2(tx, y), col(172, 202, 236), CaptionFor(st));
    y += lineH;

    std::snprintf(line, sizeof(line), "Anchors ready:   %d / %d", healthy, total);
    fg->AddText(ImVec2(tx, y), col(172, 202, 236), line);
    y += lineH + 4.f;

    for (int i = 0; i < nrows; ++i) {
        const BootGate::AnchorView& av = anchors[i];
        const bool ok = !av.stale;
        const ImU32 c = ok ? col(90, 220, 120)
                           : (av.critical ? col(235, 90, 80) : col(230, 190, 70));
        std::snprintf(line, sizeof(line), "%s  %-18s %s%s",
                      ok ? "OK" : "--",
                      av.role ? av.role : (av.klass ? av.klass : "?"),
                      ok ? "recovered" : "stale",
                      av.critical ? "   [critical]" : "");
        fg->AddText(ImVec2(tx, y), c, line);
        y += lineH;
    }

    // ── Which features this blocks ──
    y += 3.f;
    fg->AddText(ImVec2(tx, y), col(200, 210, 225), "Features affected:");
    y += lineH;
    for (int i = 0; i < nfrows; ++i) {
        const BootGate::FeatureView& fv = feats[i];
        const ImU32 c = fv.blocked ? col(235, 90, 80) : col(90, 220, 120);
        std::snprintf(line, sizeof(line), "%s  %-22s %s",
                      fv.blocked ? "--" : "OK",
                      fv.label ? fv.label : (fv.feature ? fv.feature : "?"),
                      fv.blocked ? "disabled" : "working");
        fg->AddText(ImVec2(tx, y), c, line);
        y += lineH;
    }

    if (showHint) {
        y += 4.f;
        fg->AddText(ImVec2(tx, y), col(240, 210, 120),
                    "Load into a realm and let a shot fire near you");
        y += lineH;
        fg->AddText(ImVec2(tx, y), col(240, 210, 120),
                    "so bullet / AoE offsets can be sampled live.");
    }
}

} // namespace QuestBoard
