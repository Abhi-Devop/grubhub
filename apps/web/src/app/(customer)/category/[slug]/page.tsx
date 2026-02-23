import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import FoodGrid from "@/components/FoodGrid";
import ClientHomeWrapper from "@/components/ClientHomeWrapper";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Force dynamic to ensure we catch new products/categories
export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const categoryName = decodeURIComponent(params.slug);

  // Fetch products for this category
  const productsRaw = await db.product.findMany({
    where: {
      category: {
        name: {
            equals: categoryName,
        }
      }
    },
    include: {
      category: true,
      storeProducts: {
        where: { isAvailable: true },
        take: 1
      }
    }
  });

  // Transform for FoodGrid
  const products = productsRaw.map(p => ({
    id: p.slug || p.id,
    name: p.name,
    image: p.image,
    price: p.storeProducts[0]?.price || 0,
    rating: p.rating,
    time: "20-30 min" // Placeholder or calculated
  }));

  return (
    <ClientHomeWrapper>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-4 space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4">
             <Link href="/" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                 <ArrowLeft size={20} className="text-gray-700" />
             </Link>
             <div>
                 <span className="text-sm font-bold text-[#D35400] tracking-widest uppercase">Category</span>
                 <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{categoryName}</h1>
             </div>
        </div>

        {/* Content */}
        {products.length > 0 ? (
            <FoodGrid items={products} />
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-4xl">
                    🥗
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No items found</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                    We couldn't find any products in the "{categoryName}" category at the moment.
                </p>
                <Link href="/" className="bg-[#D35400] text-white font-bold px-8 py-3 rounded-full hover:bg-[#e67e22] transition-colors">
                    Browse All Foods
                </Link>
            </div>
        )}

      </main>
    </ClientHomeWrapper>
  );
}
