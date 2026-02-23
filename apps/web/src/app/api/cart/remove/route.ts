import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId, storeProductId } = await req.json();

    if (!userId || !storeProductId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const cart = await db.cart.findUnique({
      where: { userId },
      include: { items: true }
    });

    if (!cart) {
      return NextResponse.json(
        { error: "Cart not found" },
        { status: 404 }
      );
    }

    const existingItem = cart.items.find(
      item => item.storeProductId === storeProductId
    );

    if (!existingItem) {
      return NextResponse.json(
        { error: "Item not in cart" },
        { status: 404 }
      );
    }

    if (existingItem.quantity > 1) {
      // Decrease quantity
      await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity - 1 }
      });
    } else {
      // Remove item completely
      await db.cartItem.delete({
        where: { id: existingItem.id }
      });
    }

    // Fetch updated cart
    const updatedCart = await db.cart.findUnique({
      where: { userId },
      include: { items: true }
    });

    return NextResponse.json({ success: true, cart: updatedCart });
  } catch (error) {
    console.error("Cart remove error:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
