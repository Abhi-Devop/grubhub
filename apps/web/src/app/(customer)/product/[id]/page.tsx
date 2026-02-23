import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import GourmetProductPage from "@/components/GourmetProductPage";
import { ALL_ITEMS } from "@/lib/data";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const decodedId = decodeURIComponent(id);

  let product: any = null;

  try {
    // 1. Try fetching from DB by SLUG (since ID in URL is actually the slug/id from ALL_ITEMS)
    product = await db.product.findUnique({
      where: { slug: decodedId } as any,
      include: {
        category: true,
        storeProducts: {
            where: { isAvailable: true },
            take: 1
        }
      }
    });
  } catch (error) {
    console.warn("DB Fetch failed, falling back to static data", error);
  }

  // 2. Fallback to Static Data if DB returns null
  if (!product) {
    const staticItem = ALL_ITEMS.find((item) => item.id === decodedId);
    if (staticItem) {
        // Mock the DB structure for consistency
        product = {
            id: staticItem.id,
            name: staticItem.name,
            description: staticItem.description,
            image: staticItem.image,
            categoryId: "static-cat",
            category: { name: staticItem.category },
            rating: staticItem.rating,
            numReviews: 120, // Mock
            isVeg: staticItem.isVeg,
            storeProducts: [{
                price: staticItem.price,
                mrp: staticItem.mrp || staticItem.price + 50,
                stock: 100
            }]
        };
    }
  }

  // 3. Fetch similar items (if we have a category)
  let similarProducts: any[] = [];
  if (product) {
      if (product.categoryId === "static-cat") {
          // Filter static items by category name
          similarProducts = ALL_ITEMS
            .filter(i => i.category === product.category.name && i.id !== product.id)
            .slice(0, 6)
            .map(i => ({
                id: i.id,
                name: i.name,
                image: i.image,
                storeProducts: [{ price: i.price }]
            }));
      } else {
          // DB fetch
          similarProducts = await db.product.findMany({
            where: {
                categoryId: product.categoryId,
                id: { not: product.id }
            },
            include: {
                storeProducts: { take: 1 }
            },
            take: 6
          });
      }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <GourmetProductPage product={product} similarProducts={similarProducts} />
    </div>
  );
}
