const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const product = await prisma.product.findFirst({
    where: { name: 'Themealdbbreakfastbreakfastpotatoesjpg' },
    include: { storeProducts: true }
  });
  console.log('Product in DB:', JSON.stringify(product, null, 2));
}

check().catch(console.error).finally(() => prisma.$disconnect());
