import { Router } from "express";
import { authRouter } from "./authRouter";
import { roomsRouter } from "./roomsRouter";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/rooms", roomsRouter);
