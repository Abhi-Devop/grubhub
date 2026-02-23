"use client";
import React, { useState } from "react";

interface Category {
  id: string;
  name: string;
  image: string;
}

// Categories matching data.ts (Fallback)
const CATEGORIES_DATA = [
    { id: "Biryani World", name: "Biryani", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=200&auto=format&fit=crop" },
    { id: "North Indian Spice", name: "North Indian", image: "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=200&auto=format&fit=crop" },
    { id: "South Indian Tiffins", name: "South Indian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=200&auto=format&fit=crop" },
    { id: "Street Food Hits", name: "Street Food", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=200&auto=format&fit=crop" },
    { id: "Late Night Munchies", name: "Munchies", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop" },
    { id: "Vegetables & Fruits", name: "Essentials", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=200&auto=format&fit=crop" },
];

interface CategoryCarouselProps {
    onSelectCategory: (id: string) => void;
    categories?: Category[];
}

export const CategoryCarousel = ({ onSelectCategory, categories = CATEGORIES_DATA }: CategoryCarouselProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const displayCategories = categories.length > 0 ? categories : CATEGORIES_DATA;

  const handleSelect = (cat: Category) => {
    setSelectedId(cat.id);
    onSelectCategory(cat.name);
  };

  return ( <div className="py-8 sticky top-[72px] z-40 bg-gray-50/95 backdrop-blur-xl border-b border-gray-100/50 mb-10">
       <div className="max-w-[1200px] mx-auto px-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-1">Explore Menu</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-1">
                {displayCategories.map((cat) => (
                    <button 
                    key={cat.id} 
                    onClick={() => handleSelect(cat)}
                    className={`flex flex-col items-center gap-4 min-w-[110px] pb-3 rounded-2xl cursor-pointer group transition-all duration-300 hover:bg-white`}
                    >
                        <div className={`w-28 h-28 rounded-2xl overflow-hidden relative shadow-sm transition-all duration-300 
                            ${selectedId === cat.id ? 'ring-4 ring-brand-orange shadow-md scale-105' : 'group-hover:shadow-lg group-hover:-translate-y-1'}`}>
                            <img src={cat.image || "/placeholder-food.jpg"} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <span className={`text-sm font-bold text-center whitespace-nowrap px-4 py-1.5 rounded-full transition-all
                            ${selectedId === cat.id ? 'bg-brand-orange text-white shadow-md' : 'text-gray-700 group-hover:text-brand-orange'}`}>
                            {cat.name}
                        </span>
                    </button>
                ))}
            </div>
       </div>
    </div>
  );
};
