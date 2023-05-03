import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Round = {
  aa_bet: number[];
  ante_bet: number[];
  cards: string[];
  common_cards: string[];
  created_at: string;
  dealer_cards: string[];
  dealer_id: string;
  game_id: string;
  id: string;
  play_bet: number;
  player_cards: string[];
  player_id: string;
  room_id: string;
  round_over: boolean;
  bets_over: boolean;
};
type State = {
  bet: number | null;
  data: Round | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  roundOver: boolean;
  winnerHand: string | null;
  winner: string | null;
};

const initialState: State = {
  bet: null,
  data: null,
  error: null,
  isLoading: false,
  isSuccess: false,
  roundOver: false,
  winnerHand: null,
  winner: null,
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
    setWinner: (
      state,
      action: PayloadAction<{
        winner: string | null;
        winnerHand: string | null;
      }>
    ) => {
      return {
        ...state,
        winner: action.payload.winner,
        winnerHand: action.payload.winnerHand,
      };
    },
  },
});

export const roundReducer = roundSlice.reducer;
export const {
  addCommonCards,
  addDealerCards,
  addPlayerCards,
  setBet,
  setIsRoundLoading,
  setRound,
  setRoundOver,
  setWinner,
} = roundSlice.actions;
