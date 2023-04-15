import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";
import { Socket } from "socket.io-client";

export type State = {
  user: User | null;
  session: Session | null;
  webSocket: Socket | null;
};

const initialState: State = {
  user: null,
  session: null,
  webSocket: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    authorize: (
      state,
      action: PayloadAction<{ user: User; session: Session }>
    ) => {
      return {
        ...state,
        user: action.payload.user,
        session: action.payload.session,
      };
    },
    setUser: (state, action: PayloadAction<any | null>) => {
      return { ...state, user: action.payload };
    },

    setSession: (state, action: PayloadAction<Session | null>) => {
      return { ...state, session: action.payload };
    },

    setWebSocket: (state, action: PayloadAction<Socket | null>) => {
      return { ...state, webSocket: action.payload };
    },

    reset: () => {
      return initialState;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { authorize, setUser, setSession, reset } = appSlice.actions;
