import io, { Socket } from "socket.io-client";

let socket: Socket;
if (!process.env.NEXT_PUBLIC_SOCKET_URL) {
  throw new Error("No Socket URL provided");
}
socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  transports: ["websocket"],
});

export default socket;
