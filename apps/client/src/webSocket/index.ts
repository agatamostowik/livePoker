import _ from "lodash";
import { io } from "socket.io-client";
import { setIsWebSocketConnected } from "../redux/slices/app";
import { store } from "../redux/store";
import { Room } from "../redux/RTK";
import {
  Round,
  addCommonCards,
  addDealerCards,
  addPlayerCards,
  setRound,
} from "../redux/slices/round";
import { Game, setGame } from "../redux/slices/game";
import { appendRoom } from "../redux/slices/rooms";

export const webSocketClient = io("ws://localhost:3001");

webSocketClient.on("HANDSHAKE", () => {
  store.dispatch(setIsWebSocketConnected(true));
});

webSocketClient.on("roomCreated", async (room: Room) => {
  store.dispatch(appendRoom(room));
});

webSocketClient.on("gameStarted", async (game: Game) => {
  store.dispatch(setGame(game));
});

webSocketClient.on("bettingStarted", async (round: Round) => {
  store.dispatch(setRound(round));
});

webSocketClient.on("bettingStopped", (round: Round) => {
  store.dispatch(setRound(round));
});

webSocketClient.on("madeAnteBet", (round: Round) => {
  store.dispatch(setRound(round));
});

webSocketClient.on("playDealerCard", (card: string) => {
  store.dispatch(addDealerCards(card));
});

webSocketClient.on("playCommonCard", (card: string) => {
  store.dispatch(addCommonCards(card));
});

webSocketClient.on("playPlayerCard", (card: string) => {
  store.dispatch(addPlayerCards(card));
});

webSocketClient.on("finishedPlayBet", (round: Round) => {
  store.dispatch(setRound(round));
});
