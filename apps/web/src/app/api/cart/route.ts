import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 400 }
      );
    }

    const cart = await db.cart.findUnique({
      where: { userId: Number(userId) },
      include: {
        items: {
          include: {
            storeProduct: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });

    if (!cart) {
      return NextResponse.json({ cart: null, items: [] });
    }

    return NextResponse.json({ cart, items: cart.items });
  } catch (error) {
    console.error("Cart fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
