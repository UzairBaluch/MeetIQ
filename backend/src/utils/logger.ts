import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import { env } from "../config/env.js";

const { combine, timestamp, json, colorize, simple } = winston.format;

const fileTransport = new DailyRotateFile({
  filename: "logs/apps-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "30d",
  format: combine(timestamp(), json()),
});

const consoleTransport = new winston.transports.Console({
  format: combine(colorize(), simple()),
});

const logger = winston.createLogger({
  level: env.logLevel,
  transports: [env.nodeEnv === "production" ? fileTransport : consoleTransport],
});

export { logger };
