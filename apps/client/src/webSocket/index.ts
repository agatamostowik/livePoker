import { io } from "socket.io-client";
import { setIsWebSocketConnected } from "../redux/slices/app";
import { store } from "../redux/store";
import { GameApi } from "../redux/RTK";

export const webSocketClient = io("ws://localhost:3001");

webSocketClient.on("HANDSHAKE", () => {
  store.dispatch(setIsWebSocketConnected(true));
});

webSocketClient.on("ROOM_CREATED", async () => {
  const result = store.dispatch(GameApi.endpoints.getRooms.initiate());
  await result.refetch();
});
