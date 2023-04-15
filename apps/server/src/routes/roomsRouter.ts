import { Router } from "express";
import { createRoomController } from "../controllers/createRoomController";
import { getRoomsController } from "../controllers/getRoomsController";
import { validateCreateRoomMiddleware } from "../middlewares/validateCreateRoomMiddleware";

export const roomsRouter = Router();

roomsRouter.post("/", validateCreateRoomMiddleware, createRoomController);
roomsRouter.get("/", getRoomsController);
