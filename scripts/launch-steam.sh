#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLIENT_DIR="$SCRIPT_DIR/../client"
ASSETS_DIR="$CLIENT_DIR/assets"

# 1. Ensure Node.js and npm are in PATH on SteamOS / Steam Deck
export PATH="$HOME/.local/nodejs/bin:$PATH"
if [ -d "$HOME/.nvm" ]; then
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" --no-use 2>/dev/null || true
    NVM_NODE="$(ls -d "$HOME/.nvm/versions/node"/* 2>/dev/null | tail -n 1 || true)"
    if [ -n "$NVM_NODE" ]; then
        export PATH="$NVM_NODE/bin:$PATH"
    fi
fi

# 2. Auto-locate game Production directory and install version.dll & winhttp.dll
install_hook_dlls() {
    local target_dir="$1"
    if [ -d "$target_dir" ]; then
        if [ ! -f "$target_dir/version.dll" ] || ! cmp -s "$ASSETS_DIR/version.dll" "$target_dir/version.dll" 2>/dev/null; then
            echo "[Steam Launcher] Installing version.dll into: $target_dir"
            cp -f "$ASSETS_DIR/version.dll" "$target_dir/version.dll" 2>/dev/null || true
            chmod 755 "$target_dir/version.dll" 2>/dev/null || true
        fi
        if [ ! -f "$target_dir/winhttp.dll" ] || ! cmp -s "$ASSETS_DIR/winhttp.dll" "$target_dir/winhttp.dll" 2>/dev/null; then
            echo "[Steam Launcher] Installing winhttp.dll into: $target_dir"
            cp -f "$ASSETS_DIR/winhttp.dll" "$target_dir/winhttp.dll" 2>/dev/null || true
            chmod 755 "$target_dir/winhttp.dll" 2>/dev/null || true
        fi
    fi
}

sync_all_directories() {
    # Search active Steam compatdata prefixes and common paths
    for prefix_dir in "$HOME/.local/share/Steam/steamapps/compatdata"/* "/run/media"/*/*/"SteamLibrary/steamapps/compatdata"/* "$HOME/.var/app/com.valvesoftware.Steam/data/Steam/steamapps/compatdata"/*; do
        for user_dir in "$prefix_dir/pfx/drive_c/users"/*; do
            local prod_path="$user_dir/AppData/Local/RealmOfTheMadGod/Production"
            if [ -d "$prod_path" ]; then
                install_hook_dlls "$prod_path"
            fi
            local doc_path="$user_dir/Documents/RealmOfTheMadGod/Production"
            if [ -d "$doc_path" ]; then
                install_hook_dlls "$doc_path"
            fi
        done
    done

    # If passed an explicit executable path in arguments
    for arg in "$@"; do
        if [[ "$arg" == *"RotMG"* ]] || [[ "$arg" == *"Production"* ]] || [[ "$arg" == *"Realm"* ]]; then
            local dir_arg="$(dirname "$arg")"
            install_hook_dlls "$dir_arg"
        fi
    done
}

# Initial synchronization before game launch
sync_all_directories "$@"

# Start continuous watchdog loop in the background to re-inject DLLs if Deca launcher wipes them
(
    while true; do
        sync_all_directories "$@"
        sleep 1
    done
) &
WATCHER_PID=$!
trap "kill -9 $WATCHER_PID 2>/dev/null || true" EXIT INT TERM

# 3. Locate Node.js binary
NODE_BIN=""
for candidate in "$HOME/.local/nodejs/bin/node" "$HOME/.nvm/versions/node"/*/bin/node "$(which node 2>/dev/null)"; do
    if [ -x "$candidate" ]; then
        NODE_BIN="$candidate"
        break
    fi
done

# 4. Start Realm Engine Proxy & WebUI in the background if not already running
if ! pgrep -f "dist/app.cjs" > /dev/null && ! pgrep -f "tsx src/index.ts" > /dev/null; then
    echo "[Steam Launcher] Starting Realm Engine Proxy & Dashboard..."
    if [ -n "$NODE_BIN" ] && [ -f "$CLIENT_DIR/dist/app.cjs" ]; then
        (cd "$CLIENT_DIR" && "$NODE_BIN" "$CLIENT_DIR/dist/app.cjs" --dev > /tmp/realm-engine.log 2>&1) &
    else
        (cd "$CLIENT_DIR" && npm start -- --dev > /tmp/realm-engine.log 2>&1) &
    fi
    
    # Wait up to 10 seconds for the proxy (port 2050) & dashboard (port 4440) to be ready
    echo "[Steam Launcher] Waiting for Realm Engine proxy to start on port 2050..."
    for i in {1..20}; do
        if nc -z 127.0.0.1 2050 2>/dev/null || curl -s -o /dev/null http://localhost:4440 2>/dev/null; then
            echo "[Steam Launcher] Proxy & Dashboard are ready!"
            break
        fi
        sleep 0.5
    done
fi

# 5. Configure DLL overrides for Proton / Wine so winhttp.dll and version.dll are loaded
export WINEDLLOVERRIDES="version=n,b;winhttp=n,b;version.dll=n,b;winhttp.dll=n,b"
export REALM_ENGINE_SKIP_WINHTTP_INSTALL=0

# 6. Launch the actual game passed from Steam (%command%)
"$@"
