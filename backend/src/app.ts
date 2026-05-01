import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import routes from "./routes/index.js";

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

  app.get("/", (_req, res) => {
    res.json({ service: "meetiq-api", env: env.nodeEnv });
  });

  app.use("/api", routes);

  return app;
}
