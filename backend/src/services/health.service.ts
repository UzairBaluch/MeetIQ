import * as healthRepository from "../repositories/health.repository.js";

export function getHealthStatus(): { ok: boolean } {
  return { ok: healthRepository.isMongooseConnected() };
}
