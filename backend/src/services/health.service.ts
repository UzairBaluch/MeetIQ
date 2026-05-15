import * as healthRepository from "../repositories/health.repository.js";

export interface HealthStatus {
  ok: boolean;
  checks: {
    database: boolean;
    redis: boolean;
  };
}

export async function getHealthStatus(): Promise<HealthStatus> {
  const [database, redis] = await Promise.all([
    healthRepository.isDatabaseConnected(),
    healthRepository.isRedisConnected(),
  ]);

  return {
    ok: database && redis,
    checks: { database, redis },
  };
}
