"use client";

import { useState, useEffect } from "react";
import { Search as SearchIcon, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface SearchClientProps {
    initialProducts: any[];
    initialQuery: string;
}

export default function SearchClient({ initialProducts, initialQuery }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const filters: string[] = ["Veg", "Non-Veg", "Top Rated", "Fastest Delivery"];

  // Update local query state if URL param changes (optional, but good for sync)
  useEffect(() => {
      setQuery(initialQuery);
  }, [initialQuery]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredItems = initialProducts.filter(item => {
    // Client-side filtering on top of DB results
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || 
                        (item.category?.name || "").toLowerCase().includes(query.toLowerCase());
    
    // Note: Since DB already filtered by "contains query", this might be redundant unless user types in the input box on this page *without* hitting enter (not implemented yet, this input is just for display/refine)
    // Actually, let's allow refining:
    if (!matchesQuery) return false;

    if (activeFilters.length === 0) return true;

    return activeFilters.every(filter => {
      if (filter === "Veg") return item.isVeg;
      if (filter === "Non-Veg") return !item.isVeg;
      if (filter === "Top Rated") return item.rating >= 4.0;
      if (filter === "Fastest Delivery") return true; // Mock logic
      return true;
    });
  });

  return (
    <div className="px-4 container mx-auto max-w-7xl pt-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-brand-black tracking-tight">
                Results for "{initialQuery}"
            </h1>
            
            {/* Search Input (Refine) */}
            <div className="relative w-full md:w-96">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Refine search..."
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-gray-200 text-lg font-medium focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-sm"
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 mb-2">
           {filters.map(filter => (
             <motion.button
               whileTap={{ scale: 0.95 }}
               key={filter}
               onClick={() => toggleFilter(filter)}
               className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                 activeFilters.includes(filter) 
                   ? "bg-brand-black text-white border-brand-black shadow-lg" 
                   : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
               }`}
             >
               {filter}
             </motion.button>
           ))}
        </div>

        {/* Results */}
        <div>
          <h2 className="text-sm font-bold mb-6 text-gray-500 uppercase tracking-widest">
            {filteredItems.length > 0 ? `Found ${filteredItems.length} items` : "No items found"}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                  <Link 
                    href={`/product/${item.id}`}
                    className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col gap-2 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full"
                 >
                     <div className="relative aspect-square w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-50">
                        <Image src={item.image || "/placeholder.png"} alt={item.name} fill className="object-contain group-hover:scale-105 transition-transform duration-300" />
                     </div>
                     <div className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-green-700 transition-colors">{item.name}</div>
                     <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="text-sm font-black text-gray-900">₹{(item.storeProducts?.[0]?.price || 0 / 100).toFixed(2)}</span>
                        <button className="text-xs font-bold text-green-600 border border-green-200 rounded-lg px-3 py-1.5 bg-green-50 uppercase hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm">ADD</button>
                     </div>
                 </Link>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                  <SearchIcon size={64} className="mx-auto mb-4 opacity-20" />
                  <p className="text-lg">We couldn't find matches for "{query}"</p>
                  <Link href="/" className="text-brand-orange font-bold hover:underline mt-2 block">Go back home</Link>
              </div>
          )}
        </div>
    </div>
  );
}
