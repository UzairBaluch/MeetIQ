import { prisma } from "../src/config/database.js";

async function main(): Promise<void> {
  // Add seed data here when first models are added.
}

main()
  .catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
