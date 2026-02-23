import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    console.log('Checking database status...');
    await this.seedIfNeeded();
  }

  getHello(): string {
    return 'Hello World!';
  }

  private async seedIfNeeded() {
    try {
      // 1. Check for Users
      const userCount = await this.prisma.user.count();
      if (userCount === 0) {
        console.log('Seeding default Admin user...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        await this.prisma.user.create({
          data: {
            email: 'admin@grubhub.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
          },
        });
      }

      // 2. Check for Store
      let store = await this.prisma.store.findFirst();
      if (!store) {
        console.log('Seeding default Store...');
        store = await this.prisma.store.create({
          data: {
            name: 'Central Kitchen',
            address: '123 Foodie Street',
            lat: 12.9716, // Bangalore
            lng: 77.5946,
            isActive: true,
          },
        });
      }

      // 3. Check for Categories
      const categoryCount = await this.prisma.category.count();
      if (categoryCount === 0) {
        console.log('Seeding default Categories and Products...');
        const categories = [
          { name: 'Biryani', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=200' },
          { name: 'North Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=200' },
          { name: 'South Indian', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=200' },
        ];

        for (const catData of categories) {
          const cat = await this.prisma.category.create({ data: catData });
          
          // Add 2 products for each category
          for (let i = 1; i <= 2; i++) {
            const product = await this.prisma.product.create({
              data: {
                name: `${catData.name} Item ${i}`,
                description: `Delicious ${catData.name} prepared with fresh ingredients.`,
                image: catData.image.replace('w=200', 'w=800'),
                sku: `SKU-${catData.name.toUpperCase()}-${i}-${Date.now()}`,
                slug: `${catData.name.toLowerCase().replace(/\s+/g, '-')}-${i}-${Date.now()}`,
                categoryId: cat.id,
              },
            });

            // Link to store
            await this.prisma.storeProduct.create({
              data: {
                storeId: store.id,
                productId: product.id,
                price: 199 + (i * 50),
                mrp: 299 + (i * 50),
                stock: 100,
                isAvailable: true,
              },
            });
          }
        }
      }
      console.log('Database check complete.');
    } catch (e) {
      console.error('SEEDING FAILED:', e);
    }
  }
}
