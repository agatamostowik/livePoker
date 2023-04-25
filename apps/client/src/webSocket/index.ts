import { io } from "socket.io-client";
import {
  Game,
  Round,
  addCommonCards,
  addDealerCards,
  addPlayerCards,
  setIsWebSocketConnected,
} from "../redux/slices/app";
import _ from "lodash";
import { store } from "../redux/store";
import { GameApi, Room } from "../redux/RTK";

export const webSocketClient = io("ws://localhost:3001");

webSocketClient.on("HANDSHAKE", () => {
  store.dispatch(setIsWebSocketConnected(true));
});

webSocketClient.on("roomCreated", async () => {
  store.dispatch(GameApi.endpoints.getRooms.initiate()).refetch();
});

webSocketClient.on("gameStarted", async (roomId: string) => {
  store.dispatch(GameApi.endpoints.getGameByRoomId.initiate(roomId)).refetch();
});

webSocketClient.on("bettingStarted", async (gameId: string) => {
  store.dispatch(GameApi.endpoints.getRoundByGameId.initiate(gameId)).refetch();
});

webSocketClient.on("roomUpdated", (roomId: string) => {
  store.dispatch(GameApi.endpoints.getRoomById.initiate(roomId)).refetch();
});

webSocketClient.on("madeAnteBet", (gameId: string) => {
  const result = store
    .dispatch(GameApi.endpoints.getRoundByGameId.initiate(gameId))
    .refetch();
});

webSocketClient.on(
  "bettingStopped",
  (params: { userId: string; gameId: string }) => {
    const { userId, gameId } = params;
    store
      .dispatch(GameApi.endpoints.getRoundByGameId.initiate(gameId))
      .refetch();

    // store.dispatch(GameApi.endpoints.getUserAccount.initiate(userId)).refetch();
  }
);

webSocketClient.on("playDealerCard", (card: string) => {
  store.dispatch(addDealerCards(card));
});

webSocketClient.on("playCommonCard", (card: string) => {
  store.dispatch(addCommonCards(card));
});

webSocketClient.on("playPlayerCard", (card: string) => {
  store.dispatch(addPlayerCards(card));
});
