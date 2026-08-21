#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
TARGET="$ROOT_DIR/internal/src/core/ipc/BuildSecrets.h"

mkdir -p "$(dirname "$TARGET")"

cat << 'EOF' > "$TARGET"
#pragma once
// AUTO-GENERATED - do not edit or commit.
// Open source: fixed PUBLIC handshake key + pipe name (no per-build secret).
#define BUILD_HANDSHAKE_KEY "47eb249907eb980c851fe3a7bdb56a244244bb7d465572b556e810df6827ecfb"
#define BUILD_PIPE_NAME "\\\\.\\pipe\\lfg-dev-bridge"
EOF

echo "Generated $TARGET"
