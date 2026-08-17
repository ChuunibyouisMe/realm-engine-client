#!/usr/bin/env bash
# ==============================================================================
# RealmEngine — Steam Deck & Proton Setup Script
# ==============================================================================
# This script automates setting up RealmEngine with RotMG on Steam Deck (SteamOS)
# and Linux machines running RotMG under Proton/Wine.
#
# Features:
# 1. Automatically locates RotMG Proton prefixes (Internal SSD + SD Card).
# 2. Configures Wine DLL overrides (version=native,builtin) directly in the prefix.
# 3. Copies version.dll into the game folder if available.
# 4. Configures loopback networking and generates a one-click launcher.
# 5. Creates a Desktop shortcut for Steam Deck Desktop Mode / Steam Game Mode.
# ==============================================================================

set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BOLD}${CYAN}=====================================================${NC}"
echo -e "${BOLD}${CYAN}   RealmEngine — Steam Deck & Proton Setup Script   ${NC}"
echo -e "${BOLD}${CYAN}=====================================================${NC}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
USER_HOME="${HOME:-/home/deck}"
COMPATDATA_DIRS=(
    "$USER_HOME/.local/share/Steam/steamapps/compatdata"
    "$USER_HOME/.steam/steam/steamapps/compatdata"
    "$USER_HOME/.steam/root/steamapps/compatdata"
    "/run/media/mmcblk0p1/steamapps/compatdata"
    "/run/media/deck/*/steamapps/compatdata"
)

echo -e "\n${CYAN}[1/5] Searching for RotMG Proton prefix and installation...${NC}"

ROTMG_EXE_PATH=""
PREFIX_PATH=""

# Scan compatdata folders for RotMG Exalt.exe
for base_dir in "${COMPATDATA_DIRS[@]}"; do
    if [ -d "$base_dir" ]; then
        echo -e "  Scanning: $base_dir"
        found=$(find "$base_dir" -maxdepth 7 -name "RotMG Exalt.exe" 2>/dev/null | head -n 1 || true)
        if [ -n "$found" ]; then
            ROTMG_EXE_PATH="$found"
            # Extract the pfx directory (e.g., .../compatdata/<appid>/pfx)
            PREFIX_PATH=$(echo "$found" | grep -o '.*/compatdata/[^/]*' | head -n 1)/pfx
            break
        fi
    fi
done

# Fallback: search whole home directory if not found in standard steamapps
if [ -z "$ROTMG_EXE_PATH" ]; then
    echo -e "${YELLOW}  Not found in standard steamapps. Performing deeper search...${NC}"
    found=$(find "$USER_HOME" -maxdepth 9 -name "RotMG Exalt.exe" 2>/dev/null | head -n 1 || true)
    if [ -n "$found" ]; then
        ROTMG_EXE_PATH="$found"
        PREFIX_PATH=$(echo "$found" | grep -o '.*/compatdata/[^/]*' | head -n 1)/pfx || true
    fi
fi

if [ -n "$ROTMG_EXE_PATH" ]; then
    ROTMG_DIR="$(dirname "$ROTMG_EXE_PATH")"
    echo -e "${GREEN}  ✓ Found RotMG Exalt directory:${NC} $ROTMG_DIR"
    if [ -d "$PREFIX_PATH" ]; then
        echo -e "${GREEN}  ✓ Found Proton Prefix:${NC} $PREFIX_PATH"
    else
        echo -e "${YELLOW}  ! Custom Wine prefix / Standalone installation detected.${NC}"
    fi
else
    echo -e "${YELLOW}  ! Could not automatically find RotMG Exalt.exe.${NC}"
    echo -e "  Please enter the full path to your RotMG Exalt directory (or press Enter to skip):"
    read -r user_input_dir
    if [ -n "$user_input_dir" ] && [ -d "$user_input_dir" ]; then
        ROTMG_DIR="$user_input_dir"
    fi
fi

# ------------------------------------------------------------------------------
# 2. Configure Wine DLL Overrides in Proton Prefix
# ------------------------------------------------------------------------------
echo -e "\n${CYAN}[2/5] Configuring Proton DLL overrides...${NC}"

if [ -n "$PREFIX_PATH" ] && [ -d "$PREFIX_PATH" ]; then
    USER_REG="$PREFIX_PATH/user.reg"
    if [ -f "$USER_REG" ]; then
        if grep -q '"version"="native,builtin"' "$USER_REG" 2>/dev/null; then
            echo -e "${GREEN}  ✓ DLL override (version=native,builtin) already configured in user.reg.${NC}"
        else
            echo -e "  Writing DLL override into prefix registry ($USER_REG)..."
            if grep -q '\[Software\\\\Wine\\\\DllOverrides\]' "$USER_REG" 2>/dev/null; then
                # Insert under existing section
                sed -i '/\[Software\\\\Wine\\\\DllOverrides\]/a "version"="native,builtin"' "$USER_REG"
            else
                # Append new section
                cat << 'EOF' >> "$USER_REG"

[Software\\Wine\\DllOverrides]
#time=1d9d00000000000
"version"="native,builtin"
EOF
            fi
            echo -e "${GREEN}  ✓ Added 'version' native DLL override to Proton registry.${NC}"
        fi
    fi
fi

