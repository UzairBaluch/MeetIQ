import { createServer } from "node:http";
import { Server } from "socket.io";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { attachSocketHandlers } from "./utils/socket.js";

async function bootstrap(): Promise<void> {
  await connectDatabase();

  const app = createApp();
  const server = createServer(app);
  const io = new Server(server, {
    cors: { origin: true, credentials: true },
  });
  attachSocketHandlers(io);

  server.listen(env.port, () => {
    logger.info(`HTTP + Socket.IO on port ${env.port} (${env.nodeEnv})`);
  });
}

bootstrap().catch((err: unknown) => {
  logger.error("Bootstrap failed", { err });
  process.exit(1);
});
