import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Game = {
  id: string;
  created_at: string;
  room_id: string;
  player_id: string;
  dealer: string;
  game_over: boolean;
};

type State = {
  data: Game | null;
  isLoading: boolean;
  isSuccess: boolean;
};

const initialState: State = {
  data: null,
  isLoading: false,
  isSuccess: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<Game | null>) => {
      state.data = action.payload;
    },
    setIsGameLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const gameReducer = gameSlice.reducer;
export const { setGame, setIsGameLoading } = gameSlice.actions;
