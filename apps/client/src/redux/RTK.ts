import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Response = {
  id: string;
  name: string;
  dealer: string;
  players: number;
  blinds: [number, number];
};

type Payload = {
  name: string;
  dealer: string;
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
    createRoom: builder.mutation<Response, Payload>({
      query: (payload) => ({
        url: `/api/rooms`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});
