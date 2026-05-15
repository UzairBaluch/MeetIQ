import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import { requestId } from "./middleware/requestId.middleware.js";
import apiRouter from "./routes/index.js";
import { systemRouter } from "./routes/system.routes.js";

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");
  app.use(requestId);
  app.use(helmet());
  app.use(
    cors({
      origin: env.corsOrigins.length > 0 ? env.corsOrigins : true,
      credentials: true,
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: "10kb" }));
  if (env.nodeEnv !== "production") {
    app.use(morgan("dev"));
  }

  app.use(systemRouter);
  app.use("/api", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
