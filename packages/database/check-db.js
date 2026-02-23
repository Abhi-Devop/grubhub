const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  try {
    const products = await prisma.product.count();
    const categories = await prisma.category.count();
    const users = await prisma.user.count();
    console.log(JSON.stringify({ products, categories, users }));
  } catch (e) {
    console.error(e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
