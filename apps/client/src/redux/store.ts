import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { appReducer } from "./slices/app";
import { GameApi } from "./RTK";
import { gameReducer } from "./slices/game";
import { roomReducer } from "./slices/room";
import { roundReducer } from "./slices/round";
import { roomsReducer } from "./slices/rooms";
import { authReducer } from "./slices/auth";

export const store = configureStore({
  reducer: {
    // Client State
    app: appReducer,
    auth: authReducer,
    room: roomReducer,
    rooms: roomsReducer,
    game: gameReducer,
    round: roundReducer,
    // Server State
    [GameApi.reducerPath]: GameApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(GameApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
