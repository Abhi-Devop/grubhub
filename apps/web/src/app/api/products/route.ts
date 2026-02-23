import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.product.findMany({
      take: 20,
      include: {
        storeProducts: {
            take: 1
        }
      }
    });

    // Transform for frontend
    const results = products.map(p => ({
        id: p.id,
        name: p.name,
        category: p.categoryId, // ideally fetch category name but ID is fine for now or join
        image: p.image,
        price: p.storeProducts?.[0]?.price || 0,
        mrp: p.storeProducts?.[0]?.mrp || 0,
        discount: 0,
        rating: p.rating,
        numReviews: p.numReviews,
        unit: '1 unit'
    }));

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
