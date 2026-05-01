import mongoose from "mongoose";

const CONNECTED = 1;

export function isMongooseConnected(): boolean {
  return mongoose.connection.readyState === CONNECTED;
}
