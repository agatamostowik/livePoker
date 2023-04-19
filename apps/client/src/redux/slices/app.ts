import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";
import { Socket } from "socket.io-client";
import { webSocketClient } from "../../webSocket";

export type State = {
  user: User | null;
  webSocketClient: Socket;
  isWebSocketConnected: boolean;
};

const initialState: State = {
  user: null,
  webSocketClient: webSocketClient,
  isWebSocketConnected: false,
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

    reset: () => {
      return initialState;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { setUser, setIsWebSocketConnected, reset } = appSlice.actions;
