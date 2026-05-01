import type { Request, Response } from "express";

import * as healthService from "../services/health.service.js";

export function getHealth(_req: Request, res: Response): void {
  const status = healthService.getHealthStatus();
  res.json(status);
}
