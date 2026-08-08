# `@realmengine/sdk`

TypeScript SDK for writing plugins on top of [Realm Engine](https://realmengine.org) — the open-source RotMG Exalt hack platform.

You use this package if you're **writing your own hacks/utilities as user plugins** for the Realm Engine client. The bundled first-party plugins in [`client/plugins/`](../client/plugins/) already have access to a richer, unstable internal API; this SDK is the stable, sandbox-safe surface exposed to community `.mjs` plugins.

---

## Install

```bash
npm install --save-dev @realmengine/sdk
```

The SDK is a **types-and-shims** package: every method throws `Must be run inside RealmEngine client` at import time. That's deliberate — the real implementations are injected by the Realm Engine host at runtime. You use the SDK for IntelliSense + typechecking, then Realm Engine substitutes the real symbols when it loads your plugin.

---

## Your first plugin

A user plugin is a single `.mjs` file that exports a `register(ctx)` function. Realm Engine watches its plugin folder ([%APPDATA%/RealmEngine/plugins](https://github.com/Evergreen-Techworks/realm-engine-client)) and hot-reloads any `.mjs` that lands there.

```js
// hello.mjs
import { chat, events, RealmEngine } from '@realmengine/sdk';

/** @param {import('@realmengine/sdk').UserPluginContext} ctx */
export function register(ctx) {
  ctx.name = 'Hello';
  ctx.category = 'utility';

  // Show a status line in the dashboard while the plugin is enabled.
  RealmEngine.ui.status('Ready.');

  // Announce every map change.
  const unsub = events.onMapChanged((e) => {
    if (!ctx.enabled) return;
    chat.notify(`Entered ${e.name}`);
  });

  // Return a cleanup — Realm Engine calls it when the plugin is disabled/reloaded.
  return () => unsub();
}
```

Drop `hello.mjs` into the plugin folder, toggle it on in the dashboard, and any map change fires `Entered <name>` in your client chat.

---

## What's in the SDK

Everything is exposed from the package root — no deep imports:

```js
import {
  RealmEngine, chat, events, party, trade, loot, discord, inventory,
  Self, Walking, Combat, Players, Enemies, Inventory, Vault, World,
  Tiles, Objects, Projectiles, Log, Settings, Timing,
  TreeScript, leaf, branch, when, cooldown, once, sequence, parallel,
  Position, StatusEffect,
  // …and a full set of typed events / entities / items
} from '@realmengine/sdk';
```

Roughly grouped:

| Concern | What you get | Common use |
|---|---|---|
| **Your player** | `Self.getHP()` / `getMaxHP()` / `getPosition()` / `getStats()` / `getExaltedBonuses()` | Auto-nexus thresholds, positional decisions |
| **The world** | `World.isNexus()` / `isRealm()` / `isDungeon()` / `getName()`, `Tiles`, `Objects`, `Projectiles` | Behavior gated by realm/dungeon; tile queries; enemy shot readback |
| **Other players** | `Players.nearby()`, `Enemies.nearby()`, `RealmEngine.players.*` | Party awareness, callout logic |
| **Inventory / vault** | `Inventory`, `Vault`, `inventory.*`, backpack constants | Auto-swap, marketplace bots |
| **Combat** | `Combat.aimAt(enemy)` / `aimAtPosition(x,y)` / `useAbility()` / `useAbilityAt(x,y)` / `useAbilityOn(enemy)`, `Projectiles.*` | Auto-ability, custom aim helpers |
| **Movement** | `Walking.walkTo(x,y)` / `walkToPortal(name)` / `follow` / `flee` / `dodge` / `nexus()` / `teleportToPlayer` | Autopilot, safewalk, quick-travel |
| **Events** | `events.onMapChanged`, `onEnemySpawned`, `onLevelUp`, `onPlayerNearby`, `onCharacterFameAtLeast`, `onConnected/onDisconnected`, `loot.onBagDropped`, `loot.onRareBagDropped`, … | Reactive triggers |
| **Chat** | `chat.notify` / `say` / `yell` / `tell(name, msg)` / `party` / `guild` / `send(msg, ch)` / `onMessage` / `onWhisper` / `onChannelMessage(ch)` | Notifications; command bots |
| **Party & trade** | `party.*`, `trade.*` | Party finder automation; trade guards |
| **Loot** | `loot.getBags()` / `getNearbyBags(r)` / `pickup(bag, slot)` / `pickupId(id)` / `shouldPickup(objType)`, drop events, `isUT/isST/isStatPot` helpers | Rule-based auto-loot |
| **Discord** | `discord.DiscordWebhook`, `discord.send(...)` | Push notifications outside the client |
| **UI** | `RealmEngine.ui.status(label)` | Show a live status line on the dashboard |
| **Timing** | `Timing.now()`, `sleep`, `every`, `after`, `debounce` | Time-based control flow |
| **Logging** | `Log.info/warn/error(...)` | Structured plugin logs |
| **Settings** | `ctx.registerSetting(...)`, `ctx.getSetting(...)` | User-editable knobs in the dashboard |
| **Commands** | `ctx.registerCommand('name', args => …)` | `/name` slash commands in game chat |
| **TreeScript** | `leaf / branch / when / cooldown / sequence / parallel` | Compose complex behavior trees without a state machine |

Full method signatures are in the `.d.ts` files under [`src/`](./src/) — everything is type-annotated, so hover-docs in your editor are the fastest reference.

---

## Longer example — auto-nexus with a dashboard-driven threshold

```js
// safety-nexus.mjs
import { chat, events, Self, Walking, Timing } from '@realmengine/sdk';

/** @param {import('@realmengine/sdk').UserPluginContext} ctx */
export function register(ctx) {
  ctx.name = 'Safety Nexus';
  ctx.category = 'combat';

  ctx.registerSetting('threshold', {
    label: 'Nexus at HP%',
    type: 'range',
    value: 45, min: 10, max: 90, step: 5,
  });

  // Poll HP every 100ms instead of hooking a hot per-tick path.
  const stop = Timing.every(100, () => {
    if (!ctx.enabled) return;

    const hpPct = Self.getHPPercent();
    const threshold = ctx.getSetting('threshold');

    if (hpPct <= threshold) {
      chat.notify(`Nexus @ ${hpPct.toFixed(0)}% (<= ${threshold}%)`);
      Walking.nexus();  // exit to the nexus safely
    }
  });

  return () => stop();
}
```

The bundled first-party `auto-nexus` plugin does more than this — it hooks packet handlers to react in the same tick as an incoming hit rather than polling — but the pattern above is what most user plugins look like.

---

## TreeScript — behavior trees without ceremony

TreeScript lets you compose complex, gated behavior as a tree of leaves + branches. Each `Leaf` is an `{ isValid, onLoop }` pair; each `Branch` picks whichever child is currently `isValid()`; helpers like `when(cond, leaf)`, `cooldown(ms, leaf)`, `sequence(...children)`, `parallel(...children)` are composition primitives.

Minimal shape:

```js
import { RealmEngine, Walking, Enemies, Combat, TreeScript, leaf, branch, when, cooldown } from '@realmengine/sdk';

const nexusLowHp = cooldown(1000, leaf({
  name: 'NexusLowHp',
  isValid: () => RealmEngine.self.getHPPercent() < 40,
  onLoop: () => { Walking.nexus(); return 500; },
}));

const attackNearest = leaf({
  name: 'AttackNearest',
  isValid: () => Enemies.nearby(10).length > 0,
  onLoop: () => { const [t] = Enemies.nearby(10); if (t) Combat.aimAt(t); return 100; },
});

class Autopilot extends TreeScript {
  constructor() {
    super();
    this.root.add(branch({ name: 'combat', isValid: () => true, children: [nexusLowHp, attackNearest] }));
  }
}
```

See the JSDoc on `leaf`, `branch`, `cooldown`, `sequence`, `parallel`, `once`, `always`, `not`, `when` in [`src/treescript/helpers.ts`](./src/treescript/helpers.ts) for the exact contracts.

---

## Plugin context (`ctx`)

Every plugin's `register(ctx)` receives a small object scoped to that plugin:

| Field | What it is |
|---|---|
| `ctx.pluginId` (readonly) | Derived from the filename minus `.mjs` |
| `ctx.pluginFile` (readonly) | Absolute path Realm Engine loaded from |
| `ctx.name` | Dashboard display name (defaults to `pluginId`) |
| `ctx.category` | Sidebar bucket: `'combat' \| 'movement' \| 'automation' \| 'visual' \| 'network' \| 'utility' \| 'admin'` |
| `ctx.enabled` (readonly) | Dashboard toggle state — check this in your handlers |
| `ctx.registerSetting(key, cfg, onChange?)` | Add a knob to the dashboard (number / boolean / range / select / text / button) |
| `ctx.getSetting<T>(key)` | Read the current value |
| `ctx.registerCommand(name, handler)` | Bind `/name args…` in the in-game chat |

Teardown is a cleanup function you return from `register(ctx)`:

```js
export function register(ctx) {
  const a = events.onEnemySpawned(...);
  const b = Timing.every(1000, ...);
  return () => { a(); b(); };
}
```

Realm Engine calls it when the plugin is disabled, reloaded, or the client shuts down.

---

## What community plugins **cannot** do

The `.mjs` plugin sandbox is deliberately narrower than the bundled first-party API:

- No raw packet send/receive. The dashboard's packet logger is a bundled plugin because packet-level control is admin-only.
- No arbitrary dashboard messages / structured broadcasts. Use `RealmEngine.ui.status(...)` and `chat.notify(...)`.
- No direct DLL / IPC access — everything you can do goes through the SDK surface.

If you're an operator building an admin-only bundled plugin instead, use the internal `PluginContext` in [`client/src/plugins/PluginContext.ts`](../client/src/plugins/PluginContext.ts) — same shape plus the escalated capabilities.

---

## Distribution

- **Local install** — drop the `.mjs` into your Realm Engine plugin folder; it hot-reloads.
- **HWID-bound marketplace scripts** — deliver an AES-256-GCM ciphertext keyed to `(userId, hwid)`; the client's `ScriptDecryptor` will decode and load it on the target machine. See [`client/src/util/ScriptDecryptor.ts`](../client/src/util/ScriptDecryptor.ts) for the threat model (short version: this scheme provides **HWID binding and integrity**, not client-side confidentiality).

---

## License

Same as the parent project — see the [repo root LICENSE](../LICENSE).
