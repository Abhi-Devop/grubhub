"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CategoryScrollerProps {
  categories: { id: string; name: string; image: string }[];
}

export default function CategoryScroller({ categories }: CategoryScrollerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  return (
    <div className="w-full">
         <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-xl text-gray-900">Eat what makes you happy</h3>
            <Link href="/categories" className="text-[#D35400] text-sm font-semibold hover:underline">
                View all
            </Link>
         </div>
         
         <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 scroll-pl-4 snap-x"
         >
            {categories.map((cat) => (
                <motion.div key={cat.id} variants={itemVariants} className="snap-start shrink-0">
                    <Link 
                        href={`/category/${encodeURIComponent(cat.name)}`} 
                        className="flex flex-col items-center gap-2 group cursor-pointer w-24"
                    >
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-md ring-2 ring-transparent group-hover:ring-[#D35400] transition-all duration-300">
                             <Image 
                                src={cat.image} 
                                alt={cat.name} 
                                fill 
                                sizes="(max-width: 768px) 100px, 120px"
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                             />
                        </div>
                        
                        <span className="text-gray-700 text-sm font-medium text-center leading-tight group-hover:text-[#D35400] transition-colors line-clamp-2 w-full">
                            {cat.name}
                        </span>
                    </Link>
                </motion.div>
            ))}
         </motion.div>
    </div>
  );
}
