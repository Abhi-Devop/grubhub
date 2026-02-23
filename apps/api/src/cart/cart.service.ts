import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    });
  }

  async addToCart(userId: number, storeId: number, storeProductId: number, quantity: number) {
    // 1. Check if user has a cart
    let cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId, storeId }
      });
    }

    // 2. Check Store Lock
    if (cart.storeId && cart.storeId !== storeId) {
       // Requirement: "Cart is locked to a specific store"
       // Logic: Clear cart if store changes? Or throw error.
       // Blinkit usually asks "Clear cart?". Here we'll throw for the frontend to handle, or auto-clear.
       // Let's implement auto-clear for simplicity as per plan.
       await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
       await this.prisma.cart.update({
         where: { id: cart.id },
         data: { storeId } 
       });
    }

    // 3. Add/Update Item
    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, storeProductId }
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    } else {
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          storeProductId,
          quantity
        }
      });
    }
  }

  async removeFromCart(userId: number, storeProductId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) return null;

    // Find item
    const item = await this.prisma.cartItem.findFirst({
        where: { cartId: cart.id, storeProductId }
    });

    if (!item) return null;

    if (item.quantity > 1) {
        return this.prisma.cartItem.update({
            where: { id: item.id },
            data: { quantity: item.quantity - 1 }
        });
    } else {
        return this.prisma.cartItem.delete({
            where: { id: item.id }
        });
    }
  }
}
