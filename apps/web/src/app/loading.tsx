import Navbar from "@/components/Navbar";

export default function Loading() {
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="bg-[#fcfaf8] min-h-screen font-sans">
      <Navbar />
      
      <main className="pb-20">
        {/* Placeholder for Hero */}
        <div className="w-full h-[60vh] md:h-[80vh] bg-stone-200/50 animate-pulse" />

        <div className="max-w-7xl mx-auto px-6 mt-20 space-y-32">
          <section>
            {/* Section Header Skeleton */}
            <div className="flex flex-col items-center justify-center text-center mb-16 pb-8 border-b border-stone-200">
                <div className="h-10 w-64 bg-stone-200/60 animate-pulse mb-3 rounded-md" />
                <div className="h-4 w-32 bg-stone-200/60 animate-pulse rounded-md" />
            </div>

            {/* Product Grid Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
              {skeletonCards.map((_, i) => (
                <div key={i} className="flex flex-col">
                  {/* Image Container Skeleton */}
                  <div className="mb-6 overflow-hidden bg-[#fdfbf7]">
                     <div className="aspect-[4/5] w-full bg-stone-200/60 animate-pulse rounded-md"></div>
                  </div>

                  {/* Content Skeleton */}
                  <div className="flex flex-col flex-1 pb-4">
                     {/* Title */}
                     <div className="h-6 w-3/4 bg-stone-200/60 animate-pulse mb-3 rounded-md"></div>
                     
                     {/* Rating */}
                     <div className="flex items-center gap-2 mb-6">
                         <div className="h-4 w-24 bg-stone-200/60 animate-pulse rounded-md"></div>
                         <div className="h-4 w-10 bg-stone-200/60 animate-pulse rounded-md"></div>
                     </div>

                     {/* Footer Row */}
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-4 border-t border-stone-100 pt-5">
                         <div className="h-5 w-16 bg-stone-200/60 animate-pulse rounded-md"></div>
                         <div className="h-4 w-24 bg-stone-200/60 animate-pulse rounded-md"></div>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
