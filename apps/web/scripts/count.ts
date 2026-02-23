import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function count() {
  const p = await prisma.product.count();
  console.log("DB Products:", p);
}
count()
  .catch(e => console.error(e))
  .finally(async () => { await prisma.$disconnect(); });
