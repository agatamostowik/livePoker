import { z } from "zod";

export const meQuerySchema = z.object({
  userId: z.string().uuid(),
});

export const getRoundParamsSchema = z.object({
  roundId: z.string().uuid(),
});

export const getRoomParamsSchema = z.object({
  roomId: z.string().uuid(),
});

export const findRoundByGameIdQuerySchema = z.object({
  gameId: z.string().uuid(),
});

export const findGameByRoomIdQuerySchema = z.object({
  roomId: z.string().uuid(),
});
