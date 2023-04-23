import { Router } from "express";
import { findGameByRoomIdController } from "../controllers/findGameByRoomIdController";

export const gamesRouter = Router();

gamesRouter.get("/find", findGameByRoomIdController);
