// Generated C++ file by Il2CppInspectorPro - https://github.com/jadis0x

#include "pch-il2cpp.h"
#include "main.h"
#include <windows.h>
#include <iostream>
#include <tlhelp32.h>

#include "il2cpp-appdata.h"
#include "il2cpp-init.h"
#include "helpers.h"
#include "InitHooks.h"
#include "IpcBridge.h"
#include "DbgFileLog.h"
#include "CrashProbe.h"

HMODULE hModule;
HANDLE hUnloadEvent;
HMODULE hGameAssembly = nullptr;
static HANDLE hSecurityThread = nullptr;

static bool IsDebuggerDetected()
{
    return false;
}

static bool HasAnalysisModulesLoaded()
{
    return false;
}

DWORD WINAPI SecurityWatcherThread(LPVOID)
{
    return 0;
}

void Run(LPVOID lpParam)
{
 hModule = static_cast<HMODULE>(lpParam);

#ifdef _DEBUG
 il2cppi_new_console();
 SetConsoleTitleA("Debug Console");
#endif
 DBG_FILE_LOG("[Run] Entered. Log path: " << DbgFileLogPath());

 // Install crash logging as early as possible so any fatal fault (feature hook
 // misfire, stale offset misread) records module+offset+backtrace to the trace log.
 crashprobe::InstallCrashProbe();

#if !defined(_DEBUG)
 if (IsDebuggerDetected() || HasAnalysisModulesLoaded()) return;
#endif

 DBG_FILE_LOG("[Run] About to call init_il2cpp(hGameAssembly=" << (void*)hGameAssembly << ")...");
 init_il2cpp(hGameAssembly);
 DBG_FILE_LOG("[Run] init_il2cpp() returned.");

 DBG_FILE_LOG("[Run] About to call AttachIl2Cpp()...");
 if (!AttachIl2Cpp()) {
  DBG_FILE_LOG("[Run] AttachIl2Cpp() FAILED — returning.");
  return;
 }
 DBG_FILE_LOG("[Run] AttachIl2Cpp() succeeded.");

 DBG_FILE_LOG("[Run] About to call DetourInitilization()...");
 DetourInitilization();
 DBG_FILE_LOG("[Run] DetourInitilization() returned.");

 hUnloadEvent = CreateEvent(nullptr, FALSE, FALSE, nullptr);
 if (!hUnloadEvent) {
  LogError("Unload Event could not be created!");
  return;
 }
 DBG_FILE_LOG("[Run] hUnloadEvent created.");

 HANDLE hThread = CreateThread(nullptr, 0, UnloadWatcherThread, hUnloadEvent, 0, nullptr);
 if (hThread) {
  CloseHandle(hThread);
 }
 else {
  LogError("Unload Watcher Thread could not be started!");
 }
 DBG_FILE_LOG("[Run] UnloadWatcherThread spawned. Run() complete.");

#if !defined(_DEBUG)
 hSecurityThread = CreateThread(nullptr, 0, SecurityWatcherThread, nullptr, 0, nullptr);
 if (hSecurityThread) CloseHandle(hSecurityThread);
#endif

 // Start the IPC bridge thread so the bot-client can connect via named pipe.
 HANDLE hBridgeThread = CreateThread(nullptr, 0, IpcBridgeThread, nullptr, 0, nullptr);
 if (hBridgeThread) {
  CloseHandle(hBridgeThread);
  DBG_FILE_LOG("[Run] IpcBridgeThread spawned.");
 }
 else {
  LogError("IpcBridge Thread could not be started!");
  DBG_FILE_LOG("[Run] IpcBridgeThread spawn FAILED.");
 }
}

bool AttachIl2Cpp()
{
 // il2cpp_domain_get / il2cpp_thread_attach are function pointers resolved by
 // init_il2cpp() via GetProcAddress. If init_il2cpp aborted early (GameAssembly.dll
 // not loaded), those pointers are NULL and calling them crashes the process.
 if (!il2cpp_domain_get || !il2cpp_thread_attach) {
  DBG_FILE_LOG("[AttachIl2Cpp] IL2CPP function pointers are NULL — init_il2cpp failed. Aborting.");
  return false;
 }

 Il2CppDomain* domain = il2cpp_domain_get();
 if (!domain) {
  LogError("IL2CPP Domain not found!", true);
  return false;
 }

 Il2CppThread* thread = il2cpp_thread_attach(domain);
 if (!thread) {
  LogError("IL2CPP Thread attach edilemedi!", true);
  return false;
 }
 return true;
}

DWORD WINAPI UnloadWatcherThread(LPVOID lpParam)
{
 HANDLE eventHandle = static_cast<HANDLE>(lpParam);
 if (!eventHandle) return 0;

 if (WaitForSingleObject(eventHandle, INFINITE) == WAIT_OBJECT_0) {
#ifdef _DEBUG
  std::cout << "\n[INFO]  Unload signal received, exiting..." << std::endl;
#endif

  DetourUninitialization();

#ifdef _DEBUG
  fclose(stdout);
  FreeConsole();
#endif

  if (hUnloadEvent) {
   CloseHandle(hUnloadEvent);
   hUnloadEvent = nullptr;
  }

  Sleep(200);
  FreeLibraryAndExitThread(hModule, 0);
 }
 return 0;
}
