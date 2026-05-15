import { Router } from "express";

import * as healthController from "../controllers/health.controller.js";
import * as systemController from "../controllers/system.controller.js";

export const systemRouter = Router();

systemRouter.get("/", systemController.getRoot);
systemRouter.get("/healthz", healthController.getHealth);
