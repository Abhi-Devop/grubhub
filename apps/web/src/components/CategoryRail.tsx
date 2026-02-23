"use client";

import React from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { motion } from "framer-motion";

interface CategoryRailProps {
  categories: { id: string; name: string; image: string }[];
}

export default function CategoryRail({ categories }: CategoryRailProps) {
  return (
    <div className="w-full mt-4">
         <div className="flex items-center justify-between px-2 mb-4">
            <h2 className="font-bold text-lg text-gray-800">Explore Cuisines</h2>
         </div>
         <div className="flex items-start justify-between w-full gap-4 overflow-x-auto no-scrollbar pb-4 px-2 scroll-pl-4 snap-x">
            {categories.map((cat) => (
                <motion.div 
                    key={cat.id} 
                    className="snap-start shrink-0 min-w-[80px] flex flex-col items-center"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link 
                        href={`/category/${encodeURIComponent(cat.name)}`} 
                        className="flex flex-col items-center gap-2 group cursor-pointer w-full"
                    >
                        {/* The Hover Ring Container */}
                        <div className="p-[3px] rounded-full border-2 border-transparent group-hover:border-[#D35400] transition-colors duration-300">
                             {/* The Image Container */}
                             <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-100 shadow-sm ring-1 ring-black/5 group-hover:shadow-md transition-all duration-300">
                                 <SafeImage 
                                    src={cat.image} 
                                    alt={cat.name} 
                                    fill 
                                    sizes="(max-width: 768px) 64px, 80px"
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                 />
                             </div>
                        </div>
                        
                        <span className="text-gray-700 text-[11px] font-semibold text-center leading-tight w-full px-1 break-words line-clamp-2 tracking-wide group-hover:text-[#D35400] transition-colors">
                            {cat.name}
                        </span>
                    </Link>
                </motion.div>
            ))}
         </div>
    </div>
  );
}
