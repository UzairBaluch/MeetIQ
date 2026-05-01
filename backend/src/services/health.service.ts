import * as healthRepository from "../repositories/health.repository.js";

export async function getHealthStatus(): Promise<{ ok: boolean }> {
  return { ok: await healthRepository.isDatabaseConnected() };
}
