// Purpose: implements the bridge wire framing used on the named pipe.

// Helpful notes:
// - Every JSON message is prefixed with a 32-bit byte length.
// - ReadMessage is non-blocking when fewer than four bytes are available and
//   returns 0 so the bridge loop can continue ticking heartbeats/events.
// - A negative return means disconnect, malformed length, or pipe read failure.

#include "pch-il2cpp.h"
#include "IpcFraming.h"

#include <cstdint>

namespace IpcFraming {

bool WriteMessage(HANDLE hPipe, const char* json, int len)
{
    uint32_t netLen = static_cast<uint32_t>(len);
    DWORD written = 0;
    if (!WriteFile(hPipe, &netLen, 4, &written, NULL) || written != 4) return false;
    if (!WriteFile(hPipe, json, netLen, &written, NULL) || written != netLen) return false;
    return true;
}

int ReadMessage(HANDLE hPipe, char* buf, int bufSize)
{
    DWORD bytesAvail = 0;
    if (!PeekNamedPipe(hPipe, NULL, 0, NULL, &bytesAvail, NULL)) return -1;
    if (bytesAvail < 4) return 0;
    uint32_t msgLen = 0;
    DWORD bytesRead = 0;
    if (!ReadFile(hPipe, &msgLen, 4, &bytesRead, NULL) || bytesRead != 4) return -1;
    if (msgLen == 0 || msgLen >= (uint32_t)bufSize) return -1;
    if (!ReadFile(hPipe, buf, msgLen, &bytesRead, NULL) || bytesRead != msgLen) return -1;
    buf[msgLen] = '\0';
    return (int)msgLen;
}

bool WriteMessage(const IpcTransport& transport, const char* json, int len)
{
    if (transport.kind == TransportKind::NamedPipe) {
        return WriteMessage(transport.hPipe, json, len);
    }
    if (transport.kind == TransportKind::TcpSocket) {
        if (transport.sock == INVALID_SOCKET) return false;
        uint32_t netLen = static_cast<uint32_t>(len);
        int sentHdr = send(transport.sock, reinterpret_cast<const char*>(&netLen), 4, 0);
        if (sentHdr != 4) return false;
        int remaining = len;
        const char* ptr = json;
        while (remaining > 0) {
            int n = send(transport.sock, ptr, remaining, 0);
            if (n <= 0) return false;
            ptr += n;
            remaining -= n;
        }
        return true;
    }
    return false;
}

static uint8_t s_rxBuf[131072];
static size_t s_rxLen = 0;

void ResetState()
{
    s_rxLen = 0;
}

int ReadMessage(const IpcTransport& transport, char* buf, int bufSize)
{
    if (transport.kind == TransportKind::NamedPipe) {
        return ReadMessage(transport.hPipe, buf, bufSize);
    }
    if (transport.kind == TransportKind::TcpSocket) {
        if (transport.sock == INVALID_SOCKET) return -1;

        // Drain any incoming bytes from non-blocking TCP socket into stream buffer
        char temp[4096];
        while (true) {
            int n = recv(transport.sock, temp, sizeof(temp), 0);
            if (n > 0) {
                if (s_rxLen + static_cast<size_t>(n) <= sizeof(s_rxBuf)) {
                    memcpy(s_rxBuf + s_rxLen, temp, static_cast<size_t>(n));
                    s_rxLen += static_cast<size_t>(n);
                } else {
                    // Buffer overflow safeguard
                    s_rxLen = 0;
                    return -1;
                }
            } else if (n == 0) {
                // Socket gracefully closed by remote end
                s_rxLen = 0;
                return -1;
            } else {
                int err = WSAGetLastError();
                if (err == WSAEWOULDBLOCK) {
                    break; // No more data immediately waiting in OS queue
                }
                // Fatal socket error
                s_rxLen = 0;
                return -1;
            }
        }

        if (s_rxLen < 4) return 0; // Waiting for 4-byte header

        uint32_t msgLen = 0;
        memcpy(&msgLen, s_rxBuf, 4);
        if (msgLen == 0 || msgLen >= static_cast<uint32_t>(bufSize) || msgLen > 65536) {
            s_rxLen = 0;
            return -1;
        }

        if (s_rxLen < 4 + msgLen) return 0; // Frame incomplete, wait for remaining bytes

        memcpy(buf, s_rxBuf + 4, msgLen);
        buf[msgLen] = '\0';

        size_t remaining = s_rxLen - (4 + msgLen);
        if (remaining > 0) {
            memmove(s_rxBuf, s_rxBuf + 4 + msgLen, remaining);
        }
        s_rxLen = remaining;

        return static_cast<int>(msgLen);
    }
    return -1;
}

} // namespace IpcFraming
