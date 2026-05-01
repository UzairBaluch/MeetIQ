import type { Server } from "socket.io";

/**
 * Central place to register Socket.IO namespaces and handlers.
 * Keep this thin; delegate to modules/* as features grow.
 */
export function attachSocketHandlers(io: Server): void {
  io.on("connection", () => {});
}
