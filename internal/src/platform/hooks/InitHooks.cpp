#include "pch-il2cpp.h"
#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h>
#include <iostream>
#include <mutex>
#include <cstdio>
#include <cstring>
#include "detours/detours.h"
#include "minhook/MinHook.h"
#include "InitHooks.h"
#include "DirectX.h"
#include "Dx11.h"
#include "ProjectileTracking.h"
#include "AutoAim.h"
#include "AoeTracking.h"
#include "SpeedHack.h"
#include "SharedMemory.h"
#include "ProjNoclip.h"
#include "NoclipHook.h"
#include "IpcBridge.h"
#include "DbgFileLog.h"
#include "DangerPlanner.h"
#include "core/logging/helpers.h"

namespace {

constexpr u_short kGamePort = 2050;

using connect_t = int(WSAAPI*)(SOCKET, const sockaddr*, int);
static connect_t s_realConnect = nullptr;
static void*     s_connectTarget = nullptr;
static bool      s_connectInstalled = false;

static void WriteWholeFile(const char* path, const char* text) {
    HANDLE h = CreateFileA(path, GENERIC_WRITE, FILE_SHARE_READ, nullptr,
                           CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, nullptr);
    if (h == INVALID_HANDLE_VALUE) return;
    DWORD written = 0;
    WriteFile(h, text, static_cast<DWORD>(std::strlen(text)), &written, nullptr);
    CloseHandle(h);
}

static void RecordOriginalTarget(const char* ipDottedQuad) {
    char tmpDir[MAX_PATH];
    DWORD n = GetTempPathA(MAX_PATH, tmpDir);
    if (n == 0 || n >= MAX_PATH) return;

    char path[MAX_PATH];

    snprintf(path, sizeof(path), "%srotmg_proxy_target_%lu.txt", tmpDir, GetCurrentProcessId());
    WriteWholeFile(path, ipDottedQuad);

    snprintf(path, sizeof(path), "%srotmg_proxy_target.txt", tmpDir);
    WriteWholeFile(path, ipDottedQuad);
}

static int WSAAPI HookedConnect(SOCKET s, const sockaddr* name, int namelen) {
    if (name && namelen >= static_cast<int>(sizeof(sockaddr_in)) &&
        name->sa_family == AF_INET) {
        const sockaddr_in* in4 = reinterpret_cast<const sockaddr_in*>(name);

        if (in4->sin_port == htons(kGamePort)) {
            char ip[INET_ADDRSTRLEN] = {0};
            if (inet_ntop(AF_INET, &in4->sin_addr, ip, sizeof(ip)) != nullptr) {
                if (std::strcmp(ip, "127.0.0.1") != 0) {
                    RecordOriginalTarget(ip);
                    DBG_FILE_LOG("[ConnectHook] Recorded real target IP: " << ip << ":2050");
                }
            }
        }
    }

    return s_realConnect(s, name, namelen);
}

} // anonymous namespace

bool InstallConnectHook() {
    if (s_connectInstalled) return true;

    MH_STATUS st = MH_Initialize();
    if (st != MH_OK && st != MH_ERROR_ALREADY_INITIALIZED) {
        return false;
    }

    HMODULE ws2 = LoadLibraryA("ws2_32.dll");
    if (!ws2) {
        return false;
    }

    s_connectTarget = reinterpret_cast<void*>(GetProcAddress(ws2, "connect"));
    if (!s_connectTarget) {
        return false;
    }

    if (MH_CreateHook(s_connectTarget, reinterpret_cast<void*>(&HookedConnect),
                      reinterpret_cast<void**>(&s_realConnect)) != MH_OK) {
        return false;
    }
    if (MH_EnableHook(s_connectTarget) != MH_OK) {
        return false;
    }

    s_connectInstalled = true;
    DBG_FILE_LOG("[ConnectHook] Successfully installed socket redirect hook");
    return true;
}

void RemoveConnectHook() {
    if (!s_connectInstalled) return;

    if (s_connectTarget) {
        MH_DisableHook(s_connectTarget);
        MH_RemoveHook(s_connectTarget);
        s_connectTarget = nullptr;
    }

    s_realConnect = nullptr;
    s_connectInstalled = false;
    DBG_FILE_LOG("[ConnectHook] Removed socket redirect hook");
}

