# Self-Healing IL2CPP Resolution — Full Plan (Phases 0–3)

**Goal:** when a game patch lands and BeeByte re-randomizes class/field names, the
cheat should **detect it, recover locally, and degrade gracefully** instead of
silently breaking (today: stale projectile class → zero bullets captured → no
dodge, and a stale damage offset → over-estimated damage). The DLL re-derives the
metadata itself — "what Il2CppInspector does, but live, automatic, and local."

---

## 0. The key insight (why this is feasible)

We are **inside the process with IL2CPP already loaded**, so we don't parse files
like Il2CppInspector — the runtime has *already* resolved every class, field,
offset, and method pointer. We just read it live. Every primitive already exists
in the codebase:

| Need | API (already used in repo) |
|------|----------------------------|
| Walk **every** class | `il2cpp_class_for_each` (`Il2CppResolver.cpp:322`) — `domain_get_assemblies` isn't exported, this is the workaround |
| Fields + offsets | `il2cpp_class_get_fields` + `il2cpp_field_get_offset` |
| Field **types** (the anchor) | `il2cpp_field_get_type` + `il2cpp_class_from_type` + `il2cpp_type_get_name` (`Il2CppResolver.cpp:14/78/160`) |
| Method **RVAs** | `il2cpp_class_get_methods` + `mi->methodPointer` (RVA = ptr − module base) |
| Hierarchy | `il2cpp_class_get_parent` |
| Status / report surface | `RuntimeOffsets` offset-health API (already built) |

