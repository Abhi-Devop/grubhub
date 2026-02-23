import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const products = await db.storeProduct.findMany({
      where: {
        product: {
          OR: [
            { name: { contains: query } }, // Case insensitive by default in SQLite usually, or handling needed
            { description: { contains: query } },
            { category: { name: { contains: query } } }
          ]
        },
        isAvailable: true
      },
      take: 5,
      include: {
        product: true
      }
    });

    // Format for frontend
    const results = products.map(sp => ({
      id: sp.productId,
      name: sp.product.name,
      image: sp.product.image,
      price: sp.price,
      mrp: sp.mrp,
      category: "Groceries" // Improve if category is needed
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
