import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { rootRouter } from "./routes";

export const initApp = () => {
  // Create Express application instance
  const app = express();

  // Global middlewares
  app.use(
    cors({
      origin: "https://127.0.0.1:5173",
      credentials: true,
    })
  );
  app.use(bodyParser.json());

  // Routes
  app.use("/", rootRouter);

  // Create HTTP server instance
  return createServer(app);
};
