import type { Request, Response } from "express";

import * as systemService from "../services/system.service.js";

export function getRoot(_req: Request, res: Response): void {
  const overview = systemService.getServiceOverview();
  res.json(overview);
}