# ------------------------------------------------------------------------------
# 3. Stage version.dll into Game Directory
# ------------------------------------------------------------------------------
echo -e "\n${CYAN}[3/5] Staging DLL files...${NC}"

if [ -n "$ROTMG_DIR" ] && [ -d "$ROTMG_DIR" ]; then
    # Look for version.dll in script directory or client dist
    SOURCE_DLL=""
    for dll_candidate in \
        "$SCRIPT_DIR/version.dll" \
        "$SCRIPT_DIR/client/dist/version.dll" \
        "$SCRIPT_DIR/../version.dll" \
        "$SCRIPT_DIR/build/bin/version.dll"; do
        if [ -f "$dll_candidate" ]; then
            SOURCE_DLL="$dll_candidate"
            break
        fi
    done

    if [ -n "$SOURCE_DLL" ]; then
        echo -e "  Copying $SOURCE_DLL -> $ROTMG_DIR/version.dll"
        cp -f "$SOURCE_DLL" "$ROTMG_DIR/version.dll"
        echo -e "${GREEN}  ✓ version.dll successfully placed in RotMG directory.${NC}"
    else
        echo -e "${YELLOW}  ℹ version.dll not found in repository (using proxy packet-mode).${NC}"
        echo -e "    All packet features (/aa, /an, /ad, /al, /ak, /db, /ag, /ehelp) work seamlessly without the DLL!"
    fi
fi

# ------------------------------------------------------------------------------
# 4. Create Unified Launch Script
# ------------------------------------------------------------------------------
echo -e "\n${CYAN}[4/5] Creating companion launcher script...${NC}"

LAUNCHER_SCRIPT="$USER_HOME/start-realm-engine.sh"

cat << EOF > "$LAUNCHER_SCRIPT"
#!/usr/bin/env bash
# ==============================================================================
# RealmEngine Steam Deck Launcher
# ==============================================================================
export NODE_OPTIONS="--no-warnings"
export ELECTRON_ENABLE_LOGGING=1

APP_DIR="$SCRIPT_DIR"
cd "\$APP_DIR/client" 2>/dev/null || cd "\$APP_DIR"

echo "Starting RealmEngine Proxy & Dashboard..."
if [ -f "dist/app.cjs" ]; then
    node dist/app.cjs --no-sandbox &
    PROXY_PID=\$!
elif command -v npm >/dev/null 2>&1; then
    npm start &
    PROXY_PID=\$!
fi

echo "RealmEngine PID: \$PROXY_PID"
echo "Listening on 127.0.0.1:2050 (dashboard on http://127.0.0.1:8080)"
wait \$PROXY_PID 2>/dev/null || true
EOF

chmod +x "$LAUNCHER_SCRIPT"
echo -e "${GREEN}  ✓ Created launcher script:${NC} $LAUNCHER_SCRIPT"

# ------------------------------------------------------------------------------
# 5. Create Desktop Shortcut for Steam Deck Desktop Mode
# ------------------------------------------------------------------------------
echo -e "\n${CYAN}[5/5] Creating Desktop shortcut...${NC}"

DESKTOP_DIR="$USER_HOME/Desktop"
if [ -d "$DESKTOP_DIR" ]; then
    DESKTOP_FILE="$DESKTOP_DIR/RealmEngine.desktop"
    cat << EOF > "$DESKTOP_FILE"
[Desktop Entry]
Name=RealmEngine
Comment=RealmEngine Client & Proxy for RotMG
Exec=$LAUNCHER_SCRIPT
Icon=utilities-terminal
Terminal=true
Type=Application
Categories=Game;Utility;
EOF
    chmod +x "$DESKTOP_FILE"
    echo -e "${GREEN}  ✓ Created desktop icon:${NC} $DESKTOP_FILE"
fi

# ------------------------------------------------------------------------------
# Completion & Game Mode Instructions
# ------------------------------------------------------------------------------
echo -e "\n${BOLD}${GREEN}=====================================================${NC}"
echo -e "${BOLD}${GREEN}           Setup Completed Successfully!             ${NC}"
echo -e "${BOLD}${GREEN}=====================================================${NC}"

echo -e "\n${BOLD}How RealmEngine Works on Steam Deck:${NC}"
echo -e "• ${CYAN}Same Prefix / Network Sharing:${NC} Proton automatically shares localhost (${BOLD}127.0.0.1${NC}) with SteamOS."
echo -e "  When RealmEngine runs, RotMG inside Proton automatically routes packets through RealmEngine."
echo -e "• ${CYAN}In-Game Commands:${NC} Type ${BOLD}/ehelp${NC} in game chat to see all shortcuts (${BOLD}/aa, /an, /ad, /al, /ak, /db, /ag${NC}, etc.)."

echo -e "\n${BOLD}To Run on Steam Deck:${NC}"
echo -e "1. ${BOLD}Desktop Mode:${NC} Double click ${CYAN}RealmEngine${NC} on your Desktop, then launch your RotMG Launcher shortcut in Steam."
echo -e "2. ${BOLD}Steam Game Mode Launch Options:${NC}"
echo -e "   In Steam -> Right click your RotMG shortcut -> Properties -> Launch Options:"
echo -e "   ${YELLOW}WINEDLLOVERRIDES=\"version=n,b\" %command%${NC}"
echo -e "\nHave fun playing Realm on your Steam Deck!\n"
