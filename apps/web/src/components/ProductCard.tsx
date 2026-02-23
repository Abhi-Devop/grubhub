"use client";

import Image from "next/image";
import { Plus, Heart, Star } from "lucide-react";
import { FoodItem } from "@/lib/data";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { motion } from "framer-motion";

interface ProductCardProps {
  item: FoodItem;
}

import { useFlyAnimation } from "@/components/FlyingCartAnimation";

export default function ProductCard({ item }: ProductCardProps) {
  const { addItem } = useCart();
  const { triggerAnimation } = useFlyAnimation();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    triggerAnimation(rect.left, rect.top, item.image || "/placeholder-food.jpg");
    
    addItem(
      { storeProductId: item.id, name: item.name, price: item.price, slug: item.slug },
      "1"
    );
  };

  // Mock weight and discount for Zepto feel
  const weight = "500g";
  const discount = Math.floor(Math.random() * 20) + 5; 

  return (
    <motion.div 
        className="bg-white rounded-[2rem] border border-gray-100/80 flex flex-col h-full card-hover group relative overflow-hidden"
    >
        <Link href={`/product/${encodeURIComponent(item.slug ?? item.sku ?? item.id)}`} className="absolute inset-0 z-10" />
        
        {/* Discount Badge */}
        {discount > 10 && (
            <div className="absolute top-4 left-4 z-20 brand-glass px-2.5 py-1 rounded-full shadow-sm pointer-events-none">
                <span className="text-[10px] font-black text-[#D35400] tracking-tighter uppercase whitespace-nowrap">
                    {discount}% OFF
                </span>
            </div>
        )}

        {/* Favorite Icon */}
        <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 z-20 p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:text-red-500 hover:bg-white transition-all duration-300 ring-1 ring-white/30"
        >
            <Heart size={14} strokeWidth={2.5} />
        </motion.button>

        {/* Image - Aspect 4:3 */}
        <div className="relative aspect-[4/3] w-full bg-gray-50 flex items-center justify-center image-zoom-hover rounded-t-[2rem]">
             <Image 
                src={item.image || "/placeholder-food.jpg"} 
                alt={item.name} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                quality={75}
                priority={true}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 px-5 py-5 relative">
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-green-50 px-2 py-0.5 rounded-full text-[10px] font-bold text-[#2D5A27] flex items-center gap-1 border border-green-100/50">
                    <Star size={10} className="fill-[#2D5A27]" />
                    {item.rating || 4.5}
                </div>
                <span className="text-[10px] text-gray-400 font-semibold tracking-tight uppercase">1.2k Reviews</span>
            </div>

            <h3 className="text-base font-extrabold text-gray-900 line-clamp-2 leading-[1.2] mb-1 group-hover:text-[#D35400] transition-colors min-h-[2.4em]">
                {item.name}
            </h3>
            <span className="text-[10px] text-gray-400 font-bold mb-5 uppercase tracking-[0.1em]">{weight}</span>

            <div className="mt-auto flex items-center justify-between relative z-20 pt-4 border-t border-gray-50">
                <div className="flex flex-col leading-none">
                     <span className="text-[10px] text-gray-400 line-through font-bold mb-1">₹{(item.price + 50 / 100).toFixed(2)}</span>
                     <span className="text-lg font-black text-gray-900 tracking-tight">₹{(item.price / 100).toFixed(2)}</span>
                </div>
                
                <motion.button 
                    whileTap={{ scale: 0.92 }}
                    onClick={handleAdd}
                    className="btn-tactile group/btn relative overflow-hidden bg-gray-900 text-white font-bold text-[10px] h-9 px-6 rounded-xl flex items-center justify-center hover:bg-[#D35400] transition-all shadow-lg hover:shadow-[#D35400]/20 uppercase tracking-widest ring-1 ring-white/10"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        ADD <Plus size={14} strokeWidth={3} />
                    </span>
                </motion.button>
            </div>
        </div>
    </motion.div>
  );
}
