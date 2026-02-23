import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function wipe() {
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Product" CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Category" CASCADE;');
  console.log("Database forcefully wiped.");
}
wipe()
  .catch(e => console.error(e))
  .finally(async () => { await prisma.$disconnect(); });
