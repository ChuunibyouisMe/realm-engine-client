#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TOOLS_DIR="$ROOT_DIR/tools"
LLVM_MINGW_DIR="$TOOLS_DIR/llvm-mingw"
GENERATED_DIR="$SCRIPT_DIR/src/game/generated"
SECRETS_FILE="$SCRIPT_DIR/src/core/ipc/BuildSecrets.h"
OUTPUT_DLL="$ROOT_DIR/client/assets/version.dll"

echo "=========================================================="
echo " Realm Engine - Linux DLL Cross-Compilation Build System"
echo "=========================================================="

# 1. Ensure llvm-mingw toolchain is present
if [ ! -x "$LLVM_MINGW_DIR/bin/x86_64-w64-mingw32-clang++" ]; then
    echo "[toolchain] llvm-mingw not found at $LLVM_MINGW_DIR."
    echo "[toolchain] Downloading portable llvm-mingw..."
    mkdir -p "$TOOLS_DIR"
    LLVM_MINGW_URL="https://github.com/mstorsjo/llvm-mingw/releases/download/20260616/llvm-mingw-20260616-ucrt-ubuntu-22.04-x86_64.tar.xz"
    curl -sL "$LLVM_MINGW_URL" -o "$TOOLS_DIR/llvm-mingw.tar.xz"
    mkdir -p "$LLVM_MINGW_DIR"
    tar -xf "$TOOLS_DIR/llvm-mingw.tar.xz" -C "$LLVM_MINGW_DIR" --strip-components=1
    rm -f "$TOOLS_DIR/llvm-mingw.tar.xz"
    echo "[toolchain] llvm-mingw installed successfully."
fi

# 2. Ensure generated IL2CPP headers exist
if [ ! -f "$GENERATED_DIR/il2cpp-types.h" ]; then
    echo "[headers] Restoring IL2CPP headers from repository history..."
    mkdir -p "$GENERATED_DIR"
    if git rev-parse --verify 071eb64a4593bb7d63dd01c703ca6fb36ad0ba00~1 >/dev/null 2>&1; then
        git checkout 071eb64a4593bb7d63dd01c703ca6fb36ad0ba00~1 -- internal/src/game/generated/
        git restore --staged "$GENERATED_DIR" 2>/dev/null || true
    fi
fi

if [ ! -f "$GENERATED_DIR/il2cpp-types.h" ]; then
    echo "[ERROR] IL2CPP headers missing in $GENERATED_DIR. See SETUP.md."
    exit 1
fi

# 3. Ensure BuildSecrets.h exists
if [ ! -f "$SECRETS_FILE" ]; then
    echo "[secrets] Generating BuildSecrets.h..."
    "$SCRIPT_DIR/scripts/gen-build-secrets.sh"
fi

# 4. Compile version.dll
JOBS="$(nproc 2>/dev/null || echo 4)"
echo "[build] Building version.dll using $JOBS parallel workers..."
make -C "$SCRIPT_DIR" -j"$JOBS" CXX="$LLVM_MINGW_DIR/bin/x86_64-w64-mingw32-clang++" CC="$LLVM_MINGW_DIR/bin/x86_64-w64-mingw32-clang"

if [ ! -f "$OUTPUT_DLL" ]; then
    echo "[ERROR] Compilation finished but $OUTPUT_DLL was not created."
    exit 1
fi

echo ""
echo "[OK] Build completed successfully: $OUTPUT_DLL"
ls -lh "$OUTPUT_DLL"
