import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { appReducer } from "./slices/app";
import { gameReducer } from "./slices/game";
import { roomReducer } from "./slices/room";
import { roundReducer } from "./slices/round";
import { roomsReducer } from "./slices/rooms";
import { authReducer } from "./slices/auth";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    room: roomReducer,
    rooms: roomsReducer,
    game: gameReducer,
    round: roundReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
