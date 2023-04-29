import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Room } from "./room";

type State = {
  data: Room[];
  isLoading: boolean;
  isSuccess: boolean;
  error: Error | null;
};

const initialState: State = {
  data: [],
  isLoading: false,
  isSuccess: false,
  error: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      return { ...state, data: action.payload };
    },

    appendRoom: (state, action: PayloadAction<Room>) => {
      return { ...state, data: [...state.data, action.payload] };
    },

    setIsRoomsLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },

    setError: (state, action: PayloadAction<Error | null>) => {
      return { ...state, error: action.payload };
    },
  },
});

export const roomsReducer = roomsSlice.reducer;
export const { setError, setRooms, appendRoom, setIsRoomsLoading } =
  roomsSlice.actions;
