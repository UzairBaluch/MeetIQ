import "dotenv/config";

function toInt(value: string | undefined, fallback: number): number {
  const n = Number.parseInt(String(value), 10);
  return Number.isFinite(n) ? n : fallback;
}

export interface Env {
  nodeEnv: string;
  port: number;
  mongoUri: string;
}

export const env: Env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: toInt(process.env.PORT, 6000),
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/meetiq",
};
