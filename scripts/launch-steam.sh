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
        echo "[Steam Launcher] Installing hook DLLs into: $target_dir"
        cp -f "$ASSETS_DIR/version.dll" "$target_dir/version.dll" 2>/dev/null || true
        cp -f "$ASSETS_DIR/winhttp.dll" "$target_dir/winhttp.dll" 2>/dev/null || true
    fi
}

# Search active Steam compatdata prefixes and common paths
for prefix_dir in "$HOME/.local/share/Steam/steamapps/compatdata"/* "/run/media"/*/*/"SteamLibrary/steamapps/compatdata"/* "$HOME/.var/app/com.valvesoftware.Steam/data/Steam/steamapps/compatdata"/*; do
    prod_path="$prefix_dir/pfx/drive_c/users/steamuser/AppData/Local/RealmOfTheMadGod/Production"
    if [ -d "$prod_path" ]; then
        install_hook_dlls "$prod_path"
    fi
done

# If passed an explicit executable path in arguments
for arg in "$@"; do
    if [[ "$arg" == *"RotMG Exalt"* ]] || [[ "$arg" == *"Production"* ]]; then
        dir_arg="$(dirname "$arg")"
        install_hook_dlls "$dir_arg"
    fi
done

# 3. Start Realm Engine Proxy & WebUI in the background if not already running
if ! pgrep -f "tsx src/index.ts" > /dev/null && ! pgrep -f "dist/app.cjs" > /dev/null; then
    echo "[Steam Launcher] Starting Realm Engine Proxy & Dashboard..."
    (cd "$CLIENT_DIR" && npm start -- --dev > /tmp/realm-engine.log 2>&1) &
    
    # Wait a moment for DevServer to spin up on port 4440
    sleep 2
fi

# 4. Configure DLL overrides for Proton / Wine so winhttp.dll and version.dll are loaded
export WINEDLLOVERRIDES="winhttp=n,b;version=n,b"
export REALM_ENGINE_SKIP_WINHTTP_INSTALL=0

# 5. Launch the actual game passed from Steam (%command%)
exec "$@"
