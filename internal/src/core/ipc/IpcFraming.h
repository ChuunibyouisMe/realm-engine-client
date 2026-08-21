// Purpose: length-prefixed named-pipe message framing for IPC JSON payloads.

// Helpful notes:
// - WriteMessage expects len to be the exact payload byte count.
// - ReadMessage writes a null terminator after the payload for downstream
//   string-based JSON helpers, but the terminator is not part of the frame.

#pragma once
#include <winsock2.h>
#include <windows.h>
#include <cstdint>

enum class TransportKind {
    None,
    NamedPipe,
    TcpSocket
};

struct IpcTransport {
    TransportKind kind = TransportKind::None;
    HANDLE hPipe = INVALID_HANDLE_VALUE;
    SOCKET sock = INVALID_SOCKET;

    bool IsValid() const {
        if (kind == TransportKind::NamedPipe) return hPipe != INVALID_HANDLE_VALUE;
        if (kind == TransportKind::TcpSocket) return sock != INVALID_SOCKET;
        return false;
    }

    void Close() {
        if (kind == TransportKind::NamedPipe && hPipe != INVALID_HANDLE_VALUE) {
            CloseHandle(hPipe);
            hPipe = INVALID_HANDLE_VALUE;
        } else if (kind == TransportKind::TcpSocket && sock != INVALID_SOCKET) {
            closesocket(sock);
            sock = INVALID_SOCKET;
        }
        kind = TransportKind::None;
    }
};

namespace IpcFraming {

bool WriteMessage(const IpcTransport& transport, const char* json, int len);
int ReadMessage(const IpcTransport& transport, char* buf, int bufSize);

bool WriteMessage(HANDLE hPipe, const char* json, int len);
int ReadMessage(HANDLE hPipe, char* buf, int bufSize);
void ResetState();

} // namespace IpcFraming
