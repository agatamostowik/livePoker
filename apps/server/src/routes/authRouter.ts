import { Router } from "express";
import { meController } from "../controllers/meController";

export const authRouter = Router();

authRouter.get("/me", meController);
