import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Room = {
  id: string;
  created_at: string;
  name: string;
  dealer_id: string;
  stream_address: string | null; // do usunięcia
};

type State = {
  data: Room | null;
  isLoading: boolean;
  isSuccess: boolean;
};

const initialState: State = {
  data: null,
  isLoading: false,
  isSuccess: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room | null>) => {
      state.data = action.payload;
    },

    setIsRoomLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const roomReducer = roomSlice.reducer;
export const { setRoom, setIsRoomLoading } = roomSlice.actions;
