import type { Server } from "socket.io";

/**
 * Socket.IO bootstrap: register namespaces and handlers here.
 * Keep this thin; delegate to services as features grow.
 */
export function attachSocketHandlers(io: Server): void {
  io.on("connection", () => {});
}
