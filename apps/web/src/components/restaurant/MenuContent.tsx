import { db } from "@/lib/db";
import FoodCard from "@/components/FoodCard";
import { Star, Clock, MapPin } from "lucide-react";

export async function MenuContent({ storeId }: { storeId: string }) {
  // Simulate delay for streaming demonstration
  // await new Promise(resolve => setTimeout(resolve, 1000));

  let menu: any[] = [];
  try {
    const numericStoreId = parseInt(storeId);
    if (!isNaN(numericStoreId)) {
        const storeProducts = await db.storeProduct.findMany({
            where: { storeId: numericStoreId, isAvailable: true },
            include: { product: true }
        });
        menu = storeProducts.map(sp => ({
            id: String(sp.product.slug || sp.product.id),
            name: sp.product.name,
            description: sp.product.description,
            image: sp.product.image,
            price: sp.price,
            mrp: sp.mrp,
            rating: sp.product.rating,
            isVeg: sp.product.isVeg,
            storeProductId: String(sp.id)
        }));
    }
  } catch (error) {
    console.error("Failed to fetch menu from DB:", error);
  }

  // If DB menu is empty, we could fallback to ALL_ITEMS but it's better to show real data
  if (menu.length === 0) {
      return (
        <div className="text-center py-20">
            <p className="text-gray-500 font-serif text-xl">
                This restaurant's menu is currently being updated.
            </p>
        </div>
      );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {menu.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 h-64">
          <div className="w-full h-32 bg-gray-100 rounded-xl mb-4" />
          <div className="h-4 w-3/4 bg-gray-100 rounded mb-2" />
          <div className="h-3 w-1/2 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}
