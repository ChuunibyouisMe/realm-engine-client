#include "pch-il2cpp.h"
#include <cstdio>

#include "DirectX.h"
#include "DbgFileLog.h"
#include "settings.h"
#include "gui/tabs/TestTAB.h"
#include "gui/tabs/VisualsTAB.h"
#include "gui/tabs/CombatTab/CombatTAB.h"
#include "gui/tabs/PlayerTAB.h"
#include <imgui/imgui_impl_dx11.h>
#include <imgui/imgui_impl_win32.h>
#include <mutex>
#include <atomic>
#include <chrono>
#include <thread>
#include "Il2CppResolver.h"
#include "AutoAim.h"
#include "RuntimeOffsets.h"
#include "BootGate.h"
#include "DiagBridge.h"
#include "GameState.h"
#include "LocalPlayer.h"
#include "SharedMemory.h"
#include "SkinChanger.h"
#include "BagLooter.h"
#include "SpeedHack.h"
#include "FpsSetter.h"
#include "gui/tabs/CameraTAB.h"
#include "FeatureRuntime.h"
#include "ChatToast.h"
#include "HwidCapture.h"
#include "keybinds.h"
#include "gui/tabs/WorldTAB.h"

namespace {

static float s_cachedScreenW = 0.f;
static float s_cachedScreenH = 0.f;


void UpdateCachedClientSize()
{
	HWND wnd = DirectX::window;
	if (!wnd)
		return;
	RECT rc{};
	GetClientRect(wnd, &rc);
	s_cachedScreenW = static_cast<float>(rc.right - rc.left);
	s_cachedScreenH = static_cast<float>(rc.bottom - rc.top);
}

void DrawFpsOverlayTopCameraRect()
{
	ImDrawList* fg = ImGui::GetForegroundDrawList();
	if (!fg)
		return;

	UpdateCachedClientSize();
	const float screenW = s_cachedScreenW > 0.f ? s_cachedScreenW : 1280.f;
	const float screenH = s_cachedScreenH > 0.f ? s_cachedScreenH : 800.f;

	const float centerX = screenW * 0.5f;
	const float textY = 6.f;

	const float fps = ImGui::GetIO().Framerate;
	char buf[48];
	std::snprintf(buf, sizeof(buf), "%.0f FPS", fps);

	const ImVec2 ts = ImGui::CalcTextSize(buf);
	const ImVec2 pos(centerX - ts.x * 0.5f, textY);
	fg->AddText(ImVec2(pos.x + 1.f, pos.y + 1.f), IM_COL32(0, 0, 0, 200), buf);
	fg->AddText(pos, IM_COL32(220, 255, 200, 255), buf);
}
} // namespace

D3D_PRESENT_FUNCTION oPresent = nullptr;
HWND DirectX::window = nullptr;
HANDLE DirectX::hRenderSemaphore = nullptr;
ID3D11Device* DirectX::pDevice = nullptr;
ID3D11DeviceContext* DirectX::pContext = nullptr;
static ID3D11RenderTargetView* pRenderTargetView = nullptr;
static WNDPROC oWndProc = nullptr;
static std::atomic<bool> g_unloading{false};

extern LRESULT ImGui_ImplWin32_WndProcHandler(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam);

static MouseStateCache mouseCache;

LRESULT __stdcall dWndProc(const HWND hWnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
	if (g_unloading)
		return CallWindowProc(oWndProc, hWnd, uMsg, wParam, lParam);

	KeyBinds::WndProc(uMsg, wParam, lParam);

	if (settings.ImGuiInitialized && ImGui::GetCurrentContext()) {
		const bool isKey   = (uMsg == WM_KEYDOWN    || uMsg == WM_KEYUP ||
		                      uMsg == WM_SYSKEYDOWN || uMsg == WM_SYSKEYUP ||
		                      uMsg == WM_CHAR);
		const bool isToggle = isKey && (wParam == settings.KeyBinds.Toggle_Menu ||
		                                wParam == VK_INSERT ||
		                                wParam == VK_F1 ||
		                                wParam == VK_F11 ||
		                                wParam == 0xC0);

		if (!isToggle) {
			ImGui_ImplWin32_WndProcHandler(hWnd, uMsg, wParam, lParam);
		}

		const ImGuiIO& io = ImGui::GetIO();
		const bool isMouse = (uMsg >= WM_MOUSEFIRST && uMsg <= WM_MOUSELAST);
		if ((isMouse && io.WantCaptureMouse) ||
		    (isKey && !isToggle && io.WantCaptureKeyboard && settings.bShowMenu))
			return 1;
	}

	if (uMsg == WM_SIZE) {
		UpdateCachedClientSize();
		if (pRenderTargetView) {
			pRenderTargetView->Release();
			pRenderTargetView = nullptr;
		}
	}
	return CallWindowProc(oWndProc, hWnd, uMsg, wParam, lParam);
}

