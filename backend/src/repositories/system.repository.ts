import { env } from "../config/env.js";

export function getServiceName(): string {
  return "meetiq-api";
}

export function getPublicNodeEnv(): string {
  return env.nodeEnv;
}
