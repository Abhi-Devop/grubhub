import { Suspense } from "react";
import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import ClientHomeWrapper from "@/components/ClientHomeWrapper";
import FineDiningHero from "@/components/FineDiningHero";
import FineDiningCategoryNav from "@/components/FineDiningCategoryNav";
import FineDiningProductCard from "@/components/FineDiningProductCard";

// Ensure fresh data on every request
export const dynamic = "force-dynamic";

function MenuSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-10 space-y-16 animate-pulse">
      {/* Fake Category Nav */}
      <div className="flex gap-8 border-b border-stone-200 pb-2">
        <div className="h-6 w-24 bg-stone-200 rounded"></div>
        <div className="h-6 w-32 bg-stone-200 rounded"></div>
        <div className="h-6 w-28 bg-stone-200 rounded"></div>
      </div>
      
      {/* Fake Category Section */}
      <div className="space-y-10">
        <div className="flex flex-col items-center">
          <div className="h-10 w-48 bg-stone-200 rounded mb-3"></div>
          <div className="h-4 w-32 bg-stone-100 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col">
               <div className="aspect-[4/5] w-full bg-stone-200 rounded-lg mb-6"></div>
               <div className="h-6 w-3/4 bg-stone-200 rounded mb-2"></div>
               <div className="h-4 w-1/4 bg-stone-200 rounded mb-6"></div>
               <div className="flex justify-between mt-auto pt-5 border-t border-stone-100">
                  <div className="h-5 w-16 bg-stone-200 rounded"></div>
                  <div className="h-5 w-24 bg-stone-200 rounded"></div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function MenuContent({ isVegOnly }: { isVegOnly: boolean }) {
  // Fetch ALL Categories with their Products
  const categoriesRaw = await db.category.findMany({
    include: {
      products: {
        where: isVegOnly ? { isVeg: true } : undefined,
        take: 8, // Limit items per category
        include: {
          storeProducts: {
            where: { isAvailable: true },
            take: 1
          }
        }
      }
    },
    orderBy: { name: 'asc' }
  });

  const categories = categoriesRaw
    .filter(c => c.products.length > 0)
    .map(c => ({
      id: c.id,
      name: c.name,
      products: c.products.map(p => ({
        id: String(p.slug || p.id),
        name: p.name,
        image: p.image,
        price: p.storeProducts[0]?.price || 0,
        storeProductId: String(p.storeProducts[0]?.id || 0),
        rating: p.rating ?? undefined,
        numReviews: p.numReviews ?? undefined,
        isVeg: p.isVeg ?? undefined
      }))
    }));

  const navCategories = categories.map(c => ({ id: String(c.id), name: c.name }));

  return (
    <>
      <FineDiningCategoryNav id="menu-start" categories={navCategories} />

      <div className="max-w-7xl mx-auto px-6 mt-20 space-y-32">
        {categories.map((category) => (
            <section 
                key={category.id} 
                id={String(category.id)}
                className="scroll-mt-[220px]" 
            >
                <div className="flex flex-col items-center justify-center text-center mb-16 pb-8 border-b border-stone-200">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-3">
                        {category.name}
                    </h2>
                    <p className="text-stone-400 font-sans text-xs tracking-[0.2em] uppercase">
                        The Collection
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                    {category.products.map((product) => (
                        <FineDiningProductCard 
                            key={product.id}
                            {...product}
                        />
                    ))}
                </div>
            </section>
        ))}

        {categories.length === 0 && (
            <div className="text-center py-20">
                <p className="text-[#0f291e] font-serif text-xl">
                  {isVegOnly ? "No vegetarian items available." : "Menu is currently being updated."}
                </p>
            </div>
        )}
      </div>
    </>
  );
}

export default async function Home({ searchParams }: { searchParams: { vegOnly?: string } }) {
  const isVegOnly = searchParams.vegOnly === 'true';

  return (
    <ClientHomeWrapper>
        <div className="bg-[#fcfaf8] min-h-screen font-sans">
          <Navbar />
          <main className="pb-20">
            <FineDiningHero />
            
            <Suspense fallback={<MenuSkeleton />}>
               <MenuContent isVegOnly={isVegOnly} />
            </Suspense>
          </main>
        </div>
    </ClientHomeWrapper>
  );
}
