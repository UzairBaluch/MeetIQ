import type { Request, Response } from "express";

import * as healthService from "../services/health.service.js";

export async function getHealth(_req: Request, res: Response): Promise<void> {
  const status = await healthService.getHealthStatus();
  res.json(status);
}
