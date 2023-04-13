import { Server, Socket } from "socket.io";

export const webSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    maxHttpBufferSize: 1e8,
    pingInterval: 1000,
    pingTimeout: 1000,
    upgradeTimeout: 1000,
    cors: {
      origin: "http://127.0.0.1:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(socket);
    socket.on("signal", (data) => {
      socket.broadcast.emit("signal", data);
    });
  });
};
