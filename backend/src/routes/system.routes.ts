import { Router } from "express";

import * as systemController from "../controllers/system.controller.js";

export const systemRouter = Router();

systemRouter.get("/", systemController.getRoot);
