# Running Realm Engine on Linux & Steam Deck

This guide explains how to build, run, and hook **Realm Engine** with **RotMG Exalt** on Linux, SteamOS, and Steam Deck via Valve's Proton.

---

## 1. Quick Start / Overview

1. **Build the DLL & Client on Linux**:
   ```bash
   ./internal/build-linux.sh
   cd client
   npm install
   npm run build
   ```
2. **Hook RotMG Exalt**:
   The client will auto-detect your Steam library paths (including SD cards on Steam Deck at `/run/media/...` and Flatpak Steam at `~/.var/app/com.valvesoftware.Steam/...`).
   When you start Realm Engine (`npm start` or run the packaged AppImage/binary), it installs `version.dll` directly alongside `RotMG Exalt.exe`.
3. **Configure Steam Launch Options**:
   In Steam, right-click **Realm of the Mad God** → **Properties...** → **General** → **Launch Options**, set:
   ```bash
   WINEDLLOVERRIDES="version=n,b" %command%
   ```
4. **Launch**:
   Start Realm Engine, then start RotMG Exalt from Steam. The DLL connects via local TCP bridge (`127.0.0.1:4242`) directly to Realm Engine.

---

## 2. Proton DLL Override (`WINEDLLOVERRIDES`)

By default, Proton / Wine uses its built-in Windows system DLLs rather than native DLLs placed in the application directory.
Setting:
```bash
WINEDLLOVERRIDES="version=n,b" %command%
```
tells Wine to prefer the **native** (`n`) `version.dll` in the game folder, falling back to **builtin** (`b`) if needed.
All 17 standard export functions (`GetFileVersionInfoA`, `VerQueryValueW`, etc.) are forwarded seamlessly, allowing early initialization and IL2CPP hook injection before the game window opens.

---

## 3. Cross-Platform IPC Architecture (TCP Bridge)

On Windows, Realm Engine uses Win32 Named Pipes (`\\.\pipe\lfg-dev-bridge`).
On Linux / Proton, named pipes created inside Wine are isolated in the Wine prefix and cannot communicate with native Linux processes.

Realm Engine solves this with dual-transport IPC:
- The injected `version.dll` attempts connection via Named Pipe first; if unavailable, it connects to `127.0.0.1:4242` via standard TCP sockets.
- On Linux, `InternalBridge.ts` automatically listens on `127.0.0.1:4242`.
- All HMAC-SHA256 authenticated frame streaming (hotkeys, heartbeats, feature commands, game state) operates seamlessly between Proton and native Linux.

---

## 4. Steam Deck Specifics & SD Cards

- **Steam Deck Path Detection**: `ExaltFinder.ts` searches `~/.local/share/Steam/steamapps/libraryfolders.vdf` as well as SD card mounts under `/run/media/mmcblk0p1/` and `/run/media/deck/`.
- **Manual Path Override**: If using a custom Proton prefix or non-standard location, you can set the `ROTMG_PATH` environment variable:
  ```bash
  export ROTMG_PATH="/home/deck/.local/share/Steam/steamapps/common/RotMG Exalt"
  ```
- **Controller & Hotkeys**: Realm Engine hooks keyboard and mouse input inside the game window. For Steam Deck handheld controls, map controller buttons to keyboard hotkeys in Steam Input.
