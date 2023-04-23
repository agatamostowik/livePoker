import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import SimplePeer from "simple-peer";

type Response = {
  id: string;
  name: string;
  dealer: string;
  players: number;
  blinds: [number, number];
};

type CreateRoomPayload = Pick<Room, "name" | "dealer_id">;

export type Room = {
  id: string;
  created_at: string;
  name: string;
  dealer_id: string;
  stream_address: string;
};

type UpdateRoomPayload = {
  roomId: string;
  name?: string;
  dealer?: string;
  streamAddress?: SimplePeer.SignalData;
};

type Rooms = Room[];

type Account = {
  id: string;
  user_id: string;
  role: "dealer" | "player";
  balance: number;
  name: string;
};

type Game = {
  id: string;
  created_at: string;
  room_id: string;
  player_id: string;
  dealer: string;
  game_over: boolean;
};

type Round = {
  id: string;
  created_at: string;
  aa_bet: number;
  ante_bet: number;
  game_id: string;
  room_id: string;
  isActive: boolean;
  player_id: string;
};

type CreateGamePayload = {
  roomId: string;
  playerId: string;
  dealerId: string;
};

type MakeBetsPayload = {
  roundId: string;
  AABet: number;
  AnteBet: number;
};

export const GameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["game"],
  endpoints: (builder) => ({
    getRoomById: builder.query<Room, string>({
      query: (roomId) => {
        return { url: `/api/rooms/${roomId}`, method: "GET" };
      },
    }),
    getGameByRoomId: builder.query<Game, string>({
      query: (roomId) => {
        return { url: `/api/games/find?roomId=${roomId}`, method: "GET" };
      },
    }),
    getRoundByGameId: builder.query<Round, string>({
      query: (gameId) => {
        return { url: `/api/rounds/find?gameId=${gameId}`, method: "GET" };
      },
    }),

    getRound: builder.query<Round, string>({
      query: (roundId) => {
        return { url: `/api/rounds/${roundId}`, method: "GET" };
      },
    }),

    getRooms: builder.query<Rooms, void>({
      query: () => ({
        url: "/api/rooms",
        method: "GET",
      }),
    }),

    createRoom: builder.mutation<Response, CreateRoomPayload>({
      query: (payload) => ({
        url: "/api/rooms",
        method: "POST",
        body: payload,
      }),
    }),

    getUserAccount: builder.query<Account, string>({
      query: (userId) => ({
        url: `/api/auth/me?userId=${userId}`,
        method: "GET",
      }),
    }),

    updateRoom: builder.mutation<Room, UpdateRoomPayload>({
      query: (payload) => {
        const { roomId, ...body } = payload;

        return {
          url: `/api/rooms/${roomId}`,
          method: "PUT",
          body: body,
        };
      },
    }),

    startGame: builder.mutation<Game, CreateGamePayload>({
      query: (payload) => {
        const { roomId, ...body } = payload;

        return {
          url: `/api/rooms/${roomId}/start-game`,
          method: "POST",
          body: body,
        };
      },
    }),

    makePlayerBets: builder.mutation<any, MakeBetsPayload>({
      query: (payload) => {
        const { roundId, ...body } = payload;

        return {
          url: `/api/rounds/${roundId}/bets`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const { getRooms } = GameApi.endpoints;
