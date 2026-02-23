
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const slug = 'late-2';
  console.log(`Checking for product with slug: ${slug}`);
  
  const product = await prisma.product.findUnique({
    where: { slug: slug },
    include: { storeProducts: true }
  });

  if (product) {
    console.log('✅ Product found:');
    console.log(`ID: ${product.id}`);
    console.log(`Slug: ${product.slug}`);
    console.log(`StoreProducts:`, product.storeProducts);
  } else {
    console.log('❌ Product NOT found in DB.');
    
    // Check if any products exist
    const count = await prisma.product.count();
    console.log(`Total products in DB: ${count}`);
    
    // List some slugs
    const all = await prisma.product.findMany({ select: { slug: true }, take: 5 });
    console.log('Sample slugs:', all);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
