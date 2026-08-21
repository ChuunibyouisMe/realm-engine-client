#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLIENT_DIR="$SCRIPT_DIR/../client"

# 1. Start Realm Engine Proxy & WebUI in the background if not already running
if ! pgrep -f "tsx src/index.ts" > /dev/null && ! pgrep -f "dist/app.cjs" > /dev/null; then
    echo "[Steam Launcher] Starting Realm Engine Proxy & Dashboard..."
    (cd "$CLIENT_DIR" && npm start -- --dev > /tmp/realm-engine.log 2>&1) &
    
    # Wait a moment for DevServer to spin up on port 4440
    sleep 2
fi

# 2. Open the WebUI dashboard in your default web browser
if command -v xdg-open > /dev/null 2>&1; then
    xdg-open "http://localhost:4440" > /dev/null 2>&1 &
fi

# 3. Configure DLL overrides for Proton / Wine so winhttp.dll and version.dll are loaded
export WINEDLLOVERRIDES="winhttp=n,b;version=n,b"
export REALM_ENGINE_SKIP_WINHTTP_INSTALL=0

# 4. Launch the actual game passed from Steam (%command%)
exec "$@"
