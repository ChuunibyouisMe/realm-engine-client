CXX ?= ../tools/llvm-mingw/bin/x86_64-w64-mingw32-clang++
CC ?= ../tools/llvm-mingw/bin/x86_64-w64-mingw32-clang

ROOT_DIR := $(shell pwd)
CLIENT_ASSETS := $(ROOT_DIR)/../client/assets
TARGET := $(CLIENT_ASSETS)/version.dll
BUILD_DIR := $(ROOT_DIR)/build
PCH_SRC := $(ROOT_DIR)/src/core/il2cpp/pch-il2cpp.h
PCH_BIN := $(BUILD_DIR)/pch-il2cpp.h.pch

INCLUDES := \
	-I$(ROOT_DIR)/src \
	-I$(ROOT_DIR)/src/bootstrap \
	-I$(ROOT_DIR)/src/core/config \
	-I$(ROOT_DIR)/src/core/il2cpp \
	-I$(ROOT_DIR)/src/core/logging \
	-I$(ROOT_DIR)/src/core/runtime \
	-I$(ROOT_DIR)/src/core/ipc \
	-I$(ROOT_DIR)/src/core/security \
	-I$(ROOT_DIR)/src/features/control \
	-I$(ROOT_DIR)/src/features/runtime \
	-I$(ROOT_DIR)/src/platform/dx11 \
	-I$(ROOT_DIR)/src/platform/hooks \
	-I$(ROOT_DIR)/src/game/generated \
	-I$(ROOT_DIR)/src/game/symbols \
	-I$(ROOT_DIR)/src/game/math \
	-I$(ROOT_DIR)/src/features/combat/autoaim \
	-I$(ROOT_DIR)/src/features/combat/autoability \
	-I$(ROOT_DIR)/src/features/combat/autonexus \
	-I$(ROOT_DIR)/src/features/combat/ghostHit \
	-I$(ROOT_DIR)/src/features/combat/enemytracker \
	-I$(ROOT_DIR)/src/features/movement/dodge \
	-I$(ROOT_DIR)/src/features/movement/zdodge \
	-I$(ROOT_DIR)/src/features/movement/repp \
	-I$(ROOT_DIR)/src/features/movement/pjdodge \
	-I$(ROOT_DIR)/src/features/movement/speedhack \
	-I$(ROOT_DIR)/src/features/misc \
	-I$(ROOT_DIR)/src/features/movement/noclip \
	-I$(ROOT_DIR)/src/features/movement/collider \
	-I$(ROOT_DIR)/src/features/visuals \
	-I$(ROOT_DIR)/src/features/visuals/skins/character \
	-I$(ROOT_DIR)/src/features/visuals/skins/pet \
	-I$(ROOT_DIR)/src/features/visuals/skins \
	-I$(ROOT_DIR)/src/features/account \
	-I$(ROOT_DIR)/src/features/loot \
	-I$(ROOT_DIR)/src/features/projectiles \
	-I$(ROOT_DIR)/src/gui/tabs \
	-I$(ROOT_DIR)/src/gui/tabs/CombatTab \
	-I$(ROOT_DIR)/vendor \
	-I$(ROOT_DIR)/vendor/imgui \
	-I$(ROOT_DIR)/vendor/minhook \
	-I$(ROOT_DIR)/vendor/detours \
	-I$(ROOT_DIR)/defs

DEFINES := \
	-DNDEBUG \
	-D_VERSION \
	-DUNICODE \
	-D_UNICODE \
	-DIL2CPPDLL_EXPORTS \
	-D_WINDOWS \
	-D_USRDLL \
	-DWIN32_LEAN_AND_MEAN \
	-DNOMINMAX \
	-D_SILENCE_CXX17_CODECVT_HEADER_DEPRECATION_WARNING

COMMON_FLAGS := \
	-O2 \
	-mavx2 \
	-fms-extensions \
	-Wno-narrowing \
	-Wno-c++11-narrowing \
	-Wno-unknown-attributes \
	-Wno-macro-redefined \
	-Wno-ignored-attributes \
	-Wno-deprecated-declarations \
	-Wno-format-security

