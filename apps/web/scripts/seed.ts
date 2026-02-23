import { PrismaClient } from "@prisma/client";
import { ALL_ITEMS, CATEGORIES } from "../src/lib/data";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("password", salt);

  // 0. Create Test User (for login testing)
  const testUser = await prisma.user.upsert({
    where: { email: "test@grubhub.com" },
    update: { password: hashedPassword },
    create: {
      email: "test@grubhub.com",
      password: hashedPassword,
      firstName: "Test",
      lastName: "User",
      role: "USER"
    }
  });
  console.log(`✅ Test user created: ${testUser.email} (password: "password")`);

  // 0.5 Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@grubhub.com" },
    update: {
      password: hashedPassword,
      role: "ADMIN" // Enforce admin status just in case
    },
    create: {
      email: "admin@grubhub.com",
      password: hashedPassword,
      firstName: "Super",
      lastName: "Admin",
      role: "ADMIN"
    }
  });
  console.log(`✅ Admin user created: ${adminUser.email} (password: "password")`);

  // 1. Create Default Store
  const store = await prisma.store.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "GrubHub Main Store",
      lat: 19.076,
      lng: 72.8777,
      address: "Mumbai, India",
      isActive: true,
    },
  });
  console.log(`✅ Store created: ${store.name}`);

  // 2. Create Categories
  // Use a map to track created categories to avoid duplicates if run multiple times
  const categoryMap = new Map<string, number>(); // Name -> ID

  for (const catName of CATEGORIES) {
    const existing = await prisma.category.findFirst({ where: { name: catName } });
    if (existing) {
        categoryMap.set(catName, existing.id);
    } else {
        const newCat = await prisma.category.create({
            data: {
                name: catName,
                image: `https://source.unsplash.com/400x400/?${encodeURIComponent(catName)},food`, // Placeholder, will be updated by existing images if available
            }
        });
        categoryMap.set(catName, newCat.id);
        console.log(`Checking category: ${catName}`);
    }
  }

  // 3. Clear Products (to avoid unique slug/sku collisions during re-seeding)
  // In production, be careful. For dev/seed, this is fine.
  // Note: cascades might be needed if foreign keys enforce it.
  try {
    await prisma.storeProduct.deleteMany();
    await prisma.product.deleteMany();
  } catch (e) {
    console.warn("Cleanup failed (might be empty):", e);
  }

  // 4. Create Products & Inventory
  for (const item of ALL_ITEMS) {
    // Determine Category ID
    // Note: lib/data might have categories not in the CATEGORIES array, or slightly different spellings.
    // We'll try to match or create on the fly.
    let categoryId = categoryMap.get(item.category);
    if (!categoryId) {
        const cat = await prisma.category.create({
            data: { 
                name: item.category,
                image: item.image 
            }
        });
        categoryId = cat.id;
        categoryMap.set(item.category, cat.id);
    }

    // Create Product
    const product = await prisma.product.create({
        data: {
            name: item.name,
            description: item.description,
            image: item.image,
            sku: `SKU-${item.id}`,
            slug: item.id, // Use ID as slug for static data compatibility
            categoryId: categoryId,
            rating: item.rating,
            isVeg: item.isVeg,
            numReviews: Math.floor(Math.random() * 100) + 10,
            basePrice: item.price,
            baseMrp: item.mrp || item.price * 1.2
        }
    });

    // Create Store Product (Inventory/Price)
    await prisma.storeProduct.create({
        data: {
            storeId: store.id,
            productId: product.id,
            price: item.price,
            mrp: item.mrp || item.price * 1.2,
            stock: 100,
            isAvailable: true
        }
    });

    console.log(`✅ Upserted product: ${item.name}`);
  }

  console.log("🏁 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
