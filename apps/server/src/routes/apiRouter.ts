import { Router } from "express";
import { authRouter } from "./authRouter";
import { roomsRouter } from "./roomsRouter";
import { gamesRouter } from "./gamesRouter";
import { roundsRouter } from "./roundsRouter";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/rooms", roomsRouter);
apiRouter.use("/games", gamesRouter);
apiRouter.use("/rounds", roundsRouter);
