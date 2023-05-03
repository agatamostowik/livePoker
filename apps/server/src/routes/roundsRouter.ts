import { Router } from "express";
import { findRoundByGameIdController } from "../controllers/findRoundByGameIdController";
import { getRoundController } from "../controllers/getRoundController";
import { findRoundByGameIdValidationMiddleware } from "../middlewares/findRoundByGameIdValidationMiddleware";
import { getRoundValidationMiddleware } from "../middlewares/getRoundValidationMiddleware";

export const roundsRouter = Router();

roundsRouter.get(
  "/find",
  findRoundByGameIdValidationMiddleware,
  findRoundByGameIdController
);
roundsRouter.get("/:roundId", getRoundValidationMiddleware, getRoundController);