HRESULT __stdcall dPresent(IDXGISwapChain* __this, UINT SyncInterval, UINT Flags) {
	if (g_unloading)
		return oPresent(__this, SyncInterval, Flags);

	Resolver::Protection::EnsureThreadAttached();

	// DEBUG BISECT #2: SpeedHack::Tick lazily installs IL2CPP hooks via
	// Detours every frame on the render thread. Detours' transaction
	// commit suspends all other threads — if any holds the IL2CPP lock
	// when Tick fires, install hangs forever and the game freezes. The
	// rewrite from MinHook to Detours in the Bugs merge is the most
	// likely cause of "inject then freeze". Re-enable once the install
	// path is moved off the render thread (e.g. one-shot in Load(), or
	// a worker thread) — or reverted to MinHook.
	// XRebuild-style speedhack hooks install lazily once IL2CPP is ready.
	// SpeedHack::Tick();
	FpsSetter::Tick();

	// Present-level FPS cap (busy-wait, matches XRebuild dPresent approach).
	{
		static auto s_lastPresent = std::chrono::steady_clock::now();
		const int targetFps = FpsSetter::GetTargetFps();
		if (targetFps > 0) {
			const double targetMs = 1000.0 / static_cast<double>(targetFps);
			auto now = std::chrono::steady_clock::now();
			const double elapsedMs = std::chrono::duration<double, std::milli>(now - s_lastPresent).count();
			if (elapsedMs < targetMs) {
				const double remaining = targetMs - elapsedMs;
				if (remaining > 1.5)
					std::this_thread::sleep_for(std::chrono::milliseconds(static_cast<int>(remaining - 1.0)));
				while (std::chrono::duration<double, std::milli>(std::chrono::steady_clock::now() - s_lastPresent).count() < targetMs)
					std::this_thread::yield();
			}
			s_lastPresent = std::chrono::steady_clock::now();
		}
	}

	Resolver::Protection::safe_call([&]() {
		RuntimeOffsets::EnsureAll();
		// #region agent log — H13/H14: Unity deltaTime snapshot before game DLL ticks
		SpeedHack::LogTimingProbe("present_post_offsets");
		// #endregion
		GameState::Tick();       // resolves AppMgr/WorldMgr/LocalPtr — must be first
		HwidCapture::Tick();     // one-shot per session — calls Deca's DeviceIdHolder.GetDeviceId once IL2CPP is up, writes hwid.txt
		LocalPlayer::Tick();     // reads stats from GameState::GetLocalPtr()
		// NoclipHook installs from FeatureRuntime::ApplyOverrides (below), and only
		// while player noclip is enabled — the unconditional per-frame call that used
		// to live here re-ran a full IL2CPP metadata walk every frame and froze the game.
		SharedMemory::Tick();    // shared mapping telemetry (pos + legacy bridges still using shared memory)
		FeatureRuntime::ApplyOverrides(); // unified pipe-driven feature sync
		SkinChanger::Tick();     // writes skin when ptr changes — uses GameState
		// #region agent log
		SpeedHack::LogTimingProbe("pre_apply_timescale");
		// #endregion
		AutoAim::Tick();         // entity dict walk — uses GameState::GetWorldMgr()
		BagLooter::Tick();       // throttled bag scan + ext-goal routing
		BootGate::Tick();        // boot gating loop (runs EnsureAll + audit)
		DiagBridge::Tick();      // mirror live state to %LOCALAPPDATA%\RealmEngine\diag.json
	});

	DXGI_SWAP_CHAIN_DESC sd{};
	__this->GetDesc(&sd);

	HWND targetHwnd = sd.OutputWindow;
	if (!targetHwnd || !IsWindow(targetHwnd)) {
		targetHwnd = FindWindowA("UnityWndClass", nullptr);
	}

	if (!settings.ImGuiInitialized) {
		if (targetHwnd && IsWindow(targetHwnd)) {
			DirectX::window = targetHwnd;
			__this->GetDevice(__uuidof(ID3D11Device), (void**)&DirectX::pDevice);
			if (DirectX::pDevice) {
				DirectX::pDevice->GetImmediateContext(&DirectX::pContext);
				UpdateCachedClientSize();

				ImGui::CreateContext();
				ImGui_ImplWin32_Init(DirectX::window);
				ImGui_ImplDX11_Init(DirectX::pDevice, DirectX::pContext);

				oWndProc = (WNDPROC)SetWindowLongPtr(DirectX::window, GWLP_WNDPROC, (LONG_PTR)dWndProc);
				if (!DirectX::hRenderSemaphore) {
					DirectX::hRenderSemaphore = CreateSemaphore(nullptr, 1, 1, nullptr);
				}
				settings.ImGuiInitialized = true;
				DBG_FILE_LOG("[DirectX] ImGui initialized on hwnd=" << (void*)DirectX::window);
			}
		}
	} else if (targetHwnd && IsWindow(targetHwnd) && (!DirectX::window || !IsWindow(DirectX::window))) {
		DBG_FILE_LOG("[DirectX] Window handle migrated from " << (void*)DirectX::window << " to " << (void*)targetHwnd);
		if (DirectX::window && IsWindow(DirectX::window) && oWndProc) {
			SetWindowLongPtr(DirectX::window, GWLP_WNDPROC, (LONG_PTR)oWndProc);
		}
		DirectX::window = targetHwnd;
		oWndProc = (WNDPROC)SetWindowLongPtr(DirectX::window, GWLP_WNDPROC, (LONG_PTR)dWndProc);
		UpdateCachedClientSize();
		ImGui_ImplWin32_Shutdown();
		ImGui_ImplWin32_Init(DirectX::window);
		if (pRenderTargetView) {
			pRenderTargetView->Release();
			pRenderTargetView = nullptr;
		}
	}

	static IDXGISwapChain* s_lastSwapChain = nullptr;
	static UINT s_lastWidth = 0;
	static UINT s_lastHeight = 0;
	if (s_lastSwapChain != __this || sd.BufferDesc.Width != s_lastWidth || sd.BufferDesc.Height != s_lastHeight) {
		s_lastSwapChain = __this;
		s_lastWidth = sd.BufferDesc.Width;
		s_lastHeight = sd.BufferDesc.Height;
		if (pRenderTargetView) {
			pRenderTargetView->Release();
			pRenderTargetView = nullptr;
		}
	}

	if (settings.ImGuiInitialized && DirectX::hRenderSemaphore && WaitForSingleObject(DirectX::hRenderSemaphore, 0) == WAIT_OBJECT_0) {
		ID3D11Device* curDevice = nullptr;
		if (SUCCEEDED(__this->GetDevice(__uuidof(ID3D11Device), (void**)&curDevice)) && curDevice) {
			if (!DirectX::pDevice || DirectX::pDevice != curDevice) {
				DBG_FILE_LOG("[DirectX] Device migrated from " << (void*)DirectX::pDevice << " to " << (void*)curDevice);
				if (pRenderTargetView) { pRenderTargetView->Release(); pRenderTargetView = nullptr; }
				if (DirectX::pContext) { DirectX::pContext->Release(); DirectX::pContext = nullptr; }
				if (DirectX::pDevice) {
					ImGui_ImplDX11_Shutdown();
					DirectX::pDevice->Release();
					DirectX::pDevice = nullptr;
				}

				DirectX::pDevice = curDevice;
				DirectX::pDevice->GetImmediateContext(&DirectX::pContext);
				ImGui_ImplDX11_Init(DirectX::pDevice, DirectX::pContext);
			} else {
				curDevice->Release();
			}
		}

		if (!pRenderTargetView && DirectX::pDevice) {
			ID3D11Texture2D* pBackBuffer = nullptr;
			if (SUCCEEDED(__this->GetBuffer(0, __uuidof(ID3D11Texture2D), (void**)&pBackBuffer)) && pBackBuffer) {
				DirectX::pDevice->CreateRenderTargetView(pBackBuffer, nullptr, &pRenderTargetView);
				pBackBuffer->Release();
			}
		}

		if (!pRenderTargetView) {
			ReleaseSemaphore(DirectX::hRenderSemaphore, 1, nullptr);
			return oPresent(__this, SyncInterval, Flags);
		}

		ImGui_ImplDX11_NewFrame();
		ImGui_ImplWin32_NewFrame();

		// Ensure valid DisplaySize even if window rect temporarily reports 0 during scene transitions
		ImGuiIO& io = ImGui::GetIO();
		if (io.DisplaySize.x <= 0.0f || io.DisplaySize.y <= 0.0f) {
			if (sd.BufferDesc.Width > 0 && sd.BufferDesc.Height > 0) {
				io.DisplaySize = ImVec2(static_cast<float>(sd.BufferDesc.Width), static_cast<float>(sd.BufferDesc.Height));
			} else if (s_cachedScreenW > 0.f && s_cachedScreenH > 0.f) {
				io.DisplaySize = ImVec2(s_cachedScreenW, s_cachedScreenH);
			} else {
				io.DisplaySize = ImVec2(1280.f, 800.f);
			}
		}

		ImGui::NewFrame();

		ImGui::GetIO().MouseDrawCursor = settings.bShowMenu;

		// Toggle menu on multiple standard keybinds (Tab, Insert, F1, F11, ~).
		if (KeyBinds::IsKeyPressed(settings.KeyBinds.Toggle_Menu) ||
		    KeyBinds::IsKeyPressed(VK_INSERT) ||
		    KeyBinds::IsKeyPressed(VK_F1) ||
		    KeyBinds::IsKeyPressed(VK_F11) ||
		    KeyBinds::IsKeyPressed(0xC0)) {
			settings.bShowMenu = !settings.bShowMenu;
		}

		// Run per-frame logic safely.
		Resolver::Protection::safe_call([&]() {
			TestTAB::Tick(settings.bShowMenu);
			VisualsTAB::Tick(settings.bShowMenu);
			CombatTAB::Tick(settings.bShowMenu);
			PlayerTAB::Tick(settings.bShowMenu);
		});
		DrawFpsOverlayTopCameraRect();

		// Persistent HUD button for touch / Steam Deck / mouse click
		{
			ImGui::SetNextWindowPos(ImVec2(10.0f, 6.0f), ImGuiCond_Always);
			ImGui::SetNextWindowBgAlpha(0.70f);
			ImGui::PushStyleVar(ImGuiStyleVar_WindowRounding, 6.0f);
			ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(6.0f, 3.0f));
			if (ImGui::Begin("##RealmEngineHUD", nullptr,
				ImGuiWindowFlags_NoTitleBar | ImGuiWindowFlags_NoResize |
				ImGuiWindowFlags_NoMove | ImGuiWindowFlags_AlwaysAutoResize |
				ImGuiWindowFlags_NoSavedSettings | ImGuiWindowFlags_NoFocusOnAppearing)) {

				const char* hudText = settings.bShowMenu ? "⚡ Close Menu" : "⚡ Realm Engine (TAB)";
				ImGui::PushStyleColor(ImGuiCol_Button, settings.bShowMenu ? ImVec4(0.15f, 0.45f, 0.35f, 0.85f) : ImVec4(0.18f, 0.22f, 0.28f, 0.85f));
				ImGui::PushStyleColor(ImGuiCol_ButtonHovered, ImVec4(0.25f, 0.65f, 0.50f, 1.0f));
				ImGui::PushStyleColor(ImGuiCol_Text, ImVec4(0.95f, 0.95f, 1.0f, 1.0f));
				if (ImGui::Button(hudText)) {
					settings.bShowMenu = !settings.bShowMenu;
				}
				ImGui::PopStyleColor(3);
				ImGui::SameLine();
				ImGui::TextColored(ImVec4(0.55f, 0.95f, 0.65f, 0.95f), "%.0f FPS", ImGui::GetIO().Framerate);
			}
			ImGui::End();
			ImGui::PopStyleVar(2);
		}

		// Render menu when open.
		if (settings.bShowMenu) {
			// Menu layout — two stacked windows anchored to the top-left of the
			// game surface. Dimensions clamp to the active display size so they
			// fit cleanly on smaller screens (e.g. 800p / Steam Deck / 720p).
			const float kMenuBarWidth   = (std::min)(1000.0f, io.DisplaySize.x);
			constexpr float kMenuBarHeight  =   36.0f;
			const float kMenuContentW   = (std::min)(420.0f, io.DisplaySize.x);
			const float kMenuContentH   = (std::min)(560.0f, (std::max)(200.0f, io.DisplaySize.y - kMenuBarHeight));

			ImGui::SetNextWindowSize(ImVec2(kMenuBarWidth, kMenuBarHeight), ImGuiCond_Always);
			ImGui::SetNextWindowPos(ImVec2(0, 0), ImGuiCond_Always);
			ImGui::Begin("##MenuBar", nullptr,
				ImGuiWindowFlags_NoTitleBar | ImGuiWindowFlags_NoResize |
				ImGuiWindowFlags_NoMove | ImGuiWindowFlags_NoScrollbar |
				ImGuiWindowFlags_NoSavedSettings);

			// Tab bar — the order here is the single source of truth for the
			// tab index used in the switch below. Keep the two in lockstep.
			static int s_tab = 0;
			const char* tabs[] = { "World", "Camera", "Player", "Combat", "Visuals", "Test" };
			for (int i = 0; i < IM_ARRAYSIZE(tabs); i++) {
				if (i > 0) ImGui::SameLine();
				if (ImGui::Button(tabs[i])) s_tab = i;
			}
			ImGui::End();

			ImGui::SetNextWindowSize(ImVec2(kMenuContentW, kMenuContentH), ImGuiCond_Always);
			ImGui::SetNextWindowPos(ImVec2(0, kMenuBarHeight), ImGuiCond_Always);
			ImGui::Begin("##MenuContent", nullptr,
				ImGuiWindowFlags_NoTitleBar | ImGuiWindowFlags_NoResize |
				ImGuiWindowFlags_NoMove | ImGuiWindowFlags_NoSavedSettings);
			switch (s_tab) {
				case 0: WorldTAB::Render();   break;
				case 1: CameraTAB::Render();  break;
				case 2: PlayerTAB::Render();  break;
				case 3: CombatTAB::Render();  break;
				case 4: VisualsTAB::Render(); break;
				case 5: TestTAB::Render();    break;
			}
			ImGui::End();
		}

		ChatToast::Render();

		ImGui::Render();
		DirectX::pContext->OMSetRenderTargets(1, &pRenderTargetView, nullptr);
		ImGui_ImplDX11_RenderDrawData(ImGui::GetDrawData());
		ReleaseSemaphore(DirectX::hRenderSemaphore, 1, nullptr);
	}
	return oPresent(__this, SyncInterval, Flags);
}

