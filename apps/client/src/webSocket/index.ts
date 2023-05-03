import _ from "lodash";
import { io } from "socket.io-client";
import { setIsWebSocketConnected } from "../redux/slices/app";
import { store } from "../redux/store";
import {
  addCommonCards,
  addDealerCards,
  addPlayerCards,
  setRound,
  setRoundOver,
  setWinner,
} from "../redux/slices/round";
import { setGame, setGameOver } from "../redux/slices/game";
import { appendRoom } from "../redux/slices/rooms";
import { setAccount } from "../redux/slices/auth";
import { Message } from "./types";

const url =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "ws://localhost:3001"
    : "ws://livepokerbe-production.up.railway.app";

export const webSocketClient = io("ws://livepokerbe-production.up.railway.app");

webSocketClient.on("HANDSHAKE", () => {
  store.dispatch(setIsWebSocketConnected(true));
});

webSocketClient.on("MESSAGE", (message: Message) => {
  switch (message.type) {
    case "ROOM_CREATED": {
      store.dispatch(appendRoom(message.payload.room));

      break;
    }
    case "GAME_CREATED": {
      store.dispatch(setGame(message.payload.game));

      break;
    }
    case "ROUND_CREATED": {
      store.dispatch(setRound(message.payload.round));
      store.dispatch(
        setWinner({
          winner: null,
          winnerHand: null,
        })
      );

      break;
    }
    case "BETS_STOPED": {
      store.dispatch(setRound(message.payload.round));

      if (
        message.payload.account &&
        store.getState().auth.account?.role === "player"
      ) {
        store.dispatch(setAccount(message.payload.account));
      }

      break;
    }
    case "GAME_OVER": {
      store.dispatch(setGameOver());
      store.dispatch(setRoundOver());

      break;
    }
    case "MADE_ANTE_BET": {
      store.dispatch(setRound(message.payload.round));

      break;
    }
    case "MADE_AA_BET": {
      store.dispatch(setRound(message.payload.round));

      break;
    }
    case "PLAY_DEALER_CARD": {
      store.dispatch(addDealerCards(message.payload.card));

      break;
    }
    case "PLAY_COMMON_CARD": {
      store.dispatch(addCommonCards(message.payload.card));

      break;
    }
    case "PLAY_PLAYER_CARD": {
      store.dispatch(addPlayerCards(message.payload.card));

      break;
    }
    case "MADE_PLAY_BET": {
      store.dispatch(setRound(message.payload.round));

      break;
    }
    case "ROUND_OVER": {
      store.dispatch(setRound(message.payload.round));

      if (
        message.payload.account &&
        store.getState().auth.account?.role === "player"
      ) {
        store.dispatch(setAccount(message.payload.account));
      }

      store.dispatch(
        setWinner({
          winner: message.payload.winner,
          winnerHand: message.payload.winner_hand,
        })
      );
      break;
    }
  }
});
