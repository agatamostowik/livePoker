import { Router } from "express";
import { findGameByRoomIdController } from "../controllers/findGameByRoomIdController";
import { findGameByRoomIdValidationMiddleware } from "../middlewares/findGameByRoomIdValidationMiddleware";

export const gamesRouter = Router();

gamesRouter.get(
  "/find",
  findGameByRoomIdValidationMiddleware,
  findGameByRoomIdController
);