bool HookFunction(PVOID* ppPointer, PVOID pDetour, const char* functionName) {
    if (const auto error = DetourAttach(ppPointer, pDetour); error != NO_ERROR) {
        std::cout << "[ERROR]: Failed to hook " << functionName << ", error " << error << std::endl;
        return false;
    }
    std::cout << "[HOOKED]: " << functionName << std::endl;
    return true;
}

bool UnhookFunction(PVOID* ppPointer, PVOID pDetour, const char* functionName) {
    if (const auto error = DetourDetach(ppPointer, pDetour); error != NO_ERROR) {
        std::cout << "[ERROR]: Failed to unhook " << functionName << ", error " << error << std::endl;
        return false;
    }
    std::cout << "[UNHOOKED]: " << functionName << std::endl;
    return true;
}

void DetourInitilization() {
    DBG_FILE_LOG("[DetourInit] Entering DetourInitilization...");
    DetourTransactionBegin();
    DBG_FILE_LOG("[DetourInit] DetourTransactionBegin done.");
    DetourUpdateThread(GetCurrentThread());
    DBG_FILE_LOG("[DetourInit] DetourUpdateThread done.");

    DBG_FILE_LOG("[DetourInit] Constructing dx11api (creates temp D3D11 device)...");
    dx11api d3d11 = dx11api();
    DBG_FILE_LOG("[DetourInit] dx11api constructor returned. presentFunction=" << (void*)d3d11.presentFunction);

    if (!d3d11.presentFunction) {
        std::cout << "[ERROR]: Unable to retrieve IDXGISwapChain::Present method" << std::endl;
        return;
    }

    oPresent = d3d11.presentFunction;
    oResizeBuffers = d3d11.resizeBuffersFunction;

    if (!oPresent) {
        std::cout << "[ERROR]: oPresent is null!" << std::endl;
        return;
    }

    std::cout << "[INFO]: Attempting to hook oPresent at address: " << oPresent << std::endl;

    if (!HookFunction(&(PVOID&)oPresent, (PVOID)dPresent, "D3D_PRESENT_FUNCTION")) {
        DetourTransactionAbort();
        return;
    }

    if (oResizeBuffers) {
        std::cout << "[INFO]: Attempting to hook oResizeBuffers at address: " << oResizeBuffers << std::endl;
        if (!HookFunction(&(PVOID&)oResizeBuffers, (PVOID)dResizeBuffers, "D3D_RESIZE_BUFFERS_FUNCTION")) {
            std::cout << "[WARN]: Failed to hook oResizeBuffers" << std::endl;
        }
    }

    DetourTransactionCommit();
    DBG_FILE_LOG("[DetourInit] DetourTransactionCommit done.");

    // ProjectileTracking and AutoAim use IL2CPP runtime resolution.
    // They self-install lazily from dPresent (Tick) once the game is initialized.

    SharedMemory::Init();
}

void DetourUninitialization()
{
    static std::once_flag s_uninitOnce;
    std::call_once(s_uninitOnce, []() {
        // 0) Stop the IPC bridge thread first so the pipe disconnects cleanly.
        IpcBridge_RequestShutdown();

        SharedMemory::Shutdown();

        // 1) Restore clean game state before tearing down DirectX.
        SpeedHack::SetMultiplier(1.0f);

        // 2) Stop ImGui / WndProc / D3D while Present is still hooked but short-circuited via g_unloading.
        DirectX::Shutdown();

        // 3) Remove IL2CPP MinHook targets before MinHook uninit.
        RemoveConnectHook();
        NoclipHook::Uninstall();
        SpeedHack::Uninstall();
        DangerPlanner::Uninstall();
        ProjNoclip::Uninstall();
        AoeTracking::Uninstall();
        AutoAim::Uninstall();
        ProjectileTracking::Uninstall();

        // 4) Disable any remaining MinHook hooks, then release the library (safe if never initialized).
        MH_DisableHook(MH_ALL_HOOKS);
        MH_Uninitialize();

        // 5) Detach DXGI hooks last so the render thread stops entering our detours.
        DetourTransactionBegin();
        DetourUpdateThread(GetCurrentThread());
        if (oResizeBuffers) {
            DetourDetach(&(PVOID&)oResizeBuffers, (PVOID)dResizeBuffers);
            oResizeBuffers = nullptr;
        }
        if (oPresent) {
            DetourDetach(&(PVOID&)oPresent, (PVOID)dPresent);
            oPresent = nullptr;
        }
        DetourTransactionCommit();
    });
}
