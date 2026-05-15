import { createClient, type RedisClientType } from "redis";

import { env } from "./env.js";
import { logger } from "../utils/logger.js";

export const redis: RedisClientType = createClient({ url: env.redisUrl });

redis.on("error", (err: Error) => {
  logger.error("Redis client error", { err });
});

export async function connectRedis(): Promise<void> {
  await redis.connect();
  logger.info("Redis connected");
}

export async function disconnectRedis(): Promise<void> {
  await redis.quit();
}
