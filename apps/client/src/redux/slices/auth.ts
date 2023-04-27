import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

export type Account = {
  id: string;
  created_at: string;
  user_id: string;
  role: "dealer" | "player";
  balance: number;
  name: string;
};

type State = {
  user: User | null;
  account: Account | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
};

const initialState: State = {
  user: null,
  account: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      return { ...state, user: action.payload };
    },

    setAccount: (state, action: PayloadAction<Account | null>) => {
      return { ...state, account: action.payload };
    },

    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      return { ...state, isAuthenticated: action.payload };
    },

    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setIsLoading, setIsAuthenticated, setUser, setAccount } =
  authSlice.actions;
