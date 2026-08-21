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

int ReadMessage(const IpcTransport& transport, char* buf, int bufSize)
{
    if (transport.kind == TransportKind::NamedPipe) {
        return ReadMessage(transport.hPipe, buf, bufSize);
    }
    if (transport.kind == TransportKind::TcpSocket) {
        if (transport.sock == INVALID_SOCKET) return -1;
        u_long bytesAvail = 0;
        if (ioctlsocket(transport.sock, FIONREAD, &bytesAvail) != 0) return -1;
        if (bytesAvail < 4) return 0;

        uint32_t msgLen = 0;
        int peeked = recv(transport.sock, reinterpret_cast<char*>(&msgLen), 4, MSG_PEEK);
        if (peeked != 4) return -1;
        if (msgLen == 0 || msgLen >= static_cast<uint32_t>(bufSize)) return -1;
        if (bytesAvail < 4 + msgLen) return 0; // wait for complete frame

        int readHdr = recv(transport.sock, reinterpret_cast<char*>(&msgLen), 4, 0);
        if (readHdr != 4) return -1;

        uint32_t totalRead = 0;
        while (totalRead < msgLen) {
            int n = recv(transport.sock, buf + totalRead, static_cast<int>(msgLen - totalRead), 0);
            if (n <= 0) return -1;
            totalRead += static_cast<uint32_t>(n);
        }
        buf[msgLen] = '\0';
        return static_cast<int>(msgLen);
    }
    return -1;
}

} // namespace IpcFraming
