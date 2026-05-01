import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectDatabase(): Promise<void> {
  await prisma.$connect();
}
