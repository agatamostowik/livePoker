import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  name: string;
  email: string;
};

type Response = User;
type Payload = {
  email: string;
  password: string;
};

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    me: builder.query<Response, void>({
      query: () => ({
        url: `/api/auth/me`,
        method: "GET",
      }),
    }),
    signIn: builder.mutation<Response, Payload>({
      query: (payload) => ({
        url: `/api/auth/signin`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});
