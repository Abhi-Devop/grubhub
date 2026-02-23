
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- STORES ---");
  const stores = await prisma.store.findMany();
  console.log(JSON.stringify(stores, null, 2));

  console.log("\n--- PRODUCTS (First 5) ---");
  const products = await prisma.product.findMany({ take: 5 });
  console.log(JSON.stringify(products, null, 2));

  console.log("\n--- LATE-2 PRODUCT ---");
  const late2 = await prisma.product.findUnique({ where: { slug: 'late-2' } });
  console.log(JSON.stringify(late2, null, 2));

  if (late2) {
    console.log("\n--- STORE PRODUCTS FOR LATE-2 ---");
    const sp = await prisma.storeProduct.findMany({ where: { productId: late2.id } });
    console.log(JSON.stringify(sp, null, 2));
  }

  console.log("\n--- ORDERS ---");
  const orders = await prisma.order.findMany({ include: { items: true, user: true } });
  console.log(JSON.stringify(orders, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
