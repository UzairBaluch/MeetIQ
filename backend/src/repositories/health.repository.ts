import { prisma } from "../config/database.js";
import { redis } from "../config/redis.js";

export async function isDatabaseConnected(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export async function isRedisConnected(): Promise<boolean> {
  try {
    const response = await redis.ping();
    return typeof response === "string" && response.toUpperCase() === "PONG";
  } catch {
    return false;
  }
}
