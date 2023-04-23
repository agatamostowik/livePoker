import { Router } from "express";
import { findRoundByGameIdController } from "../controllers/findRoundByGameIdController";
import { getRoundController } from "../controllers/getRoundController";
import { makeRoundBetsController } from "../controllers/makeRoundBetsController";

export const roundsRouter = Router();

roundsRouter.get("/find", findRoundByGameIdController);
roundsRouter.get("/:roundId", getRoundController);
roundsRouter.get("/:roundId/bets", makeRoundBetsController);