**Stable anchors** that BeeByte does NOT rename (resolve by real C# name):
`ProjectileProperties`, `ObjectProperties`, `ProjectileCustomHitbox`,
`ViewHandler`, all `UnityEngine.*`/`System.*`. The *renamed* classes still
**reference** these — that reference is the fingerprint we match on.

**Boot flow** (`bootstrap/main.cpp` `Run`): `init_il2cpp` → `AttachIl2Cpp` →
`DetourInitilization` (installs the DXGI Present hook). Game classes load lazily
once in a world, so resolution + recovery run as a **per-frame state machine**
from the render loop, not a one-shot at `Run()`.

---

## 0.5 The never-miss principle (the thing that makes "everything works" real)

You cannot 100%-guarantee a heuristic survives *every* future obfuscation. What
you CAN guarantee — and what this whole design is built around — is that the cheat
**never silently runs on a wrong offset**. It is always either *correct* or
*clearly flagged + auto-recovering*. "Everything works" = "every GREEN dependency
is correct, nothing RED runs, and the GREEN set self-heals." Four pillars:

**1. Kill name-dependence.** The obfuscated names are the only thing that changes
each patch, so demote them to *hints*, never the source of truth. Re-key every
renamed class to something stable.

**2. The robustness ladder** — resolve each dependency by these, in order,
stopping at the first that *validates*. Higher = more robust:
1. **Runtime type from a live object** flowing through a hook on a
   signature-identified method → `il2cpp_object_get_class(this)`. The class comes
   from the real object — it cannot be wrong. *Gold standard.*
2. **Type-anchor** — a field whose type is a stable class (`ProjectileProperties*`).
3. **Method-signature** — param/return types are stable types.
4. **RVA** — the collaborator's known-RVA table (reliable, but per-patch).
5. **Value cross-validation** — read a live instance, match expected range/cross-ref.
6. **Obfuscated name** (today) — demoted to a hint only.

**3. Validate everything (a live self-test).** After resolution, read live
instances and check every offset (`HP ≤ MaxHP`, `damage ∈ [MinDamage,MaxDamage]`,
positions finite, projectile count sane, …). No offset is *trusted* until it
validates against live data; a failed check → RED → degrade + retry. Redundant
strategies that disagree → RED.

**4. Complete registry + fail-closed gate.** Every offset the cheat uses lives in
ONE dependency registry — the completeness ledger. "Fully operational" is reported
**only** when every critical entry is GREEN; otherwise the green features run and
the red ones are flagged with exact reasons. A RED offset is never used.

**Why it holds:** every renamed class connects to a stable-named class (field
type, method signature, a live object through a hook, or an RVA) — there is always
a path from a stable root to anything we need. Resolve along that path + validate
against live values, and a rename becomes a non-event. The residual hard case (a
plain int among many) is caught by value-cross-validation; if even that can't
disambiguate, it goes RED, never silently wrong.

This reframes Phase 1 from "a signature per class" into a **layered resolver**:
every registry entry carries an ordered list of strategies + a validator, and is
GREEN only when one strategy resolves AND the validator passes.

---

## Phase 0 — Preliminary boot / health gate

**What:** a boot state machine that runs resolution, audits health, and **gates
hooking on it** so broken features never install silently.

States (driven each frame from `dPresent` until settled):
1. `WaitingForMetadata` — IL2CPP up but game classes not loaded yet (current
   lazy-load wait). Show "initializing…".
2. `Resolving` — run `RuntimeOffsets::EnsureAll()` (name pass) + the live sanity
   checks.
3. `Auditing` — read the offset-health summary. Classify every **critical**
   dependency as `OK` / `STALE` / `RECOVERABLE`. Compare the current **game build
   hash** against the last-known good one (persisted, A5). A hash change and/or any
   STALE dep ⇒ "the game updated, things moved."
4. `UpdateDetected` — **the consent gate.** Instead of silently recovering, show
   the prompt:
   > ⚠ **Game update detected.** Things may have shifted — N dependencies look
   > stale. **Enter Discovery Mode to patch your game?**  `[ Enter Discovery ]  [ Not now ]`

   Stay here (features that are still healthy keep running; stale ones stay off)
   until the user accepts, or auto-enter if the "Auto-patch on update" preference
   is on. "Not now" → go to `Ready` in degraded mode; the banner stays so they can
   start discovery later.
5. `Discovery` (recovery) — the user opted in. Run **Phase 1** (auto-resolver)
   while the **Quest Board** (Phase 3) shows each stale dep being hunted, found,
   classified stale/fresh, and validated — live. One "quest" per dependency.
6. `Ready` — hook everything that resolved; show the health report; leave
   degraded features off.

**Critical dependency registry** (new): the gate's feature→needs view, derived
from the **completeness ledger** (full table in the next section — every offset
the cheat uses, nothing missing):
```
{ feature: "ProjectileTracking", needs: [HBEAKBIHANL, ProjectileProperties], gates: AutoDodge/RE++/AutoNexus-proj }
{ feature: "AoeTracking",        needs: [GJJCEFJMNMK, FHOHCELBPDO],           gates: AoE dodging }
{ feature: "AutoNexus",          needs: [LKHPPBEGNOM(HP/MaxHP/Defense), HBEAKBIHANL(damage)], gates: nexus damage calc }
{ feature: "WorldEnumeration",   needs: [HJMBOMEHGDJ, KJMONHENJEN],           gates: ALL enemy/tile reads (foundational) }
{ feature: "SafeWalk/Hazards",   needs: [CMFPKCJHKKB, BGAIOPJMHLO, square_lookup RVA], gates: damaging-tile dodge }
{ feature: "Targeting/Walls",    needs: [ObjectProperties],                   gates: isEnemy / fullOccupy / blockProjectiles }
```

**Deliverable:** features check `IsDependencyHealthy(feature)` before `Install()`.
The current `ProjectileTracking::ResolveProjClass()` failure path (`No bullets
captured`) becomes a clean gated state, not a silent dead engine.

**Effort:** small — most of it is the offset-health status layer (already built)
+ the dependency registry + the gate check + the state machine. Low risk
(additive; worst case = today's behavior with a clearer log/UI).

---

## The dependency registry — completeness ledger (everything we track)

This is pillar 4 made concrete: **every** offset/class/RVA the cheat uses, in one
place, so the fail-closed gate can never miss one. Recovery happens **per anchor
class**, so the ledger is keyed by class (15 anchors → all 126 offsets). Resolve
the class once and its fields fall out; that means the Quest Board has **~15
class-quests**, not 126 field-quests. Source of truth: `RuntimeOffsets.cpp`
`s_entries[]` (kEntryCount=126) + the 2 RVAs + the handful resolved outside the
table (`AppMgr_WorldMgr`, `Player_Spd`).

### Tier A — BeeByte-obfuscated classes (the fragile, must-recover set)
Class name AND field names re-randomize every patch. These are the quests that
actually matter.

| Anchor class (role) | # offsets | Gates | Recovery strategy | Live validator | Crit |
|---|---|---|---|---|---|
| `HBEAKBIHANL` (projectile instance) | 4 (damage, angle, props-ptr, radius) | AutoDodge, RE++, AutoNexus-proj | **type-anchor**: the class with a `ProjectileProperties*` field (1a) → confirm via live `this` from its hooked method | live bullet: props-ptr valid, damage ∈ [MinDamage,MaxDamage], pos finite | 🔴 |
| `LKHPPBEGNOM` (player/movable, +ACTK) | 9 (HP, MaxHP, Defense, IGN, conditions, velocity, objProps, collisionProps, facing) | AutoNexus, player state, shot facing | hierarchy: subclass of `KJMONHENJEN` reached via `WM_Local`; field-by-type+ACTK | HP ≤ MaxHP, both > 0 in-world; Defense small (<200) | 🔴 |
| `HJMBOMEHGDJ` (WorldManager) | 9 (Local, AllDict, MapDictA/B, KjmonList, TileArr, TileList, TickId×2) | **ALL** enemy/tile enumeration (foundational) | the class held by `AppManager.<…WorldMgr>k__BackingField`; confirm dictionaries/arrays by type | AllDict is a live Dictionary; TileArr non-null in-world | 🔴 |
| `KJMONHENJEN` (entity base) | 10 (PosX/Y, ObjType, ObjProps, ViewHandler, skinWidth, ObjId, radius, scale, float3pos) | position/type of every enemy & bullet | type-anchor: base class holding an `ObjectProperties*` field; = element type of `AllDict` values | PosX/Y finite; ObjType in valid range | 🔴 |
| `CMFPKCJHKKB` (XmlTileProperties) | 8 (Speed, Sink, NoWalk, MinDmg, MaxDmg, Push, Alpha, Sinking) | **safe-walk / damaging-tile dodge** | field-type anchor: the type of the tile's `TileProps` field | MinDmg ≤ MaxDmg; Speed ∈ (0,4] | 🔴 |
| `BGAIOPJMHLO` (tile instance) | 4 (TileX, TileY, TileType, TileProps) | tile/hazard reads | element type of `WM_TileArr` / `WM_TileList` | TileX/Y in map bounds; TileType in range | 🔴 |
| `FKALGHJIADI` (player avatar, +ACTK) | 10 (Tex1/2, CurMP, MaxMP, groundImmune, invincible, abilityReady, moving, moveDirX/Y) | MP UI, invinc/immune flags, move state | value-validation: class with two int MP fields where CurMP ≤ MaxMP; reached via player | CurMP ≤ MaxMP; bool fields ∈ {0,1} | 🟡 |
| `GJJCEFJMNMK` (throwable AoE) | 3 (OriginX, DestX, DurationMs) | AoE dodging | **method-sig** `KOBMINBDOBD(Vector2,Vector2,Color,int)` → confirm via live `this` (1d) | origin/dest finite; duration 0–60000ms | 🟡 |
| `FHOHCELBPDO` (throwable visual) | 2 (DurationMs, DestX) | AoE dodging (visual fallback) | **method-sig** `KOBMINBDOBD(int,Color,int,Vector2,Vector2)` | dest finite; duration sane | 🟡 |
| `COEFCBBIBMC` (ShowEffect packet) | 5 (effectType, targetObjId, pos1, pos2, duration) | SFX-based hazard cues | method-sig / packet-handler match (lowest priority) | effectType enum in range | 🟢 |

### Tier B — real-C#-named classes (stable; track + validate, rarely recover)
BeeByte renames the *containing* obfuscated classes but NOT these inherited C#
field names, so they resolve by `FindClass(real name)` + literal field strings and
are effectively self-healing today. Still in the ledger (completeness), just
low-risk.

| Anchor class | # offsets | Gates | Risk |
|---|---|---|---|
| `ObjectProperties` (isEnemy, fullOccupy, blockProjectiles, occupySquare, flying, protectFromGroundDamage, …) | 16 | targeting + wall/occupancy collision | low |
| `ProjectileProperties` (Lifetime, Speed, IsWavy/Boomerang/Parametric, turn rates, accel, amplitude, custom hitbox, armor-pierce, …) | ~42 | projectile prediction (the dodge math) | low |
| `ProjectileCustomHitbox` (offsetX, offsetY) | 2 | custom-hitbox bullets | low |
| `ViewHandler` (spriteShader, destroyEntity) | 2 | render/cleanup hooks | low |
| `CustomExplosionEntrance` (distance, speed) | 2 | explosion-entrance timing | low |

### Tier C — non-class dependencies
| Dependency | Value | Gates | Recovery |
|---|---|---|---|
| `square_lookup` RVA | `GameAssembly+0x1CA7B60` | live hazard reads (`WorldTAB::IsTileDamagingLive`) | RVA table; fallback = cached-tile `IsDamagingTile` |
| `proj-sim` RVA | `GameAssembly+0x7282F0` | projectile simulation cross-check | RVA table (confirmation only) |
| `AppMgr_WorldMgr` (`<…>k__BackingField` 0xC0) | offset | reaching WorldManager | resolved outside `s_entries`; add to gate |
| `Player_Spd` | offset | movement speed | resolved outside `s_entries`; add to gate |

### The completeness invariant (so nothing is *ever* missed)
- **One ledger, build-time-checked.** `registrySize == kEntryCount + (Tier C count)`
  asserted at startup. Add an offset to `s_entries` without a ledger row → the
  assert fails the build. New offset can't sneak in untracked.
- **Criticality drives the gate.** 🔴 = a wrong value silently breaks a core
  feature or gives dangerous output → gates `Install()` (fail-closed). 🟡 =
  degrades one feature (flagged, others run). 🟢 = cosmetic.
- **Quest Board granularity = the 15 anchor classes.** 10 Tier-A quests are the
  live hunt; Tier B/C show as "confirmed" rows. "Ready" = every 🔴 anchor GREEN.

---

## Phase 1 — Auto-resolver (the local "Il2CppInspector")

**What:** identify renamed classes/fields by **stable signature**, not name.
`RuntimeOffsets::AutoResolveByStructure()` runs in the `Recovering` state.

### 1a — Type-anchor class match (the MVP; fixes today's no-bullets)
The **projectile instance class** (was `HBEAKBIHANL`) is *the class that holds a
field of type `ProjectileProperties*`* — a relationship that survives every
rename. Algorithm:
```
ppClass = FindClass("", "ProjectileProperties")          // stable anchor
for each class C in il2cpp_class_for_each:
    for each field F in C:
        if class_from_type(field_get_type(F)) == ppClass: // F is a ProjectileProperties*
            candidate = C; propsFieldOffset = field_get_offset(F)
disambiguate candidates by: also has ≥2 float fields (pos/angle) + an int (damage)
→ projClass = the unique match
```
Feed `projClass` into `ProjectileTracking::ResolveProjClass()` (it already accepts
a resolved class). **Bullets captured again, no dump, every patch.**

### 1b — Field resolution within a recovered class
Once the class is known, resolve its fields:
- **By type+role:** props = the `ProjectileProperties*` field; position = the
  first two `float`s; angle/radius = floats by relative order.
- **Damage (robust):** read a **live** projectile instance and pick the `int32`
  field whose value sits in `[MinDamage, MaxDamage]` of its `ProjectileProperties`
  (those resolve) → that field IS damage. Runtime cross-validation beats guessing
  an offset. Write it to `Hbeak_InstanceDamage`.

### 1c — RVA-assisted recovery (when the collaborator's RVAs are current)
Walk every class's methods; `rva = methodPointer − GetModuleHandle("GameAssembly.dll")`.
Match against a known-RVA table (`proj-sim 0x7282F0`, `square_lookup 0x1CA7B60`,
…) → the method's declaring class = the renamed class. Reliable, but RVAs shift
per patch, so type-anchor (1a) is primary; RVA is the fallback/confirmation.

### 1d — AoE / throwable classes (`GJJCEFJMNMK`, `FHOHCELBPDO`)
These break on patch like the projectile class and gate AoE dodging, so they're a
real recovery target (not optional decoration) — just lower priority than
projectiles. **Primary strategy = method-signature**, because both are hooked
through methods with distinctive, stable-typed parameter lists BeeByte can't
rename:
- `GJJCEFJMNMK::KOBMINBDOBD(Vector2 origin, Vector2 dest, Color, int dur)` — find
  the method whose params are exactly `(Vector2, Vector2, Color, int32)` on a class
  in the entity chain; its declaring class IS the throwable. Once hooked, the live
  `this` confirms the class via `il2cpp_object_get_class` (gold-standard rung).
- `FHOHCELBPDO::KOBMINBDOBD(int animIdx, Color, int durMs, Vector2 origin, Vector2 dest)`
  — same idea, a different distinctive 5-param signature.
RVA is the fallback/confirmation, not the primary lever. Field offsets within each
recovered class then resolve by type+role (dest-pos `Vector2`, `int` lifetime).

### Signature catalog (the per-class fingerprints — extend over time)
| Renamed class (old name) | Stable signature to match on |
|---|---|
| Projectile instance (`HBEAKBIHANL`) | has a `ProjectileProperties*` field; +floats(pos/angle) +int(damage) |
| Throwable AoE (`GJJCEFJMNMK`) | method sig `(Vector2,Vector2,Color,int)`; confirm via live `this` (or RVA) |
| Fhoh visual (`FHOHCELBPDO`) | method sig `(int,Color,int,Vector2,Vector2)` (or RVA) |
| Map/Square (`square_lookup` target) | reached via the `square_lookup` RVA, not a class name |

**Effort:** 1a = medium (the high-value slice). 1b damage cross-validation =
medium. 1c/1d = incremental. **Guardrail:** every auto-match is **validated**
before use (read a live instance, sanity-check the field values) and logged; a
failed/ambiguous match leaves the feature degraded, never guesses blindly.

---

## Phase 2 — Populate & re-hook

**What:** apply the recovered classes/offsets and (re)install the gated features.
- Auto-resolved class → store as the resolved `Il2CppClass*` (and update the
  obfuscated-name string used by `FindClassLoose`/the BeeByte name map).
- Auto-resolved field offset → write the `RuntimeOffsets` variable + mark its
  health row `ResolvedAuto` (a new `OffsetState`).
- Re-run the gated `Install()` paths now that deps are healthy
  (`ProjectileTracking::Install`, `AoeTracking::EnsureInstalled`).

**Idempotency:** Phase 2 is safe to re-run; installs already no-op when present.
**Persistence (optional):** cache the recovered names/offsets to a local file
keyed by the game build hash, so subsequent launches skip the scan.

---

## Phase 3 — Discovery UX (consent prompt + Quest Board) + degraded mode

**What:** turn recovery from a silent background scan into a **visible, opt-in
"your game updated — want to patch it?" experience.** Three surfaces: the
**detection prompt**, the **Quest Board** (the centerpiece — every stale offset is
a quest you watch get completed), and the **loading screen** for the brief boot
cover. Plus honest degraded-mode status.

### 3a — Detection prompt (the consent gate, `UpdateDetected` state)
When the build hash changed and/or deps are stale, don't auto-fix — **ask**:
```
┌──────────────────────────────────────────────────────────┐
│  ⚠  Game update detected                                  │
│  Realm changed — 2 of 14 things the cheat relies on may   │
│  have moved. Want to re-discover them now?                │
│                                                            │
│        [ Enter Discovery Mode ]      [ Not now ]          │
│        ☐ Auto-patch on future updates                     │
└──────────────────────────────────────────────────────────┘
```
"Enter Discovery Mode" → `Discovery` state + open the Quest Board. "Not now" →
`Ready` (degraded), banner stays so they can start it anytime. The checkbox sets
the "skip the prompt next time" preference.

### 3b — The Quest Board (the centerpiece)
The dependency registry rendered as a **quest log**: one row per thing the cheat
needs, so the user *sees* exactly what's left to discover and watches each get
turned in. Each quest carries: name, the feature it gates, current status, the
strategy that solved it, and the old→new offset.

```
  REALM ENGINE — DISCOVERY MODE                       ▰▰▰▰▰▰▰▱▱▱  7/14

  STATUS   QUEST (what it gates)            HOW FOUND          OFFSET
  ──────────────────────────────────────────────────────────────────────
  ✅ done   Projectile class (dodge,dmg)    type-anchor        0x—  (class)
  ✅ done   Projectile damage  (AutoNexus)  live value-range   0x174 → 0x188 ⟳
  🔄 hunt   AoE throwable      (AoE dodge)  trying RVA…        —
  🔄 hunt   Fhoh visual        (AoE dodge)  scanning classes…  —
  ⬜ todo   Defense            (AutoNexus)  queued             0x210 (stale?)
  ❌ help   Map/Square hazard  (safe-walk)  no strategy hit    needs manual
  ✅ ok     Player HP/MaxHP    (everything) confirmed fresh    0x—  unchanged
```
Status vocabulary: **✅ done/ok** (resolved + validated; `ok` = was never stale,
just confirmed), **🔄 hunt** (actively being resolved this frame), **⬜ todo**
(queued), **❌ help** (ladder exhausted → needs manual / a pushed RVA). The
top bar is "quests complete / total." When all critical quests are ✅ the board
shows **"Game patched — you're ready"** and auto-closes to `Ready`.

**Stale-or-not, made explicit.** For each quest we show the **old value → newly
discovered value**: if they differ, it *was* stale and we patched it (`0x174 →
0x188 ⟳`); if they match, it was fine and we just confirmed it (`unchanged`). That
directly answers "did this actually move or not?" per offset — no guessing.

### 3c — Live discovery feed
A scrolling log under the board narrates the hunt as it happens, so it feels alive
and is debuggable:
```
  ▸ Projectile class: found the class holding a ProjectileProperties* field ✓
  ▸ Projectile class: validated against a live bullet (pos finite, props ok) ✓
  ▸ Damage field: scanning int32s in [MinDamage,MaxDamage]=[80,120]…
  ▸ Damage field: offset 0x188 reads 95 ✓  (old 0x174 read 6402 ✗ — was stale)
  ▸ AoE throwable: no type-anchor; falling back to RVA 0x7282F0…
```
Each line = one rung of the robustness ladder firing + its validation verdict.

### 3d — In-game loading screen
- **In-game loading screen** — a full-screen ImGui overlay drawn in the existing
  render hook (`platform/hooks/DirectX.cpp` `dPresent`, between `ImGui::NewFrame()`
  @212 and `ImGui::Render()` @262 — the same path that draws the menu). Gated on
  the boot state:
  ```cpp
  if (BootGate::Tick() != BootGate::State::Ready)
      BootScreen::Render();   // before ImGui::Render()
  ```
  `BootScreen::Render()` covers the game via `ImGui::GetForegroundDrawList()`:
  ```cpp
  auto* dl = ImGui::GetForegroundDrawList();
  ImVec2 sz = ImGui::GetIO().DisplaySize;
  dl->AddRectFilled({0,0}, sz, IM_COL32(8,10,16,opacity));      // dark cover
  // centered: brand mark + "Realm Engine — getting ready, this takes a moment…"
  // + a spinner + live status: "Recovering offsets  (12/14 ready)"
  ```
  Content = the reassuring message + the live Phase-0/1 progress (Detecting game
  version → Recovering offsets → N/M dependencies ready). Fades out the instant
  the gate reaches `Ready`.
- **This is the only way a DLL shows UI in-game** — drawing into the game's
  swapchain via our Present hook. It appears once our hook + ImGui are live
  (after the proxy wait / first `dPresent`), which is exactly the cheat-loading
  window the user cares about; we don't (and needn't) replace the game's own
  pre-hook login/splash.
- **UX choice (decide before build):**
  - *Opaque cover* = a true loading screen, clearest "please wait," but blocks
    play — only safe to show at a non-combat moment (login / nexus / char-select).
  - *Semi-transparent + progress banner* = reassures without blinding the player;
    safe any time.
  - Recommended: run recovery at a **safe trigger** (first nexus / char-select,
    where classes are loaded and nothing can kill you) and show the opaque screen
    there; fall back to the banner if recovery is forced mid-world.
### 3e — Status, degraded mode, manual override
- **Health report** = the **Offset Health panel** (already built) extended with
  the dependency registry: per-feature OK / RECOVERED / DISABLED. (This is the
  permanent home of the Quest Board once discovery is done — same data, resting
  state.)
- **Degraded mode:** features whose deps never resolved stay off with a clear
  reason; the rest run normally. No silent no-bullets, no crashes.
- **Manual override:** keep the manual offset-edit path (and the import guide) for
  the cases auto-recovery can't solve.

**Effort:** small–medium (the panel exists; add the loading overlay + the
per-feature status rollup).

---

## API surface (new)

```cpp
namespace RuntimeOffsets {
  // Phase 1 — structural recovery. Returns how many critical deps it healed.
  int  AutoResolveByStructure();
  // A recovered class by role (projectile / throwable / fhoh). nullptr if unhealed.
  Il2CppClass* GetRecoveredClass(RecoveredRole role);
  // Phase 0/3 — per-feature dependency health for the gate + UI.
  enum class DepHealth { Ok, Recovered, Stale };
  DepHealth GetFeatureHealth(const char* feature);
  // new OffsetState::ResolvedAuto for fields filled by structure/RVA.
}
namespace BootGate {            // Phase 0 state machine, ticked from dPresent
  enum class State { WaitingForMetadata, Resolving, Auditing,
                     UpdateDetected, Discovery, Ready };
  State Tick();                 // advances; returns current state
  bool  FeatureAllowed(const char* feature);   // gate before Install()
  bool  UpdateAvailable();      // true in UpdateDetected (drives the prompt)
  void  EnterDiscovery();       // "Enter Discovery Mode" button → Discovery
  void  Dismiss();              // "Not now" → Ready (degraded), keep banner
  void  SetAutoPatch(bool on);  // "Auto-patch on future updates" preference
}
namespace Quest {               // Phase 3 — the Quest Board model (UI reads this)
  enum class Status { Todo, Hunting, Done, Ok, NeedsHelp };  // Ok = confirmed-fresh
  struct Row { const char* name; const char* gatesFeature; Status status;
               const char* strategy;          // "type-anchor" / "RVA" / "value-range" / …
               uint32_t oldValue; uint32_t newValue; bool changed; };
  int  GetBoard(Row* out, int maxRows);       // current quest rows
  void GetProgress(int& done, int& total);    // top-bar "7/14"
  int  GetFeed(const char** lines, int maxLines);  // live discovery feed
}
```

---

## Build order (each milestone compiles + is verified, like RE++)

- **A0 — Health gate + dependency registry (Phase 0):** the boot state machine +
  `FeatureAllowed` gate + critical-dep registry. Wraps the existing
  `EnsureAll`/offset-health. *Outcome: stale deps no longer install silently.*
- **A1 — Type-anchor projectile resolver (Phase 1a):** `AutoResolveByStructure`
  finds the projectile class via its `ProjectileProperties*` field; feed it to
  `ResolveProjClass`. *Outcome: bullets captured again automatically — fixes the
  current breakage.*
- **A2 — Discovery UX (Phase 3 core):** the `UpdateDetected` consent prompt, the
  **Quest Board** (registry → quest rows with live status + old→new offset + stale
  badge), the live discovery feed, and the loading-screen cover. The board reads
  the `Quest::` API; rows light up as A1/A3 resolvers fire. *Outcome: the user sees
  "game updated → enter discovery → watch 14 quests turn green → ready."*
- **A3 — Damage field cross-validation (Phase 1b):** auto-resolve
  `Hbeak_InstanceDamage` by live value range. *Outcome: damage estimation correct.*
- **A4 — RVA recovery + AoE classes (Phase 1c/1d):** broaden coverage.
- **A5 — Build-hash persistence cache (Phase 2 optional):** skip the scan on
  unchanged builds.

---

## Risks & guardrails
1. **Mis-identification** → corrupt reads. Mitigation: every auto-match is
   **runtime-validated** (read a live instance, range-check) before it's used;
   ambiguous matches degrade, never guess.
2. **Lazy class loading** → a class may not exist when we scan. Mitigation: the
   Phase-0 state machine retries until in-world; recovery is re-entrant.
3. **`il2cpp_class_for_each` cost** → it scans all classes. Mitigation: run only
   in `Recovering` (after a STALE audit), cache results, persist per build hash.
4. **Scope creep** → the signature catalog can grow forever. Mitigation: A1
   (projectiles) is the only must-have; everything else is incremental and the
   panel shows what's still stale.

## STATUS
- **A0 — DONE, LIVE-VERIFIED.** `BootGate` loop ran on the real game (Resolving →
  Auditing → Ready → live re-audit → UpdateDetected), read via the diag/MCP bridge.
- **A1 — DONE, LIVE-VERIFIED.** `re_run_recovery` on the live game recovered the
  projectile class by its `ProjectileProperties*` anchor → `HBEAKBIHANL` (correct),
  no name lookup. Self-heal also observed: `ProjectileProperties.Lifetime` live
  `0x160` vs fallback `0x158` — name-resolution auto-corrected a real layout shift.
- **Bug found + fixed (live test):** the live `SanityCheckPlayerStats` fired at
  char-select (maxHp=0) and falsely flagged MaxHP → false "Game update detected".
  Fixed: `SanityCheckPlayerStats` skips all-zero; `BootGate` only live-audits once a
  character is loaded (`maxHp > 0`). Compile-verified; needs a rebuild to retest live.
- **AoE field self-heal — DONE (compile-verified).** `GjjKobDetour` matches the true
  origin/dest method PARAMS against instance float-pairs → recovers the renamed
  `Gjj_OriginX/DestX` offsets live, writes `RuntimeOffsets::Gjj_*`. One throwable
  (Medusa cast) heals it. Surfaced via `re_probe_aoe`.
- **A4 instance recovery — DONE (compile-verified).** `RuntimeOffsets::RecoverFromInstance`
  takes a live object, gets its class via `il2cpp_object_get_class`, re-resolves only
  broken (`FallbackGaveUp`) entries via `FindFieldOnHierarchy`. Player instance covers
  `FKALGHJIADI→LKHPPBEGNOM→KJMONHENJEN`; WorldManager covers `HJMBOMEHGDJ`. Wired into
  `RunStructuralRecovery` + `re_run_recovery` (which now also reports live class names).
- **Tile recovery — DONE (compile-verified).** `WorldTAB::GetSampleTilePtr` caches a live
  `BGAIOPJMHLO` instance; `RuntimeOffsets::RecoverTileChain` heals BGAIOPJMHLO then reads the
  now-correct TileProps ptr → heals `CMFPKCJHKKB`. Every class anchor now self-heals.
  Remaining gap: field-name renames within a recovered class still need value/param matching
  (the AoE param-match pattern is the template).
- **Daily-scan integration — DONE.** `DiagBridge` auto-writes `report.json` once boot reaches
  Ready; `beebyte_daily_scan.py` (prod, /home/jesse/realm-engine) scps + parses it and `post_summary`
  now leads ACTION-FIRST with the offset deltas (Shifted=auto-patch, ClassGaveUp/FieldRenamed=
  recover) before the class-name census. All additive + graceful (older DLLs → scan unchanged).
- **Runtime-test bridge — DONE, LIVE.** `DiagBridge` (diag/cmd/resp/report/methods.json) +
  `re-mcp/server.mjs`; 8 `re_*` tools, all validated against the running game.
- **Current-game findings:** `HBEAKBIHANL` healthy (bullets capture). `GJJCEFJMNMK`
  AoE stale — field `GuiCanvasSwitcher` renamed (non-critical; A4 method-sig target).
- **A1b/Phase-2 write-back — DONE (2026-07-15, compile-verified).** Extracted the
  heal+state-flip loop from `RecoverFromInstance` into `HealFallbackEntriesAgainstClass`
  and pointed `AutoResolveByStructure` at the structurally-recovered projectile class.
  Recovering the class now heals its `FallbackGaveUp` field entries (name-stable ones)
  and flips their `s_entryState` to `ResolvedMatch/Shifted` → the audit + gate see them
  resolved. NOT yet live-verified against a patch; renamed-NAME fields still need the
  value/param strategy below and stay stale (anchor keeps the feature gated = safe).
- **Gate wiring — DONE (2026-07-15, compile-verified).** `FeatureAllowed()` now called at
  `ProjectileTracking::Install()` and `AoeTracking::EnsureInstalled()` (the shared choke
  point — sensors + WorldTAB call EnsureInstalled directly, bypassing Install). This was
  a CRASH FIX: on the 2026-07-15 game patch the un-gated hooks installed against stale
  offsets and hard-crashed on load-in. The plan warned "gate only AFTER write-back", but
  the un-gated path crashes, so the gate is the safety half; write-back is what re-opens
  it once recovery completes. Composes correctly now that both exist.
- **Dodge-dispatch gate — DONE (2026-07-15, compile-verified). THE ACTUAL CRASH FIX.**
  Gating only the capture hooks was INSUFFICIENT — the game still crashed on the patch.
  Minidump analysis (hand-parsed, no cdb: `scratchpad/stackwalk.py`) showed a `0xC0000005`
  WRITE-AV to a fixed in-DLL buffer (`version.dll+0x108AB0`) via memcpy on the render
  thread, firing the instant a dodge mode engaged (`DodgeSwap -> 6`, crash +5s). Cause:
  `DangerPlanner::Detour_AppEngineUpdate` runs the dodge Tick/sensors every frame reading
  enemies/tiles (not just the gated bullets); a count read at a stale offset overruns a
  fixed sensor array. Fix: `if (BootGate::Degraded()) return;` at the top of the dodge
  block — no dodge work on a degraded game; re-enables when offsets heal. **LESSON: any
  render-thread feature that fills fixed buffers from game-read counts must gate on
  Degraded() (AutoAim etc. are candidates if they crash next).** Minidump forensics
  workflow (parse exception + module list + poor-man's stackwalk) saved in scratchpad.
- **M1 registry hardening — DONE (2026-07-16, compile-verified).** Audit (4-agent map) confirmed
  the dodge/projectile/enemy pipeline is ALREADY registry-backed (pjdodge/repp/zdodge do zero raw
  reads — they consume EnemyTracker/ProjectileStore snapshots). One genuine dodge-relevant gap
  closed: projectile spawn-age `GLEGBLDBOJF` @0x16C registered as `Hbeak_SpawnAgeMs` + WorldTAB read
  repointed. INTENTIONALLY not registered: speedMul (KDAJOMOFMJB) and object-id-dict-key
  (FDNHINDAEHK) — weak/no value fingerprint, so registering would permanently gate the feature on a
  name rename; their graceful defaults are better. Native Square fields (damageCached/cover) use the
  RVA `square_lookup` mechanism, not the il2cpp registry.
- **M3 recovery screen + auto-trigger — DONE (2026-07-16, compile-verified).** `QuestBoard::Render()`
  (new src/core/runtime/QuestBoard.{h,cpp}) — centered foreground-draw-list overlay modeled on
  ChatToast, invoked at DirectX.cpp (before ChatToast::Render, outside the menu gate). Shows caption
  (StatusLine-derived), "Anchors ready: N/M" (GetProgress), per-anchor ✓/· rows (GetAnchorReport),
  and the guided "let a shot fire so bullet/AoE offsets can be sampled" hint when a critical anchor
  is still stale. Fades out ~1.8s after clean Ready. Auto-trigger: new `s_autoRecover=true` flag in
  BootGate makes UpdateDetected auto-enter Discovery (no consent click); deliberately NOT s_autoPatch,
  so the post-load live-reaudit relapse still re-recovers in-world.
- **M2 (value-fingerprint resolver + projectile/AoE param-match) — NEXT, needs live game.** Framework
  recipe (agent-mapped): parallel `s_valueFp[]` {outPtr,typeKind,lo,hi} + `HealFallbackEntriesByValue`
  (iterate cls fields up parent chain via il2cpp_class_get_fields/get_parent, filter by
  il2cpp_type_get_type kind, read live via ReadField<T> SEH-safe, pick unique value match) wired into
  RecoverFromInstance after the name heal. BUT the actual residual (projectile HBEAKBIHANL + AoE
  fields) needs a live bullet/effect instance — the spawn detour has the ground-truth params (like
  the working AoE GjjKobDetour param-match). Chicken-and-egg: capture is gated when degraded. Clean
  fix = install the detour on class+method resolve (rename-proof) but the detour BODY does only the
  bounded SEH param-match self-heal while degraded, skipping the field reads that crash, then flips to
  full processing once healed. This touches the hot path that crashed 2026-07-15 → must be validated
  live via re_run_recovery, not shipped blind. True residual with no fingerprint: HBEAKBIHANL damage
  (DBNNDLKNECM) — needs cross-ref to ObjectProperties Min/MaxDamage.
- **Mode-switch gate — DONE (2026-07-16, compile-verified). A safety gate, NOT the crash fix (see
  the `g_debug`/.rdata entry below — this only ever MASKED it).**
  The 2026-07-15 dodge-dispatch gate (DangerPlanner) did NOT stop the crash — it recurred on
  the 2026-07-16 re-patch, immediately on selecting a dodge mode. MAP-SYMBOLICATED the minidump
  (couldn't guess it): built Release with `<GenerateMapFile>` (scratchpad `parsemap.py` resolves
  the crash RVAs against `version.map`; note `GenerateMapFile` must be an item-metadata in the
  Link ItemDefinitionGroup, the global `/p:` property does NOT reach it). Result: 0xC0000005 WRITE-AV
  at `ZDodge::g_debug` via `ZDodge::PublishDebug+0x69` (`g_debug = snapshot` whole-struct copy),
  reached from `TestTAB::ApplyDodgeModeWithEnter` (line 139, `ZDodge::SetEnabled(false)` on every
  mode switch disables the other engines and ZDodge's disable publishes a debug snapshot). This is
  the MODE-SWITCH path, orthogonal to the per-frame Tick + capture hooks I'd gated. Fix: `if
  (BootGate::Degraded()) return;` at the top of `ApplyDodgeModeWithEnter` (the verified single
  funnel — dashboard/IpcBridge all route through it). All three dodge entry points (per-frame
  dispatch, capture install, mode switch) now gate on Degraded. LESSON: don't reason about a native
  crash location — map-symbolicate the dump. CORRECTION (2026-07-16, later same day): this gate only
  MASKED the crash. It fires on `Degraded()`, so on the very next patch — where the audit resolved
  `HBEAKBIHANL` cleanly and reached **Ready** — the gate opened and the game crashed identically.
  The gates are still correct fail-closed policy (don't run dodge on stale offsets), but they were
  never the cure. Root cause + real fix: see the `ZDodge::g_debug` / `.rdata` entry below.
- **`ZDodge::g_debug` lived in read-only `.rdata` — THE ACTUAL ROOT CAUSE (2026-07-16). FIXED.**
  Every "dodge crash" since 2026-07-15 was this, not offsets/patches/degraded state. Proven from the
  crashing binary itself, no map or guessing required — disassembling `PublishDebug` in the *deployed*
  `version.dll` shows:
  `mov r8d,0xb3c0` (45,984 = sizeof(DebugSnapshot)) / `lea rcx,[rip+…] # 0x10bab0` / `call memcpy`,
  returning to `0x54379` — exactly the return address on the crash stack, and `rcx` = exactly the
  dump's WRITE fault address. `0x10BAB0` is inside `.rdata` (`INITDATA|READ`, **no WRITE**) per the
  PE section table, so the memcpy faults on byte 0, deterministically, every time it runs. That is why
  it reproduced on a healthy game and why it always looked like "a struct copy to a valid global".
  WHY it was misplaced: `DebugSnapshot g_debug{}` is *constant-initialized* (members have non-zero
  defaults, e.g. 0.1f), and MSVC LTCG const-promotes provably-never-written globals into `.rdata` —
  correctly so for `s_autoRecover`/`g_flashSpeedMulUi`/`g_aStarPerpW`/`g_autoPot*` (their writers are
  `/OPT:REF`-eliminated, so those `.rdata` placements are SAFE, not landmines). `g_debug` is the one
  anomaly: it has a live writer and got promoted anyway. Not source semantics — the three structurally
  identical siblings (`RePP::g_debug`, `PJDodge::g_debug`, `PJDodge::snap`) all land correctly in
  `.data` (seg 0003). Audited every non-const (`@…A`) data symbol in `.rdata`: `g_debug` is the ONLY
  mutable global with a surviving write into read-only memory — one bug, not a class of them.
  FIX: heap-back it (`DebugSlot()` returning `*new DebugSnapshot`, intentionally leaked). Runtime
  allocation cannot be const-promoted or ICF-folded, so it is immune regardless of which of the two
  did it. LESSON: when a write to a *valid* global faults at offset +0, check the section
  characteristics (`.rdata` vs `.data`) before suspecting the data — and prefer reading the deployed
  binary's own instructions over any map (`scratchpad/pesections.py`, `parsemap2.py`).
  NOTE: `DebugSnapshot` is 45 KB and is memcpy'd on publish AND returned **by value** from
  `ReadDebugSnapshot()` — ~90 KB of copying per publish/read cycle on the render thread. Worth
  revisiting (return by const-ref under the lock, or double-buffer), but it is not a correctness bug.
- **All three sibling snapshots hardened the same way (2026-07-16). PREVENTIVE.** LTCG picked
  `ZDodge::g_debug` arbitrarily out of four identical globals, so the siblings could flip to `.rdata`
  on any future build. Each now has its own TU-local `DebugSlot()` returning `*new DebugSnapshot`
  (anon-namespace per engine → no linkage collision): `RePP::g_debug` (45,428 B),
  `PJDodge::g_debug` (30,984 B) and `PJDodge::snap` (30,984 B, the `RenderDebugOverlay` function-local
  static — also written every frame, same hazard). RePP's `snap` (RePP.cpp `RenderDebugOverlay`) is a
  **stack** local, inherently writable, left alone. Verified in the binary: `.data` shrank 107,376 B vs
  the 107,396 B sum of the three blobs (delta = 20 B of new slot ptrs/guards), `.rdata` did NOT grow,
  build 0 errors. Sizes differ per engine — each has its own `DebugSnapshot` type/bounds.
- **OffsetRecovery tool — v1 DONE (2026-07-16, compile-verified). The "out of the crashy hook, its own
  tool" architecture the user asked for.** New `src/core/runtime/OffsetRecovery.{h,cpp}`, ticked from
  dPresent after BootGate::Tick. Lifecycle: ON when `BootGate::Degraded() && !AllDone()`, OFF (uninstall
  its detour) when recovered or healthy. Installs its OWN minimal MinHook detour on the projectile spawn
  method (KOBMINBDOBD, 12 params — same target as the feature capture hook, but mutually exclusive by
  BootGate state so never both). The detour is SAMPLE-ONLY: SEH-guarded il2cpp field scans (never reads a
  registered/stale offset), value-fingerprints renamed fields against the ground-truth spawn args, commits
  an offset only after `kCommitVotes=3` consecutive consistent samples (angle varies per shot → coincidences
  die), writes back via new `RuntimeOffsets::CommitRecoveredOffset`. v1 targets = Hbeak_Angle (== param
  `angle`) + Hbeak_ProjPropsPtr (== param `projProps`), the two strong param-matches. NEEDS LIVE VALIDATION
  (hooks the spawn method). Watch trace for `[OffsetRecovery] sampling detour INSTALLED` then `... recovered
  -> 0x..`. TODO to fully clear the HBEAKBIHANL anchor: add radius (cross-ref CollisionMult), spawn-age
  (behavioural: int counting up ~frame-time), AoE origin/dest (Gjj already has a param-match detour pattern),
  and DECOUPLE damage (DBNNDLKNECM — no fingerprint, only AutoNexus needs it) so dodging doesn't wait on it.
  Also: wire OffsetRecovery::GetProgress into the QuestBoard so the "sampling live shots" progress shows.
- **The `ProjectileProperties` anchor premise was FALSE — recovery never had a chance (2026-07-16).**
  The code asserted "a relationship BeeByte's per-patch renames cannot change". Checked it against the
  live metadata (`RotMG Exalt_Data/il2cpp_data/Metadata/global-metadata.dat`, Jul 16 11:58): the only
  `ProjectileProperties` occurrences are a `.cs` debug path and `Namespace|Class` **string literals**
  (a serialization table — data, which BeeByte doesn't rename, so their survival proves nothing). There
  is no bare `ProjectileProperties` **type-name** string: the anchor class itself was renamed. Every
  registry name (`HBEAKBIHANL`, `KOBMINBDOBD`, `GJJCEFJMNMK`, …) is likewise 0 hits. So
  `ScanForProjectileClass` failed at `FindClassLoose` step 1, exactly as its log said.
  THREE compounding bugs, all now fixed:
  1. **Silent failure.** `OffsetRecovery::Install()` bailed with bare `return`s; a 184 MB trace held
     ZERO OffsetRecovery lines. Every bail now logs a reason.
  2. **One-shot latch at the worst moment.** `AutoResolveByStructure` set `s_structScanDone = true` on
     ENTRY, and `s_autoRecover=true` makes BootGate run it ~90ms into boot — before a world exists, so
     the projectile types aren't created. It failed, latched forever, and also neutered `re_run_recovery`
     (DiagBridge). Now latches only on SUCCESS; `OffsetRecovery::Tick` retries on a 3 s throttle.
  3. **Name-based method lookup.** Even with the class, it did
     `il2cpp_class_get_method_from_name(cls, "KOBMINBDOBD", 12)` — a name proven gone.
  **NEW ARCHITECTURE — resolve by SIGNATURE, not names.** `OffsetRecovery::ResolveSpawnBySignature()`
  walks every runtime class for a method with the spawn SHAPE — 12 params
  `(ref, ref, i4, u4, r4, i4, ref, ref, r4, r4, bool, bool)` — which a rename cannot alter without
  changing the game's behaviour. One match hands us everything with zero names: the DECLARING class IS
  the projectile class (fed back via `RuntimeOffsets::AdoptProjectileClass`, which then heals the
  still-name-resolvable fields), and param[1]'s class is ProjectileProperties. >1 match ⇒ refuse and log
  rather than guess. Must run in-process: the on-disk metadata HEADER is encrypted (sanity reads
  `0xFEF14985`, not `0xFAB11BAF`), so this cannot be done offline — but the live runtime has already
  decrypted it. Compile-verified; **needs a live run to confirm the scan resolves.**
- **NEXT (for the loop):**
  - **Live-verify the write-back** — launch the patched game + `re_run_recovery`; confirm
    the `HBEAKBIHANL` anchor flips GREEN and ProjectileTracking re-installs (dodge returns)
    OR see which fields stay stale (renamed names → need value/param recovery).
  - **A1c/A3 value strategy** — resolve renamed-NAME fields (e.g. `Hbeak_InstanceDamage`)
    by live value-range `[MinDamage,MaxDamage]` — the remaining un-healed set.
  - **A2 (chosen: visible recovery screen)** — Quest Board / discovery overlay reading the
    `BootGate`/`Quest` API + auto-enter Discovery on `UpdateDetected` (drive the screen,
    no manual consent click). This is milestone "M3".
  - **A4** — AoE/throwable (`GJJCEFJMNMK`/`FHOHCELBPDO`) via method-signature; RVA table.
- Build verification (no game needed): `bash /tmp/re_build.sh > /tmp/re_build.log 2>&1`
  then check `MSBUILD_EXITCODE=0` and no `error C`/`error LNK`. Borrowed generated
  headers live in `internal/src/game/generated/` (gitignored) — keep them for builds.
</content>
