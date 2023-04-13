import { Router } from "express";
import { apiRouter } from "./apiRouter";

export const rootRouter = Router();

rootRouter.use("/api", apiRouter);
