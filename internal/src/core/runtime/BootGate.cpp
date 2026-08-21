#include "pch-il2cpp.h"
#include "BootGate.h"
#include "RuntimeOffsets.h"
#include "LocalPlayer.h"
#include "GameState.h"
#include "DbgFileLog.h"

#include <cstring>
#include <cstdio>

namespace BootGate {
namespace {

// ── The critical anchor registry ────────────────────────────────────────────
// The gate tracks anchor classes. The `klass` strings are the CURRENT
// obfuscated names — used only as a hint and for matching the unresolved-class
// list; staleness is decided structurally (class unresolved after settle, or a
// live sanity check flags its field), never by trusting the string.
struct Anchor {
    const char* klass;
    const char* role;
    bool        critical;
};

constexpr Anchor kAnchors[] = {
    { "HBEAKBIHANL", "Projectile instance", true  },
    { "LKHPPBEGNOM", "Player stats",        true  },
    { "HJMBOMEHGDJ", "World manager",       true  },
    { "KJMONHENJEN", "Entity base",         true  },
    { "CMFPKCJHKKB", "Tile properties",     true  },
    { "BGAIOPJMHLO", "Tile instance",       true  },
    { "FKALGHJIADI", "Player avatar",       false },
    { "GJJCEFJMNMK", "AoE throwable",       false },
    { "FHOHCELBPDO", "AoE visual",          false },
    { "COEFCBBIBMC", "Show-effect",         false },
};
constexpr int kAnchorCount = static_cast<int>(sizeof(kAnchors) / sizeof(kAnchors[0]));

struct FeatureNeeds { const char* feature; const char* label; const char* needs[4]; int count; };
constexpr FeatureNeeds kFeatures[] = {
    { "ProjectileTracking", "Bullet dodging",        { "HBEAKBIHANL", "KJMONHENJEN" },               2 },
    { "AoeTracking",        "AoE / ground dodging",  { "GJJCEFJMNMK", "FHOHCELBPDO" },               2 },
    { "AutoNexus",          "Auto-nexus (survival)", { "LKHPPBEGNOM", "HBEAKBIHANL" },               2 },
    { "SafeWalk",           "Safe-walk (hazards)",   { "CMFPKCJHKKB", "BGAIOPJMHLO", "KJMONHENJEN" }, 3 },
};
constexpr int kFeatureCount = static_cast<int>(sizeof(kFeatures) / sizeof(kFeatures[0]));

// ── State ────────────────────────────────────────────────────────────────────
State s_state = State::WaitingForMetadata;
bool  s_anchorStale[kAnchorCount] = {};
bool  s_audited      = false;
bool  s_liveAudited  = false;
char  s_status[128]  = "Initializing\xE2\x80\xA6";

void SetStatus(const char* s) { std::snprintf(s_status, sizeof(s_status), "%s", s); }

void EnterState(State next, const char* status) {
    if (next != s_state)
        DBG_FILE_LOG("[BootGate] state -> " << status);
    s_state = next;
    SetStatus(status);
}

bool PlayerLoaded() {
    return LocalPlayer::GetPtr() != nullptr && LocalPlayer::GetMaxHP() > 0;
}

int FindAnchor(const char* klass) {
    for (int i = 0; i < kAnchorCount; ++i)
        if (std::strcmp(kAnchors[i].klass, klass) == 0) return i;
    return -1;
}

bool AnchorStale(const char* klass) {
    const int i = FindAnchor(klass);
    return i >= 0 ? s_anchorStale[i] : false;
}

bool AnyCriticalStale() {
    for (int i = 0; i < kAnchorCount; ++i)
        if (kAnchors[i].critical && s_anchorStale[i]) return true;
    return false;
}

void Audit() {
    const bool inWorld = PlayerLoaded();

    if (inWorld)
        RuntimeOffsets::SanityCheckPlayerStats(
            LocalPlayer::GetHP(), LocalPlayer::GetMaxHP(), LocalPlayer::GetDefense());

    for (int i = 0; i < kAnchorCount; ++i) s_anchorStale[i] = false;

    RuntimeOffsets::OffsetReportRow rows[160];
    const int total = RuntimeOffsets::GetOffsetReport(rows, 160);
    const int n = total < 160 ? total : 160;
    for (int r = 0; r < n; ++r) {
        const RuntimeOffsets::OffsetState st = rows[r].state;
        const bool bad = (st == RuntimeOffsets::OffsetState::Suspect)
                      || (inWorld && st == RuntimeOffsets::OffsetState::FallbackGaveUp);
        if (!bad) continue;
        const int a = FindAnchor(rows[r].className);
        if (a >= 0) s_anchorStale[a] = true;
    }

    int staleCrit = 0;
    for (int i = 0; i < kAnchorCount; ++i) {
        if (!s_anchorStale[i]) continue;
        if (kAnchors[i].critical) ++staleCrit;
        DBG_FILE_LOG("[BootGate] audit: STALE anchor '" << kAnchors[i].klass
                     << "' (" << kAnchors[i].role << ")"
                     << (kAnchors[i].critical ? " [CRITICAL]" : ""));
    }
    s_audited     = true;
    s_liveAudited = inWorld;
    DBG_FILE_LOG("[BootGate] audit (" << (inWorld ? "live" : "metadata-only")
                 << "): " << staleCrit << " critical anchor(s) stale");
}

bool LiveReauditIfNeeded() {
    if (s_liveAudited || !PlayerLoaded()) return false;
    Audit();
    return true;
}

} // namespace

State Tick() {
    RuntimeOffsets::EnsureAll();

    switch (s_state) {
    case State::WaitingForMetadata:
        SetStatus("Resolving offsets\xE2\x80\xA6");
        if (RuntimeOffsets::AllResolved())
            EnterState(State::Auditing, "Checking for game changes\xE2\x80\xA6");
        break;

    case State::Resolving:
        if (RuntimeOffsets::AllResolved())
            EnterState(State::Auditing, "Checking for game changes\xE2\x80\xA6");
        break;

    case State::Auditing:
        Audit();
        EnterState(State::Ready, AnyCriticalStale() ? "Ready (degraded)" : "Ready");
        break;

    case State::Ready:
        LiveReauditIfNeeded();
        break;
    }
    return s_state;
}

State Current() { return s_state; }

void RequestRecheck() {
    s_liveAudited = false;
    EnterState(State::Resolving, "Re-checking offsets\xE2\x80\xA6");
}

bool FeatureAllowed(const char* feature) {
    if (s_state != State::Ready) return false;
    for (int i = 0; i < kFeatureCount; ++i) {
        if (std::strcmp(kFeatures[i].feature, feature) != 0) continue;
        for (int n = 0; n < kFeatures[i].count; ++n)
            if (AnchorStale(kFeatures[i].needs[n])) return false;
        return true;
    }
    return true;
}

void GetProgress(int& healthy, int& total) {
    int crit = 0, ok = 0;
    for (int i = 0; i < kAnchorCount; ++i) {
        if (!kAnchors[i].critical) continue;
        ++crit;
        if (s_audited && !s_anchorStale[i]) ++ok;
    }
    healthy = ok;
    total   = crit;
}

bool Degraded() { return s_audited && AnyCriticalStale(); }

const char* StatusLine() { return s_status; }

int GetAnchorReport(AnchorView* out, int maxRows) {
    int n = 0;
    for (int i = 0; i < kAnchorCount && n < maxRows; ++i, ++n) {
        out[n].klass    = kAnchors[i].klass;
        out[n].role     = kAnchors[i].role;
        out[n].critical = kAnchors[i].critical;
        out[n].stale    = s_anchorStale[i];
    }
    return kAnchorCount;
}

int GetFeatureReport(FeatureView* out, int maxRows) {
    int n = 0;
    for (int i = 0; i < kFeatureCount && n < maxRows; ++i, ++n) {
        out[n].feature = kFeatures[i].feature;
        out[n].label   = kFeatures[i].label;
        bool blocked = false;
        for (int k = 0; k < kFeatures[i].count; ++k)
            if (AnchorStale(kFeatures[i].needs[k])) { blocked = true; break; }
        out[n].blocked = blocked;
    }
    return kFeatureCount;
}

} // namespace BootGate
