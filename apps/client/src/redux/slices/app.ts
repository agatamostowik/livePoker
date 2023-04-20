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
  game: Game | null;
  round: Round | null;
  videoIsPlaying: boolean;
};

const initialState: State = {
  user: null,
  webSocketClient: webSocketClient,
  mediaStream: null,
  isWebSocketConnected: false,
  game: null,
  round: null,
  videoIsPlaying: false,
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

    setGame: (state, action: PayloadAction<Game>) => {
      return { ...state, game: action.payload };
    },
    setRound: (state, action: PayloadAction<Round>) => {
      return { ...state, round: action.payload };
    },

    setVideoIsPlaying: (state, action: PayloadAction<boolean>) => {
      return { ...state, videoIsPlaying: action.payload };
    },

    setMediaStream: (state, action: PayloadAction<MediaStream>) => {
      return { ...state, mediaStream: action.payload };
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
  setRound,
  setGame,
  setUser,
  setIsWebSocketConnected,
  reset,
} = appSlice.actions;
