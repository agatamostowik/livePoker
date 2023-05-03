type CREATE_ROOM = {
  type: "CREATE_ROOM";
  payload: {
    name: string;
    dealerId: string;
  };
};

type CREATE_GAME = {
  type: "CREATE_GAME";
  payload: {
    roomId: string;
    dealerId: string;
    playerId: string;
  };
};

type CREATE_ROUND = {
  type: "CREATE_ROUND";
  payload: {
    roomId: string;
    playerId: string;
    gameId: string;
  };
};

type STOP_BETS = {
  type: "STOP_BETS";
  payload: {
    roundId: string;
    playerId: string;
    gameId: string;
  };
};

type ANTE_BET = {
  type: "ANTE_BET";
  payload: {
    roundId: string;
    bet: number;
  };
};

type AA_BET = {
  type: "AA_BET";
  payload: {
    roundId: string;
    bet: number;
  };
};

type PLAY_FLOP_CARDS = {
  type: "PLAY_FLOP_CARDS";
  payload: {
    roundId: string;
  };
};

type PLAY_TURN_RIVER_CARDS = {
  type: "PLAY_TURN_RIVER_CARDS";
  payload: {
    roundId: string;
  };
};

type PLAY_BET = {
  type: "PLAY_BET";
  payload: {
    roundId: string;
  };
};

type FOLD = {
  type: "FOLD";
  payload: {
    gameId: string;
    roundId: string;
  };
};

type EVALUATE_HANDS = {
  type: "EVALUATE_HANDS";
  payload: {
    roundId: string;
    playerId: string;
  };
};

export type Message =
  | CREATE_ROOM
  | CREATE_GAME
  | CREATE_ROUND
  | STOP_BETS
  | ANTE_BET
  | AA_BET
  | PLAY_FLOP_CARDS
  | PLAY_TURN_RIVER_CARDS
  | PLAY_BET
  | FOLD
  | EVALUATE_HANDS;
