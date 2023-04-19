import { Router } from "express";
import { createRoomController } from "../controllers/createRoomController";
import { getRoomsController } from "../controllers/getRoomsController";
import { validateCreateRoomMiddleware } from "../middlewares/validateCreateRoomMiddleware";
import { gameController } from "../controllers/gameController";
import { updateRoomController } from "../controllers/updateRoomController";
import { getRoomController } from "../controllers/getRoomController";

export const roomsRouter = Router();

roomsRouter.get("/", getRoomsController);
roomsRouter.post("/", validateCreateRoomMiddleware, createRoomController);
roomsRouter.get("/:roomId", getRoomController);
roomsRouter.put("/:roomId", updateRoomController);
roomsRouter.post("/:roomId/start-game", gameController);
