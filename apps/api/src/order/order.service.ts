import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: number, storeId: number, items: { storeProductId: string | number; quantity: number }[], paymentMethod: string = "ONLINE") {
    return this.prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData: { productId: number; name: string; price: number; quantity: number }[] = [];

      for (const item of items) {
        let inventory: any = null;
        // Since storeProductId comes from frontend it could be a slug (string).
        // Only try to find by ID if it's a number.
        if (!isNaN(Number(item.storeProductId))) {
            inventory = await tx.storeProduct.findUnique({
              where: { id: Number(item.storeProductId) },
              include: { product: true }
            });
        }

        // 2. If not found by UUID, try lookup by Slug/SKU and store context
        if (!inventory) {
             const productWhere: any = { 
                 OR: [
                     { slug: String(item.storeProductId) },
                     { sku: String(item.storeProductId) }
                 ]
             };
             if (!isNaN(Number(item.storeProductId))) {
                 productWhere.OR.push({ id: Number(item.storeProductId) });
             }
             
             const product = await tx.product.findFirst({ 
                 where: productWhere 
             });
             
             if (product) {
                 // Try specific store first
                 let sp = await tx.storeProduct.findFirst({
                     where: { productId: product.id, storeId: storeId },
                     include: { product: true }
                 });

                 // ABSOLUTE FALLBACK: If store mismatch, just take any available one for this product
                 if (!sp) {
                    sp = await tx.storeProduct.findFirst({
                        where: { productId: product.id },
                        include: { product: true }
                    });
                 }
                 if (sp) inventory = sp;
             }
        }

        if (!inventory) {
            throw new BadRequestException(`Product not found with ID/Slug: ${item.storeProductId} in Store: ${storeId}`);
        }

        if (inventory.stock < item.quantity) {
          throw new BadRequestException(`Out of stock: ${inventory.product.name}`);
        }

        // DECREMENT STOCK - USE UUID ID (inventory.id), NOT item.storeProductId (which might be a slug)
        await tx.storeProduct.update({
          where: { id: inventory.id },
          data: { stock: { decrement: item.quantity } }
        });

        const lineTotal = inventory.price * item.quantity;
        totalAmount += lineTotal;

        orderItemsData.push({
          productId: inventory.productId,
          name: inventory.product.name,
          price: inventory.price,
          quantity: item.quantity
        });
      }

      const orderId = `BLK-${Math.floor(1000 + Math.random() * 9000)}`;
      const isCod = paymentMethod === "CASH";

      try {
          const order = await tx.order.create({
            data: {
              orderId,
              userId,
              storeId,
              totalAmount,
              status: isCod ? "PREPARING" : "PENDING",
              paymentStatus: isCod ? "PENDING" : "PENDING", // Cash Pending
              paymentMethod: (paymentMethod === "ONLINE" ? "CARD" : paymentMethod) as any,
              items: {
                create: orderItemsData
              }
            },
            include: { items: true }
          });
          return order;
      } catch (err) {
          console.error("Order Creation Error:", err);
          throw new BadRequestException("Failed to generate order record");
      }
    }); // End Transaction
  }

  async getUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        store: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getOrder(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: true, store: true }
    });
  }

  // --- Admin ---
  async getAllOrders() {
      return this.prisma.order.findMany({
          include: {
              user: true,
              items: true,
              store: true
          },
          orderBy: { createdAt: 'desc' }
      });
  }

  async updateOrderStatus(id: number, status: string) {
      return this.prisma.order.update({
          where: { id },
          data: { status: status as any }
      });
  }
}
