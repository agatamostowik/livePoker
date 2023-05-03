import { Router } from "express";
import { getRoomsController } from "../controllers/getRoomsController";
import { getRoomController } from "../controllers/getRoomController";
import { getRoomValidationMiddleware } from "../middlewares/getRoomValidationMiddleware";

export const roomsRouter = Router();

roomsRouter.get("/", getRoomsController);
roomsRouter.get("/:roomId", getRoomValidationMiddleware, getRoomController);
