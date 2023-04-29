import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { webSocketClient } from "../../webSocket";

export type State = {
  webSocketClient: Socket;
  mediaStream: MediaStream | null;
  isWebSocketConnected: boolean;
  isPlayerConnected: boolean;
  videoIsPlaying: boolean;
};

const initialState: State = {
  webSocketClient: webSocketClient,
  mediaStream: null,
  isWebSocketConnected: false,
  isPlayerConnected: false,
  videoIsPlaying: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsWebSocketConnected: (state, action: PayloadAction<boolean>) => {
      return { ...state, isWebSocketConnected: action.payload };
    },

    setVideoIsPlaying: (state, action: PayloadAction<boolean>) => {
      return { ...state, videoIsPlaying: action.payload };
    },

    setMediaStream: (state, action: PayloadAction<MediaStream | null>) => {
      return { ...state, mediaStream: action.payload };
    },

    setIsPlayerConnected: (state, action: PayloadAction<boolean>) => {
      return { ...state, isPlayerConnected: action.payload };
    },

    reset: () => {
      return initialState;
    },
  },
});

export const appReducer = appSlice.reducer;
export const {
  setIsPlayerConnected,
  setMediaStream,
  setVideoIsPlaying,
  setIsWebSocketConnected,
  reset,
} = appSlice.actions;
