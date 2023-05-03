import { Round } from "../redux/slices/round";
import { Game } from "../redux/slices/game";
import { Account } from "../redux/slices/auth";
import { Room } from "../redux/slices/room";

type ROOM_CREATED = {
  type: "ROOM_CREATED";
  payload: {
    room: Room;
  };
};

type GAME_CREATED = {
  type: "GAME_CREATED";
  payload: {
    game: Game;
  };
};

type ROUND_CREATED = {
  type: "ROUND_CREATED";
  payload: {
    round: Round;
  };
};

type BETS_STOPED = {
  type: "BETS_STOPED";
  payload: {
    round: Round;
    account: Account;
  };
};

type GAME_OVER = {
  type: "GAME_OVER";
};

type MADE_ANTE_BET = {
  type: "MADE_ANTE_BET";
  payload: {
    round: Round;
  };
};

type MADE_AA_BET = {
  type: "MADE_AA_BET";
  payload: {
    round: Round;
  };
};

type PLAY_DEALER_CARD = {
  type: "PLAY_DEALER_CARD";
  payload: {
    card: string;
  };
};

type PLAY_COMMON_CARD = {
  type: "PLAY_COMMON_CARD";
  payload: {
    card: string;
  };
};

type PLAY_PLAYER_CARD = {
  type: "PLAY_PLAYER_CARD";
  payload: {
    card: string;
  };
};

type MADE_PLAY_BET = {
  type: "MADE_PLAY_BET";
  payload: {
    round: Round;
  };
};

type ROUND_OVER = {
  type: "ROUND_OVER";
  payload: {
    round: Round;
    account: Account;
    winner: string;
    winner_hand: string;
  };
};

export type Message =
  | ROOM_CREATED
  | GAME_CREATED
  | ROUND_CREATED
  | BETS_STOPED
  | GAME_OVER
  | MADE_ANTE_BET
  | MADE_AA_BET
  | PLAY_DEALER_CARD
  | PLAY_COMMON_CARD
  | PLAY_PLAYER_CARD
  | MADE_PLAY_BET
  | ROUND_OVER;
