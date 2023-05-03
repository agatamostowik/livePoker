import { Router } from "express";
import { getRoomsController } from "../controllers/getRoomsController";
import { getRoomController } from "../controllers/getRoomController";

export const roomsRouter = Router();

roomsRouter.get("/", getRoomsController);
roomsRouter.get("/:roomId", getRoomController);
