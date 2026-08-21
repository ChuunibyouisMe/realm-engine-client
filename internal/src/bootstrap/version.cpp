#include "pch-il2cpp.h"

#ifdef _VERSION

#include "main.h"
#include "version.h"
#include "DbgFileLog.h"
#include <chrono>
#include <filesystem>
#include <thread>
#include <string>

#include "InitHooks.h"

HMODULE version_dll = nullptr;

#define WRAPPER_GENFUNC(name) \
      FARPROC o##name; \
      extern "C" void _##name() { if (o##name) ((void(*)())o##name)(); }

WRAPPER_GENFUNC(GetFileVersionInfoA)
WRAPPER_GENFUNC(GetFileVersionInfoByHandle)
WRAPPER_GENFUNC(GetFileVersionInfoExW)
WRAPPER_GENFUNC(GetFileVersionInfoExA)
WRAPPER_GENFUNC(GetFileVersionInfoSizeA)
WRAPPER_GENFUNC(GetFileVersionInfoSizeExA)
WRAPPER_GENFUNC(GetFileVersionInfoSizeExW)
WRAPPER_GENFUNC(GetFileVersionInfoSizeW)
WRAPPER_GENFUNC(GetFileVersionInfoW)
WRAPPER_GENFUNC(VerFindFileA)
WRAPPER_GENFUNC(VerFindFileW)
WRAPPER_GENFUNC(VerInstallFileA)
WRAPPER_GENFUNC(VerInstallFileW)
WRAPPER_GENFUNC(VerLanguageNameA)
WRAPPER_GENFUNC(VerLanguageNameW)
WRAPPER_GENFUNC(VerQueryValueA)
WRAPPER_GENFUNC(VerQueryValueW)

#define WRAPPER_FUNC(name) o##name = GetProcAddress(version_dll, #name);

void load_version_lib() {
 char systemPath[MAX_PATH];
 GetSystemDirectoryA(systemPath, MAX_PATH);
 strcat_s(systemPath, "\\version.dll");
 version_dll = LoadLibraryA(systemPath);

 if (!version_dll) {
  MessageBoxA(NULL, " version.dll not found!!", "Error", MB_OK | MB_ICONERROR);
  return;
 }

 WRAPPER_FUNC(GetFileVersionInfoA);
 WRAPPER_FUNC(GetFileVersionInfoByHandle);
 WRAPPER_FUNC(GetFileVersionInfoExW);
 WRAPPER_FUNC(GetFileVersionInfoExA);
 WRAPPER_FUNC(GetFileVersionInfoSizeA);
 WRAPPER_FUNC(GetFileVersionInfoSizeExA);
 WRAPPER_FUNC(GetFileVersionInfoSizeExW);
 WRAPPER_FUNC(GetFileVersionInfoSizeW);
 WRAPPER_FUNC(GetFileVersionInfoW);
 WRAPPER_FUNC(VerFindFileA);
 WRAPPER_FUNC(VerFindFileW);
 WRAPPER_FUNC(VerInstallFileA);
 WRAPPER_FUNC(VerInstallFileW);
 WRAPPER_FUNC(VerLanguageNameA);
 WRAPPER_FUNC(VerLanguageNameW);
 WRAPPER_FUNC(VerQueryValueA);
 WRAPPER_FUNC(VerQueryValueW);
}

void FreeVersionLibrary() {
 if (version_dll) {
  FreeLibrary(version_dll);
  version_dll = nullptr;
 }
}

DWORD WINAPI Load(LPVOID lpParam) {
 // Identify which process we're in (RotMG Exalt vs UnityCrashHandler etc.)
 char exePath[MAX_PATH] = {};
 GetModuleFileNameA(NULL, exePath, MAX_PATH);
 DBG_FILE_LOG("[Load] Entered. host exe=" << exePath);

 const char* dependencies[] = {
  "d3d11.dll", "dxgi.dll", "vcruntime140.dll"
 };

 for (const char* dep : dependencies) {
  HMODULE mod = LoadLibraryA(dep);
  if (mod) {
   FreeLibrary(mod);
  }
  else {
   DBG_FILE_LOG("[Load] Missing dependency: " << dep);
   std::string msg = "Missing Library: " + std::string(dep);
   MessageBoxA(NULL, msg.c_str(), "Dependency Error", MB_OK | MB_ICONERROR);
   return 0;
  }
 }
 DBG_FILE_LOG("[Load] Dependencies OK.");

 load_version_lib();
 if (!version_dll) {
  DBG_FILE_LOG("[Load] load_version_lib failed — aborting.");
  return 0;
 }
 DBG_FILE_LOG("[Load] version.dll proxy lib loaded.");

 // Filter out non-game processes (Launcher, CrashHandler, etc.)
 std::string pathStr(exePath);
 for (char& c : pathStr) c = (char)tolower(c);

 if (pathStr.find("launcher") != std::string::npos ||
     pathStr.find("unitycrashhandler") != std::string::npos ||
     pathStr.find("crash") != std::string::npos ||
     pathStr.find("bugreport") != std::string::npos) {
  DBG_FILE_LOG("[Load] Non-game process detected (" << exePath << ") — skipping hook injection.");
  return 0;
 }

 // Poll for GameAssembly.dll (up to 60s). If it never loads, we're in a process
 // that doesn't host IL2CPP (e.g. UnityCrashHandler64.exe) — exit quietly so
 // Run() doesn't call NULL il2cpp function pointers and crash the process.
 DBG_FILE_LOG("[Load] Polling for GameAssembly.dll (60s max)...");
 HMODULE gameAsm = nullptr;
 int pollIter = 0;
 for (pollIter = 0; pollIter < 120; ++pollIter) {
  gameAsm = GetModuleHandleW(L"GameAssembly.dll");
  if (gameAsm) break;
  std::this_thread::sleep_for(std::chrono::milliseconds(500));
 }
 if (!gameAsm) {
  DBG_FILE_LOG("[Load] GameAssembly.dll never loaded after " << (pollIter*500) << "ms — wrong process, exiting silently.");
  return 0;
 }
 DBG_FILE_LOG("[Load] GameAssembly.dll found after " << (pollIter*500) << "ms (addr=" << (void*)gameAsm << "). Waiting 2s for IL2CPP init...");

 std::this_thread::sleep_for(std::chrono::seconds(2));

 // Store the pre-resolved handle so init_il2cpp() can use it directly
 // instead of re-looking up via GetModuleHandleW (which can fail with xorstr).
 hGameAssembly = gameAsm;
 DBG_FILE_LOG("[Load] Calling Run() with hGameAssembly=" << (void*)hGameAssembly << "...");
 Run(lpParam);
 DBG_FILE_LOG("[Load] Run() returned.");

 return 0;
}

#endif 