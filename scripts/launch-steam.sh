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
# Full byte comparison is correct but reads the whole 26 MB DLL. The startup
# sync does that once; the 1-per-N-seconds watchdog uses a size-only check
# instead, since its only job is to re-place files the Deca launcher deleted or
# swapped — re-reading 26 MB from an SD card on a loop is not free.
DEEP_COMPARE=1

needs_install() {
    local src="$1" dst="$2"
    [ -f "$dst" ] || return 0
    if [ "$DEEP_COMPARE" = "1" ]; then
        ! cmp -s "$src" "$dst" 2>/dev/null
    else
        [ "$(stat -c%s "$src" 2>/dev/null || echo 0)" != "$(stat -c%s "$dst" 2>/dev/null || echo 1)" ]
    fi
}

install_hook_dlls() {
    local target_dir="$1"
    if [ -d "$target_dir" ]; then
        if needs_install "$ASSETS_DIR/version.dll" "$target_dir/version.dll"; then
            echo "[Steam Launcher] Installing version.dll into: $target_dir"
            cp -f "$ASSETS_DIR/version.dll" "$target_dir/version.dll" 2>/dev/null || true
            chmod 755 "$target_dir/version.dll" 2>/dev/null || true
        fi
        if needs_install "$ASSETS_DIR/winhttp.dll" "$target_dir/winhttp.dll"; then
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

    # Search Steam common game installation folders
    for common_dir in "$HOME/.local/share/Steam/steamapps/common"/* "/run/media"/*/*/"SteamLibrary/steamapps/common"/* "$HOME/.var/app/com.valvesoftware.Steam/data/Steam/steamapps/common"/*; do
        if [[ "$common_dir" == *"Realm"* ]] || [[ "$common_dir" == *"RotMG"* ]]; then
            install_hook_dlls "$common_dir"
            if [ -d "$common_dir/Production" ]; then
                install_hook_dlls "$common_dir/Production"
            fi
        fi
    done

    # If passed an explicit executable path in arguments
    for arg in "$@"; do
        if [[ "$arg" == *"RotMG"* ]] || [[ "$arg" == *"Production"* ]] || [[ "$arg" == *"Realm"* ]]; then
            local dir_arg="$(dirname "$arg")"
            install_hook_dlls "$dir_arg"
            if [ -d "$dir_arg/Production" ]; then
                install_hook_dlls "$dir_arg/Production"
            fi
        fi
    done
}

# Initial synchronization before game launch
sync_all_directories "$@"

# Start continuous watchdog loop in the background to re-inject DLLs if Deca launcher wipes them
(
    DEEP_COMPARE=0
    while true; do
        sync_all_directories "$@"
        sleep 3
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
#
# "A proxy process exists" is not the same as "the dashboard works". A leftover
# proxy that lost the race for port 4440 keeps running with no dashboard, and
# skipping startup because of it left the UI stuck on "Loading plugins…". So
# check the dashboard actually answers, and if it doesn't, clear the stale
# process out before starting fresh.
# `pgrep -f` alone is not safe here: it matches any process whose command line
# merely mentions the path — the shell that invoked this script, an editor, a
# grep. Killing those would be catastrophic. So re-read each candidate's real
# command line and keep it only if it is a node process running *our* entry
# point, never this script or its parent.
proxy_pids() {
    local pid cmd first
    for pid in $(pgrep -f "app\.cjs|src/index\.ts" 2>/dev/null || true); do
        [ "$pid" = "$$" ] && continue
        [ "$pid" = "$PPID" ] && continue
        cmd="$(tr '\0' ' ' < "/proc/$pid/cmdline" 2>/dev/null || true)"
        [ -n "$cmd" ] || continue
        # Argv[0] must be a node binary, which rules out shells and greps.
        first="${cmd%% *}"
        case "$first" in
            *node|*node.exe) ;;
            *) continue ;;
        esac
        case "$cmd" in
            *"$CLIENT_DIR/dist/app.cjs"*|*"$CLIENT_DIR/src/index.ts"*) echo "$pid" ;;
            *dist/app.cjs*|*src/index.ts*) echo "$pid" ;;
        esac
    done
}

dashboard_healthy() {
    curl -sf -m 2 -o /dev/null "http://localhost:4440/api/plugins" 2>/dev/null
}

EXISTING_PIDS="$(proxy_pids | sort -u | tr '\n' ' ')"
if [ -n "${EXISTING_PIDS// /}" ] && ! dashboard_healthy; then
    echo "[Steam Launcher] Found a Realm Engine proxy that is not serving the dashboard — restarting it."
    for pid in $EXISTING_PIDS; do
        kill "$pid" 2>/dev/null || true
    done
    sleep 2
    for pid in $EXISTING_PIDS; do
        kill -9 "$pid" 2>/dev/null || true
    done
    sleep 1
    EXISTING_PIDS=""
fi

if [ -z "${EXISTING_PIDS// /}" ]; then
    echo "[Steam Launcher] Starting Realm Engine Proxy & Dashboard..."
    if [ -n "$NODE_BIN" ] && [ -f "$CLIENT_DIR/dist/app.cjs" ]; then
        (cd "$CLIENT_DIR" && "$NODE_BIN" "$CLIENT_DIR/dist/app.cjs" --dev > /tmp/realm-engine.log 2>&1) &
    else
        (cd "$CLIENT_DIR" && npm start -- --dev > /tmp/realm-engine.log 2>&1) &
    fi
    
    # Wait for the proxy (2050) AND the dashboard (4440). Both are required: the
    # game needs 2050, and a proxy whose dashboard never came up is the broken
    # state this script now restarts out of. 40s, because a cold start on a Deck
    # (SD card, XML parsing) is a lot slower than on a desktop.
    echo "[Steam Launcher] Waiting for Realm Engine proxy (2050) and dashboard (4440)..."
    port_open() {
        # nc isn't always present on SteamOS; bash's /dev/tcp needs no packages.
        (exec 3<>"/dev/tcp/127.0.0.1/$1") 2>/dev/null && exec 3<&- && return 0
        return 1
    }
    READY=0
    for i in $(seq 1 80); do
        if port_open 2050 && dashboard_healthy; then
            echo "[Steam Launcher] Proxy & Dashboard are ready!"
            READY=1
            break
        fi
        sleep 0.5
    done
    if [ "$READY" != "1" ]; then
        echo "[Steam Launcher] WARNING: Realm Engine did not come up within 40s."
        echo "[Steam Launcher] Last lines of /tmp/realm-engine.log:"
        tail -n 15 /tmp/realm-engine.log 2>/dev/null || true
        echo "[Steam Launcher] Launching the game anyway — hacks may be inactive."
    fi
fi

# 5. Configure DLL overrides for Proton / Wine so winhttp.dll and version.dll are loaded
export WINEDLLOVERRIDES="version=n,b;winhttp=n,b;version.dll=n,b;winhttp.dll=n,b"
export REALM_ENGINE_SKIP_WINHTTP_INSTALL=0

# 6. Launch the actual game passed from Steam (%command%)
"$@"
