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
  setRoundOver,
} from "../redux/slices/round";
import { Game, setGame, setGameOver } from "../redux/slices/game";
import { appendRoom } from "../redux/slices/rooms";
import { setAccount } from "../redux/slices/auth";
import { Account } from "../redux/slices/auth";

export const webSocketClient = io("ws://localhost:3001");

webSocketClient.on("HANDSHAKE", () => {
  store.dispatch(setIsWebSocketConnected(true));
});

type Message =
  | {
      type: "ROOM_CREATED";
      payload: {
        room: Room;
      };
    }
  | {
      type: "GAME_CREATED";
      payload: {
        game: Game;
      };
    }
  | {
      type: "ROUND_CREATED";
      payload: {
        round: Round;
      };
    }
  | {
      type: "BETS_STOPED";
      payload: {
        round: Round;
        account: Account;
      };
    }
  | {
      type: "GAME_OVER";
    }
  | {
      type: "MADE_ANTE_BET";
      payload: {
        round: Round;
      };
    }
  | {
      type: "MADE_AA_BET";
      payload: {
        round: Round;
      };
    }
  | {
      type: "PLAY_DEALER_CARD";
      payload: {
        card: string;
      };
    }
  | {
      type: "PLAY_COMMON_CARD";
      payload: {
        card: string;
      };
    }
  | {
      type: "PLAY_PLAYER_CARD";
      payload: {
        card: string;
      };
    };

webSocketClient.on("MESSAGE", (message: Message) => {
  switch (message.type) {
    case "ROOM_CREATED": {
      store.dispatch(appendRoom(message.payload.room));

      break;
    }
    case "GAME_CREATED": {
      console.log(message.payload.game);
      store.dispatch(setGame(message.payload.game));

      break;
    }
    case "ROUND_CREATED": {
      store.dispatch(setRound(message.payload.round));

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
  }
});

webSocketClient.on("madeAnteBet", (round: Round) => {
  store.dispatch(setRound(round));
});

// webSocketClient.on("playDealerCard", (card: string) => {
//   store.dispatch(addDealerCards(card));
// });

// webSocketClient.on("playCommonCard", (card: string) => {
//   store.dispatch(addCommonCards(card));
// });

// webSocketClient.on("playPlayerCard", (card: string) => {
//   store.dispatch(addPlayerCards(card));
// });

webSocketClient.on("finishedPlayBet", (round: Round) => {
  store.dispatch(setRound(round));
});
