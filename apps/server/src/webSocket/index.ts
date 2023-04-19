import { Server, Socket } from "socket.io";
import { supabase } from "../db";

export const webSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["https://127.0.0.1:5173", "http://localhost:5173"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.emit("HANDSHAKE");

    socket.on("CREATE_ROOM", (roomId: string) => {
      socket.join(roomId);
      socket.broadcast.emit("ROOM_CREATED");
    });

    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
    });

    socket.on("ping", (signal: string) => {
      socket.broadcast.emit("pong", signal);
    });
  });

  return io;
};
