#pragma once
#include <d3d11.h>
#include <dxgi.h>

class dx11api {
public:
    using D3D_PRESENT_FUNCTION = HRESULT(__stdcall*)(IDXGISwapChain*, UINT, UINT);
    using D3D_RESIZE_BUFFERS_FUNCTION = HRESULT(__stdcall*)(IDXGISwapChain*, UINT, UINT, UINT, DXGI_FORMAT, UINT);
    D3D_PRESENT_FUNCTION presentFunction = nullptr;
    D3D_RESIZE_BUFFERS_FUNCTION resizeBuffersFunction = nullptr;

    dx11api();
};