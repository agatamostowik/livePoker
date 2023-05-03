import { Router } from "express";
import { findRoundByGameIdController } from "../controllers/findRoundByGameIdController";
import { getRoundController } from "../controllers/getRoundController";

export const roundsRouter = Router();

roundsRouter.get("/find", findRoundByGameIdController);
roundsRouter.get("/:roundId", getRoundController);
