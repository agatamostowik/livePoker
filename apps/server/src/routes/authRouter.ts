import { Router } from "express";
import { meController } from "../controllers/meController";
import { meValidationMiddleware } from "../middlewares/meValidation";

export const authRouter = Router();

authRouter.get("/me", meValidationMiddleware, meController);
