import { Suspense } from "react";
import { db } from "@/lib/db";
import Navbar from "@/components/Navbar";
import { Star, Clock, MapPin, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { MenuContent, MenuSkeleton } from "@/components/restaurant/MenuContent";

export default async function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  let restaurant: any = null;

  try {
    const numericId = parseInt(id);
    if (!isNaN(numericId)) {
        restaurant = await db.store.findUnique({
            where: { id: numericId }
        });
    }
  } catch (error) {
     console.warn("DB Store fetch failed, using fallback UI", error);
  }

  // Fallback if not found in DB
  if (!restaurant) {
      restaurant = {
          id, 
          name: "Punjab Grill", 
          rating: 4.5, 
          deliveryTime: "30-40 min", 
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", 
          tags: ["North Indian", "Mughlai"], 
          address: "Connaught Place, New Delhi" 
      };
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 w-full bg-gray-900">
         <div className="absolute inset-0 opacity-60 overflow-hidden">
            <img 
                src={restaurant.image} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                alt={restaurant.name} 
            />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
         
         <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 text-white container mx-auto max-w-6xl">
             <Link href="/restaurants" className="inline-flex items-center gap-1 text-white/80 hover:text-white mb-6 text-sm font-bold tracking-tight group">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <ChevronLeft size={16} /> 
                </div>
                Back to Collection
             </Link>
             <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">{restaurant.name}</h1>
             <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-bold">
                <span className="flex items-center gap-1.5 bg-green-600 px-3 py-1 rounded-full text-white shadow-lg shadow-green-900/20">
                    {restaurant.rating} <Star size={14} fill="currentColor" stroke="none" />
                </span>
                <span className="flex items-center gap-2 text-white/90">
                    <Clock size={18} className="text-[#D35400]" /> {restaurant.deliveryTime || "30-45 min"}
                </span>
                <span className="flex items-center gap-2 text-white/90">
                    <MapPin size={18} className="text-[#D35400]" /> {restaurant.address || "New Delhi"}
                </span>
             </div>
             {restaurant.tags && (
                <p className="mt-4 text-white/60 text-[11px] font-black uppercase tracking-[0.2em]">
                    {restaurant.tags.join(" • ")}
                </p>
             )}
         </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12">
         <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Curated Menu</h2>
            <div className="h-1 w-20 bg-[#D35400] rounded-full"></div>
         </div>
         
         <Suspense fallback={<MenuSkeleton />}>
            <MenuContent storeId={id} />
         </Suspense>
      </div>
    </div>
  );
}
