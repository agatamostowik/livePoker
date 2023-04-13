import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type State = {
  isAuthenticated: boolean;
};

const initialState: State = {
  isAuthenticated: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      return { ...state, isAuthenticated: action.payload };
    },

    reset: () => {
      return initialState;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { toggleIsAuthenticated, reset } = appSlice.actions;
