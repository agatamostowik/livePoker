import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Round = {
  id: string;
  created_at: string;
  aa_bet: number[];
  ante_bet: number[];
  play_bet: number;
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
type State = {
  data: Round | null;
  roundOver: boolean;
  bet: number | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: Error | null;
};

const initialState: State = {
  data: null,
  roundOver: false,
  bet: null,
  isLoading: false,
  isSuccess: false,
  error: null,
};

const roundSlice = createSlice({
  name: "round",
  initialState,
  reducers: {
    setRoundOver: (state) => {
      return { ...state, ...initialState, roundOver: true };
    },

    setRound: (state, action: PayloadAction<Round | null>) => {
      return { ...state, data: action.payload };
    },

    setIsRoundLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },

    addDealerCards: (state, action: PayloadAction<string>) => {
      state.data?.dealer_cards.push(action.payload);
    },

    addCommonCards: (state, action: PayloadAction<string>) => {
      state.data?.common_cards.push(action.payload);
    },

    addPlayerCards: (state, action: PayloadAction<string>) => {
      state.data?.player_cards.push(action.payload);
    },

    setError: (state, action: PayloadAction<Error>) => {
      return { ...state, error: action.payload };
    },

    setBet: (state, action: PayloadAction<number | null>) => {
      return { ...state, bet: action.payload };
    },
  },
});

export const roundReducer = roundSlice.reducer;
export const {
  setRoundOver,
  setBet,
  setRound,
  setIsRoundLoading,
  addPlayerCards,
  addCommonCards,
  addDealerCards,
} = roundSlice.actions;
