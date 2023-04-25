import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import { Socket } from "socket.io-client";
import { webSocketClient } from "../../webSocket";

export type Room = {
  id: string;
  created_at: string;
  name: string;
  dealer_id: string;
  stream_address: string | null; // do usunięcia
};

export type Game = {
  id: string;
  created_at: string;
  room_id: string;
  player_id: string;
  dealer: string;
  game_over: boolean;
};

export type Round = {
  id: string;
  created_at: string;
  aa_bet: number;
  ante_bet: number;
  game_id: string;
  room_id: string;
  is_active: boolean;
  player_id: string;
  bets_over: boolean;
  cards: string[];
  dealer_cards: string[];
  player_cards: string[];
  common_cards: string[];
};

export type State = {
  user: User | null;
  webSocketClient: Socket;
  mediaStream: MediaStream | null;
  isWebSocketConnected: boolean;
  videoIsPlaying: boolean;
  room: Room | null;
  round: Round | null;
  game: Game | null;
  roundBet: {
    AABet: number[];
    AnteBet: number[];
  };
  // dealerCards: string[];
  // commonCards: string[];
  // playerCards: string[];
};

const initialState: State = {
  user: null,
  webSocketClient: webSocketClient,
  mediaStream: null,
  isWebSocketConnected: false,
  videoIsPlaying: false,
  room: null,
  game: null,
  round: null,
  roundBet: {
    AABet: [],
    AnteBet: [],
  },
  // dealerCards: [],
  // commonCards: [],
  // playerCards: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      return { ...state, user: action.payload };
    },

    setIsWebSocketConnected: (state, action: PayloadAction<boolean>) => {
      return { ...state, isWebSocketConnected: action.payload };
    },

    setVideoIsPlaying: (state, action: PayloadAction<boolean>) => {
      return { ...state, videoIsPlaying: action.payload };
    },

    setMediaStream: (state, action: PayloadAction<MediaStream | null>) => {
      return { ...state, mediaStream: action.payload };
    },

    setAABet: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        roundBet: {
          ...state.roundBet,
          AABet: [...state.roundBet.AABet, action.payload],
        },
      };
    },
    setAnteBet: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        roundBet: {
          ...state.roundBet,
          AnteBet: [...state.roundBet.AnteBet, action.payload],
        },
      };
    },

    addDealerCards: (state, action: PayloadAction<string>) => {
      state.round?.dealer_cards.push(action.payload);
    },

    addCommonCards: (state, action: PayloadAction<string>) => {
      state.round?.common_cards.push(action.payload);
    },

    addPlayerCards: (state, action: PayloadAction<string>) => {
      state.round?.player_cards.push(action.payload);
    },

    setRound: (state, action: PayloadAction<Round>) => {
      return {
        ...state,
        round: action.payload,
      };
    },

    setRoom: (state, action: PayloadAction<Room>) => {
      return {
        ...state,
        room: action.payload,
      };
    },

    setGame: (state, action: PayloadAction<Game>) => {
      return {
        ...state,
        game: action.payload,
      };
    },

    reset: () => {
      return initialState;
    },
  },
});

export const appReducer = appSlice.reducer;
export const {
  setRoom,
  setGame,
  setRound,
  addPlayerCards,
  addCommonCards,
  addDealerCards,
  setMediaStream,
  setVideoIsPlaying,
  setUser,
  setIsWebSocketConnected,
  setAABet,
  setAnteBet,
  reset,
} = appSlice.actions;
