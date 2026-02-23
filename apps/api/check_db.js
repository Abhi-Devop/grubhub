const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function check() {
  const storeProducts = await prisma.storeProduct.findMany({
    include: { product: true }
  });
  console.log('Total storeProducts:', storeProducts.length);
  const byId = await prisma.storeProduct.findUnique({ where: { id: 327 }, include: { product: true } });
  console.log('Product 327 by ID:', byId ? byId.product.name : 'Not Found');
  
  const allIds = storeProducts.map(sp => sp.id);
  console.log('Min ID:', Math.min(...allIds));
  console.log('Max ID:', Math.max(...allIds));
}

check().catch(console.error).finally(() => prisma.$disconnect());