CXXFLAGS := -std=c++20 $(COMMON_FLAGS) $(DEFINES) $(INCLUDES)
CFLAGS := -O2 $(DEFINES) -I$(ROOT_DIR)/vendor/minhook

LDFLAGS := \
	-shared \
	$(ROOT_DIR)/defs/version.def \
	-ld3d11 \
	-ld3dcompiler_47 \
	-ldxgi \
	-ldxguid \
	-lkernel32 \
	-luser32 \
	-lgdi32 \
	-lbcrypt \
	-lws2_32 \
	-lole32 \
	-lshell32 \
	-luuid \
	-ldwmapi \
	-static

# Discover source files
SRC_CPP := $(shell find $(ROOT_DIR)/src -name "*.cpp")
VENDOR_C := $(shell find $(ROOT_DIR)/vendor/minhook -name "*.c")
VENDOR_CPP := \
	$(ROOT_DIR)/vendor/detours/detours.cpp \
	$(ROOT_DIR)/vendor/detours/disasm.cpp \
	$(ROOT_DIR)/vendor/detours/modules.cpp \
	$(ROOT_DIR)/vendor/imgui/imgui.cpp \
	$(ROOT_DIR)/vendor/imgui/imgui_draw.cpp \
	$(ROOT_DIR)/vendor/imgui/imgui_tables.cpp \
	$(ROOT_DIR)/vendor/imgui/imgui_widgets.cpp \
	$(ROOT_DIR)/vendor/imgui/imgui_impl_dx11.cpp \
	$(ROOT_DIR)/vendor/imgui/imgui_impl_win32.cpp

OBJS_SRC := $(patsubst $(ROOT_DIR)/src/%.cpp,$(BUILD_DIR)/src/%.o,$(SRC_CPP))
OBJS_VENDOR_C := $(patsubst $(ROOT_DIR)/vendor/%.c,$(BUILD_DIR)/vendor/%.o,$(VENDOR_C))
OBJS_VENDOR_CPP := $(patsubst $(ROOT_DIR)/vendor/%.cpp,$(BUILD_DIR)/vendor/%.o,$(VENDOR_CPP))
ALL_OBJS := $(OBJS_SRC) $(OBJS_VENDOR_C) $(OBJS_VENDOR_CPP)

.PHONY: all clean secrets preflight

all: secrets $(TARGET)

secrets:
	@if [ ! -f "$(ROOT_DIR)/src/core/ipc/BuildSecrets.h" ]; then \
		echo "[build] Generating BuildSecrets.h..."; \
		"$(ROOT_DIR)/scripts/gen-build-secrets.sh"; \
	fi

$(PCH_BIN): $(PCH_SRC)
	@mkdir -p $(dir $@)
	@echo "[PCH] Compiling $<..."
	$(CXX) $(CXXFLAGS) -x c++-header $< -o $@

$(BUILD_DIR)/src/%.o: $(ROOT_DIR)/src/%.cpp $(PCH_BIN)
	@mkdir -p $(dir $@)
	@echo "[CXX] $<"
	$(CXX) $(CXXFLAGS) -include-pch $(PCH_BIN) -c $< -o $@

$(BUILD_DIR)/vendor/%.o: $(ROOT_DIR)/vendor/%.cpp
	@mkdir -p $(dir $@)
	@echo "[VENDOR CXX] $<"
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(BUILD_DIR)/vendor/%.o: $(ROOT_DIR)/vendor/%.c
	@mkdir -p $(dir $@)
	@echo "[VENDOR C] $<"
	$(CC) $(CFLAGS) -c $< -o $@

$(TARGET): $(PCH_BIN) $(ALL_OBJS)
	@mkdir -p $(CLIENT_ASSETS)
	@echo "[LINK] $@"
	$(CXX) $(ALL_OBJS) $(LDFLAGS) -o $@
	@echo "=========================================="
	@echo "Successfully built version.dll"
	@ls -lh $(TARGET)
	@echo "=========================================="

clean:
	rm -rf $(BUILD_DIR)
	rm -f $(TARGET)
