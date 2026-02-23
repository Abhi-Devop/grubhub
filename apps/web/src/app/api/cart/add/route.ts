import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId, storeProductId, quantity = 1 } = await req.json();

    if (!userId || !storeProductId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create cart for user
    let cart = await db.cart.findUnique({
      where: { userId: Number(userId) },
      include: { items: true }
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: Number(userId),
          storeId: 1
        },
        include: { items: true }
      });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      item => item.storeProductId === storeProductId
    );

    if (existingItem) {
      // Update quantity
      await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    } else {
      // Add new item
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          storeProductId: Number(storeProductId),
          quantity
        }
      });
    }

    // Fetch updated cart
    const updatedCart = await db.cart.findUnique({
      where: { userId: Number(userId) },
      include: { items: true }
    });

    return NextResponse.json({ success: true, cart: updatedCart });
  } catch (error) {
    console.error("Cart add error:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}
