import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import { rootRouter } from "./routes";
import { origin } from "../index";

export const initApp = () => {
  // Create Express application instance
  const app = express();

  // Global middlewares
  app.use(
    cors({
      origin,
      credentials: true,
    })
  );
  app.use(bodyParser.json());

  // Routes
  app.use("/", rootRouter);

  // Create HTTP server instance
  const server = createServer(app);

  return server;
};