void DirectX::Shutdown() {
	g_unloading = true;

	if (DirectX::hRenderSemaphore) {
		WaitForSingleObject(DirectX::hRenderSemaphore, 5000);

		if (oWndProc && DirectX::window)
			SetWindowLongPtr(DirectX::window, GWLP_WNDPROC, (LONG_PTR)oWndProc);
		oWndProc = nullptr;

		if (mouseCache.hasCached)
			DirectX::ApplyMouseState(mouseCache.wasVisible, mouseCache.wasLockState);

		settings.ImGuiInitialized = false;
		ImGui_ImplDX11_Shutdown();
		ImGui_ImplWin32_Shutdown();
		ImGui::DestroyContext();

		if (pRenderTargetView) { pRenderTargetView->Release(); pRenderTargetView = nullptr; }
		if (DirectX::pContext)  { DirectX::pContext->Release();  DirectX::pContext = nullptr; }
		if (DirectX::pDevice)   { DirectX::pDevice->Release();   DirectX::pDevice = nullptr; }

		CloseHandle(DirectX::hRenderSemaphore);
		DirectX::hRenderSemaphore = nullptr;
	}

	DirectX::window = nullptr;
}

void DirectX::CacheCurrentMouseState()
{
	Resolver::Protection::safe_call([&]() {
		Il2CppClass* cursorClass = Resolver::FindClass("UnityEngine", "Cursor");
		if (!cursorClass) return;

		const MethodInfo* getVis = il2cpp_class_get_method_from_name(cursorClass, "get_visible", 0);
		const MethodInfo* getLock = il2cpp_class_get_method_from_name(cursorClass, "get_lockState", 0);

		if (getVis && getLock) {
			Il2CppObject* visObj = il2cpp_runtime_invoke(getVis, nullptr, nullptr, nullptr);
			Il2CppObject* lockObj = il2cpp_runtime_invoke(getLock, nullptr, nullptr, nullptr);

			if (visObj) mouseCache.wasVisible = *static_cast<bool*>(il2cpp_object_unbox(visObj));
			if (lockObj) mouseCache.wasLockState = *static_cast<int*>(il2cpp_object_unbox(lockObj));

			mouseCache.hasCached = true;
		}
		});
}

void DirectX::ApplyMouseState(bool visible, int lockState)
{
	Resolver::Protection::safe_call([&]() {
		Il2CppClass* cursorClass = Resolver::FindClass("UnityEngine", "Cursor");
		if (!cursorClass) return;

		const MethodInfo* setVis = il2cpp_class_get_method_from_name(cursorClass, "set_visible", 1);

		const MethodInfo* setLock = il2cpp_class_get_method_from_name(cursorClass, "set_lockState", 1);

		if (setVis && setLock) {
			void* pVis[] = { &visible };
			void* pLock[] = { &lockState };

			il2cpp_runtime_invoke(setLock, nullptr, pLock, nullptr);
			il2cpp_runtime_invoke(setVis, nullptr, pVis, nullptr);
		}
		});
}

