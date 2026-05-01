import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import apiRouter from "./routes/index.js";
import { systemRouter } from "./routes/system.routes.js";

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "10kb" }));
  if (env.nodeEnv !== "production") {
    app.use(morgan("dev"));
  }

  app.use(systemRouter);
  app.use("/api", apiRouter);

  return app;
}
