import { io } from "socket.io-client";
import {
  Game,
  Round,
  setGame,
  setRound,
  setIsWebSocketConnected,
} from "../redux/slices/app";
import { store } from "../redux/store";
import { GameApi, Room } from "../redux/RTK";

export const webSocketClient = io("ws://localhost:3001");

webSocketClient.on("HANDSHAKE", () => {
  store.dispatch(setIsWebSocketConnected(true));
});

webSocketClient.on("roomCreated", async () => {
  const result = store.dispatch(GameApi.endpoints.getRooms.initiate());
  await result.refetch();
});

webSocketClient.on("gameStarted", (data: Game) => {
  store.dispatch(setGame(data));
});

webSocketClient.on("bettingStarted", (data: Round) => {
  store.dispatch(setRound(data));
});

webSocketClient.on("roomUpdated", async (roomId: string) => {
  const result = store.dispatch(GameApi.endpoints.getRoomById.initiate(roomId));
  await result.refetch();
});
