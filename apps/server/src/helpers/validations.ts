import { z } from "zod";

const meQuerySchema = z.object({
  userId: z.string().uuid(),
});

const getRoundParamsSchema = z.object({
  roundId: z.string().uuid(),
});

const getRoomParamsSchema = z.object({
  roomId: z.string().uuid(),
});

const findRoundByGameIdQuerySchema = z.object({
  gameId: z.string().uuid(),
});

const findGameByRoomIdQuerySchema = z.object({
  roomId: z.string().uuid(),
});
