import "dotenv/config";

function toInt(value: string | undefined, fallback: number): number {
  const n = Number.parseInt(String(value), 10);
  return Number.isFinite(n) ? n : fallback;
}

export interface Env {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
}

export const env: Env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: toInt(process.env.PORT, 6000),
  databaseUrl:
    process.env.DATABASE_URL ??
    "postgresql://postgres:postgres@localhost:5432/meetiq?schema=public",
};
