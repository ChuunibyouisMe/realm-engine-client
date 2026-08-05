#pragma once

// QuestBoard — the in-game offset-recovery overlay ("Recovering offsets N/M…").
//
// Renders every frame from dPresent (outside the menu gate) but draws only while
// the BootGate self-heal loop is active — i.e. anything other than a clean Ready.
// It reads BootGate's public progress/anchor API directly (no diag.json parse) and
// fades out ~1.8 s after boot settles healthy. Pure read-only UI: it never touches
// game memory, so it cannot crash the game path.
namespace QuestBoard {
    void Render();
}
