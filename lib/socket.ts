import io from "socket.io-client";
import type { Socket } from "socket.io-client";
let socket: Socket;

export function initializeSocket(auth_id: string) {
  if (!process.env.NEXT_PUBLIC_SOCKET_URL) {
    throw new Error("No Socket URL provided");
  }
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
      query: { auth_id },
    });
  }
  return socket;
}

export function getSocket() {
  if (!socket) {
    throw new Error("Socket is not yet initialize");
  }
  return socket;
}
