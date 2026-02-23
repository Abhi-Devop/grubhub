const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const storeProducts = await prisma.storeProduct.findMany({
    take: 10,
    include: { product: true }
  });
  console.log(JSON.stringify(storeProducts, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
