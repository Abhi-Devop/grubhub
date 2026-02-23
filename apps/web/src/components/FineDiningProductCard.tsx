"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/useCart";
import { useToast } from "@/components/ui/Toast";

interface FineDiningProductCardProps {
  id: string; // Product slug/id
  storeProductId?: string;
  name: string;
  price: number;
  image: string;
  rating?: number;
  numReviews?: number;
  isVeg?: boolean;
  // In a real app, you might fetch specific chef data. Here we mock or use a prop if available.
  chefAvatar?: string; 
}

export default function FineDiningProductCard({ 
  id, 
  storeProductId, 
  name, 
  price, 
  image, 
  rating = 4.8, 
  numReviews = 124,
  isVeg
}: FineDiningProductCardProps) {
  
  const { addItem } = useCart();
  const { success, error } = useToast();

  const handleAdd = () => {
    if (!storeProductId) {
       error("Item unavailable");
       return;
    }
    addItem({
      storeProductId,
      name,
      price,
      image,
      slug: id
    }, "1");
    success("Added to cart");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex flex-col"
    >
      {/* Image Container */}
      <Link href={`/product/${id}`} className="block relative mb-6 overflow-hidden bg-[#fdfbf7] group-hover:shadow-elevation-low transition-all">
         <div className="aspect-[4/5] w-full relative overflow-hidden">
            <Image 
               src={image || "/images/placeholder.jpg"} 
               alt={name} 
               fill
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
               className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
               quality={75}
            />
         </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 pb-4 relative z-10">
         {/* Veg/Non-Veg Indicator */}

         {isVeg !== undefined && (
            <div className="mb-2">
               {isVeg ? (
                 <span className="w-4 h-4 border border-green-600 flex items-center justify-center rounded-sm"><div className="w-2 h-2 bg-green-600 rounded-full"></div></span>
               ) : (
                 <span className="w-4 h-4 border border-red-600 flex items-center justify-center rounded-sm"><div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[8px] border-transparent border-b-red-600"></div></span>
               )}
            </div>
         )}
         
         {/* Title */}
         <h3 className="font-serif text-xl text-[#1a1a1a] mb-2 leading-snug line-clamp-2">
            {name}
         </h3>

         {/* Rating */}
         <div className="flex items-center gap-1.5 mb-6">
            <div className="flex">
               {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-[#C5A880] text-[#C5A880]" />
               ))}
            </div>
            <span className="text-xs text-stone-500 font-sans tracking-wide">({numReviews})</span>
         </div>

         {/* Footer Row */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-4 border-t border-stone-100 pt-5">
            <span className="text-sm font-sans tracking-wider text-[#1a1a1a]">
               ₹{(price / 100).toFixed(2)}
            </span>

            
            <button 
               onClick={handleAdd}
               className="text-[11px] font-sans tracking-[0.15em] uppercase text-[#1a1a1a] hover:text-[#C5A880] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-[#1a1a1a] hover:after:bg-[#C5A880] after:transition-colors text-left sm:text-right"
            >
               Add to Bag
            </button>
         </div>
      </div>
    </motion.div>
  );
}
