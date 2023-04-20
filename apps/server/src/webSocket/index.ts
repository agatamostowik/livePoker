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

    socket.on("ping", (signal: string) => {
      socket.broadcast.emit("pong", signal);
    });

    socket.on("createRoom", async (params) => {
      const { data, error } = await supabase
        .from("rooms")
        .insert([{ name: params.name, dealer_id: params.dealer_id }])
        .select("*");

      if (data) {
        socket.emit("roomCreated");
        socket.broadcast.emit("roomCreated");
      }
    });

    socket.on("updateRoom", async (params) => {
      const { data } = await supabase
        .from("rooms")
        .update({
          stream_address: params.streamAddress,
        })
        .eq("id", params.roomId)
        .select("*");

      if (data) {
        const roomId = data[0].id;

        socket.emit("roomUpdated", roomId);
        socket.broadcast.emit("roomUpdated", roomId);
      }
    });

    socket.on("startGame", async (params) => {
      const { data } = await supabase
        .from("games")
        .insert([
          {
            room_id: params.roomId,
            player_id: params.playerId,
            dealer_id: params.dealerId,
            game_over: false,
          },
        ])
        .select("*");

      if (data) {
        socket.emit("gameStarted", data[0]);
        socket.broadcast.emit("gameStarted", data[0]);
      }
    });

    socket.on("startBetting", async (params) => {
      const { data, error } = await supabase
        .from("rounds")
        .insert([
          {
            room_id: params.roomId,
            player_id: params.playerId,
            game_id: params.gameId,
          },
        ])
        .select("*");

      if (data) {
        socket.emit("bettingStarted", data[0]);
        socket.broadcast.emit("bettingStarted", data[0]);
      }
    });
  });

  return io;
};
