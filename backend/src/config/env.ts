import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(6000),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1).default("redis://localhost:6379"),
  LOG_LEVEL: z
    .enum(["error", "warn", "info", "http", "verbose", "debug", "silly"])
    .default("debug"),
  CORS_ORIGIN: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const data = parsed.data;

function parseCorsOrigins(value: string | undefined): string[] {
  if (!value?.trim()) {
    return [];
  }
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

export interface Env {
  nodeEnv: "development" | "production" | "test";
  port: number;
  databaseUrl: string;
  redisUrl: string;
  logLevel: "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";
  corsOrigins: string[];
}

export const env: Env = {
  nodeEnv: data.NODE_ENV,
  port: data.PORT,
  databaseUrl: data.DATABASE_URL,
  redisUrl: data.REDIS_URL,
  logLevel: data.LOG_LEVEL,
  corsOrigins: parseCorsOrigins(data.CORS_ORIGIN),
};
