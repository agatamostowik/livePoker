import { io } from "socket.io-client";
import { Game, Round, setIsWebSocketConnected } from "../redux/slices/app";
import _ from "lodash";
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

webSocketClient.on("gameStarted", async (roomId: string) => {
  const result = store.dispatch(
    GameApi.endpoints.getGameByRoomId.initiate(roomId)
  );
  await result.refetch();
});

webSocketClient.on("bettingStarted", async (gameId: string) => {
  const result = store.dispatch(
    GameApi.endpoints.getRoundByGameId.initiate(gameId)
  );

  await result.refetch();
});

webSocketClient.on("roomUpdated", async (roomId: string) => {
  const result = store.dispatch(GameApi.endpoints.getRoomById.initiate(roomId));
  await result.refetch();
});

webSocketClient.on(
  "bettingStoped",
  async (params: { roomId: string; gameId: string; roundId: string }) => {
    const state = store.getState();

    const result = store.dispatch(
      GameApi.endpoints.makePlayerBets.initiate({
        roundId: params.roundId,
        AABet: _.sum(state.app.roundBet.AABet),
        AnteBet: _.sum(state.app.roundBet.AnteBet),
      })
    );
  }
);
