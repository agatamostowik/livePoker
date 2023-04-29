import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Game = {
  id: string;
  created_at: string;
  room_id: string;
  player_id: string;
  dealer: string;
  game_over: boolean;
  dealer_id: string;
};

type State = {
  data: Game | null;
  gameOver: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};

const initialState: State = {
  data: null,
  gameOver: false,
  isLoading: false,
  isSuccess: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameOver: (state) => {
      return { ...state, ...initialState, gameOver: true };
    },

    setGame: (state, action: PayloadAction<Game | null>) => {
      return { ...state, data: action.payload };
    },
    setIsGameLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const gameReducer = gameSlice.reducer;
export const { setGameOver, setGame, setIsGameLoading } = gameSlice.actions;
