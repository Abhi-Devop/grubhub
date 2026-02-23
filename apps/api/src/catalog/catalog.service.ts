import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async findNearestStore(lat: number, lng: number) {
    // SQLite doesn't have ST_Distance. 
    // Fallback: Just return any active store for demo.
    // In a real SQLite app, you'd pull all and filter on CPU.
    return this.prisma.store.findFirst({ where: { isActive: true } });
  }

  async getProducts(storeId?: number) {
    const where: any = {};
    if (storeId) {
      where.storeProducts = {
        some: { storeId: storeId, isAvailable: true }
      };
    }

    const products = await this.prisma.product.findMany({
      where,
      include: {
        category: true,
        storeProducts: true
      }
    });

    return products.map(p => {
      const storeInfo = storeId 
        ? p.storeProducts.find(s => s.storeId === storeId)
        : p.storeProducts[0];

      return {
        ...p,
        price: storeInfo?.price || 0,
        mrp: storeInfo?.mrp || 0,
        stock: storeInfo?.stock || 0,
        storeProductId: storeInfo?.id || 'unknown',
        storeProducts: undefined
      };
    });
  }

  async getProduct(identifier: string | number) {
      // Try to find by ID (Int), or Slug, or SKU
      const whereClause: any = {
          OR: [
              { slug: String(identifier) },
              { sku: String(identifier) }
          ]
      };
      
      if (!isNaN(Number(identifier))) {
          whereClause.OR.push({ id: Number(identifier) });
      }

      const product = await this.prisma.product.findFirst({
          where: whereClause,
          include: {
              category: true,
              storeProducts: true
          }
      });

      if (!product) return null;

      const storeInfo = product.storeProducts[0]; // Default to first store for now

      return {
          ...product,
          price: storeInfo?.price || 0,
          mrp: storeInfo?.mrp || 0,
          stock: storeInfo?.stock || 0,
          storeProductId: storeInfo?.id || 'unknown',
          storeProducts: undefined
      };
  }

  async getCategories() {
    return this.prisma.category.findMany();
  }

  async searchProducts(query: string) {
    const where: any = {};
    if (query && query.length > 0) {
      where.OR = [
        { name: { contains: query } },
        { description: { contains: query } }
      ];
    }

    return this.prisma.product.findMany({
        where,
        include: {
            category: true,
            storeProducts: {
                take: 1
            }
        }
    });
  }

  async createProduct(data: any) {
    // 1. Create or Find Category
    let category = await this.prisma.category.findFirst({ where: { name: data.category } });
    if (!category) {
        category = await this.prisma.category.create({
            data: { name: data.category, image: '' }
        });
    }

    // 2. Create Product
    const product = await this.prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            image: data.image,
            sku: `SKU-${Date.now()}`,
            slug: `${data.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
            categoryId: category.id,
            basePrice: data.price !== undefined ? Math.round(parseFloat(data.price) * 100) : 0,
            baseMrp: data.price !== undefined ? Math.round(parseFloat(data.price) * 1.2 * 100) : 0
        }
    });

    // 3. Link to Store (Default Store for now)
    const store = await this.prisma.store.findFirst();
    if (store) {
        await this.prisma.storeProduct.create({
            data: {
                storeId: store.id,
                productId: product.id,
                price: Math.round(parseFloat(data.price) * 100),
                mrp: Math.round(parseFloat(data.price) * 1.2 * 100),
                stock: 100,
                isAvailable: true
            }
        });
    }

    return product;
  }


  async updateProduct(id: number, data: any) {
    let categoryId: number | undefined = undefined;
    
    if (data.category && data.category !== 'NEW') {
       // Support string category like createProduct
       let category = await this.prisma.category.findFirst({ where: { name: data.category } });
       if (!category) {
           category = await this.prisma.category.create({ data: { name: data.category, image: '' } });
       }
       categoryId = category.id;
    }

    const product = await this.prisma.product.update({
        where: { id: id as any }, // Caste to any to bypass potential out-of-sync type issues
        data: {
            name: data.name,
            description: data.description,
            image: data.image,
            categoryId: categoryId,
            ...(data.price !== undefined && data.price !== '' ? {
                basePrice: Math.round(parseFloat(data.price) * 100),
                baseMrp: Math.round(parseFloat(data.price) * 1.2 * 100)
            } : {})
        },
        include: {
            category: true,
            storeProducts: true
        }
    });

    if (data.price !== undefined && data.price !== '') {
        const priceValue = Math.round(parseFloat(data.price) * 100);
        const mrpValue = Math.round(priceValue * 1.2);

        // Update all existing store links
        const links = await this.prisma.storeProduct.findMany({ 
            where: { productId: id as any } 
        });
        
        if (links.length > 0) {
            for (const link of links) {
                await this.prisma.storeProduct.update({
                    where: { id: link.id as any },
                    data: { 
                        price: priceValue,
                        mrp: mrpValue
                    }
                });
            }
        } else {
            // Create a default link if none exists
            const store = await this.prisma.store.findFirst();
            if (store) {
                await this.prisma.storeProduct.create({
                    data: {
                        storeId: store.id as any,
                        productId: id as any,
                        price: priceValue,
                        mrp: mrpValue,
                        stock: 100,
                        isAvailable: true
                    }
                });
            }
        }
    }

    // Return transformed product for UI consistency
    const updatedProduct = await this.prisma.product.findUnique({
        where: { id: id as any },
        include: { category: true, storeProducts: true }
    });

    if (!updatedProduct) return product as any;

    const storeInfo = (updatedProduct as any).storeProducts?.[0];

    return {
        ...updatedProduct,
        price: storeInfo?.price || 0,
        mrp: storeInfo?.mrp || 0,
        stock: storeInfo?.stock || 0,
        storeProductId: storeInfo?.id || 'unknown',
        storeProducts: undefined
    };
  }



  async deleteProduct(id: number) {
      await this.prisma.storeProduct.deleteMany({ where: { productId: id } });
      return this.prisma.product.delete({ where: { id } });
  }

  // --- Categories ---
  async createCategory(data: any) {
      return this.prisma.category.create({ data });
  }

  async updateCategory(id: number, data: any) {
      return this.prisma.category.update({ where: { id }, data });
  }

  async deleteCategory(id: number) {
      // Check if products exist
      const count = await this.prisma.product.count({ where: { categoryId: id } });
      if (count > 0) throw new Error("Cannot delete category with products");
      return this.prisma.category.delete({ where: { id } });
  }
}

