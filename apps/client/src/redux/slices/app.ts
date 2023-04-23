import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import { Socket } from "socket.io-client";
import { webSocketClient } from "../../webSocket";
import SimplePeer from "simple-peer";

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
  isActive: boolean;
  player_id: string;
};

export type State = {
  user: User | null;
  webSocketClient: Socket;
  mediaStream: MediaStream | null;
  isWebSocketConnected: boolean;
  videoIsPlaying: boolean;
  roundBet: {
    AABet: number[];
    AnteBet: number[];
  };
};

const initialState: State = {
  user: null,
  webSocketClient: webSocketClient,
  mediaStream: null,
  isWebSocketConnected: false,
  videoIsPlaying: false,
  roundBet: {
    AABet: [],
    AnteBet: [],
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
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

    reset: () => {
      return initialState;
    },
  },
});

export const appReducer = appSlice.reducer;
export const {
  setMediaStream,
  setVideoIsPlaying,
  setUser,
  setIsWebSocketConnected,
  setAABet,
  setAnteBet,
  reset,
} = appSlice.actions;
