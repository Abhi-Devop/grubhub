"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import RestaurantCard, { Restaurant } from "@/components/restaurant/RestaurantCard";
import Loading from "@/app/loading";
import { Search } from "lucide-react";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        // This endpoint will fail until backend Phase 2 is done.
        // We can add mock data fallback here if needed.
        const data: any = await apiClient.get("/restaurants");
        setRestaurants(data);
      } catch (err) {
        console.error("Failed to fetch restaurants", err);
        // Mock data for UI development
        setRestaurants([
            { id: "1", name: "Punjab Grill", rating: 4.5, deliveryTime: "30-40 min", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", tags: ["North Indian", "Mughlai"], address: "Connaught Place" },
            { id: "2", name: "La Pino'z Pizza", rating: 4.2, deliveryTime: "25-35 min", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80", tags: ["Pizza", "Italian"], address: "Sector 18" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pb-24">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Restaurants Nearby</h1>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
               type="text" 
               placeholder="Search restaurants or cuisines..." 
               className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {loading ? (
           <Loading />
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(r => (
                 <RestaurantCard key={r.id} restaurant={r} />
              ))}
              {filteredRestaurants.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-500">
                    No restaurants found matching "{searchTerm}"
                </div>
              )}
           </div>
        )}
      </div>
    </div>
  );
}
