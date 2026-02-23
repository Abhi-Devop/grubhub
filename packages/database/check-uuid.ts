
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const id = '1292806f-97e0-4624-b629-f1f056f56a38';
  console.log(`Checking ID: ${id}`);

  const asStoreProduct = await prisma.storeProduct.findUnique({ where: { id } });
  if (asStoreProduct) console.log('✅ Found as StoreProduct:', asStoreProduct);
  else console.log('❌ Not a StoreProduct');

  const asProduct = await prisma.product.findUnique({ where: { id } });
  if (asProduct) console.log('✅ Found as Product:', asProduct);
  else console.log('❌ Not a Product');
  
  const asProductSlug = await prisma.product.findFirst({ where: { slug: id } });
  if (asProductSlug) console.log('✅ Found as Product Slug:', asProductSlug);
  else console.log('❌ Not a Product Slug');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
