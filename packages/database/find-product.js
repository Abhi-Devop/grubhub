const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    where: {
        OR: [
            { id: "biryani-4" },
            { slug: "biryani-4" },
            { name: { contains: "Egg Biryani" } }
        ]
    },
    include: { storeProducts: true }
  });
  console.log(JSON.stringify(products, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
