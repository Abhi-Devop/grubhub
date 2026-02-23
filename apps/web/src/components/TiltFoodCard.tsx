"use client";

import { motion } from "framer-motion";
import { Plus, Minus, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface TiltFoodCardProps {
  item: {
    storeProductId: string;
    name: string;
    price: number;
    image?: string | null;
    quantity: number;
    description?: string;
    slug?: string;
  };
  onUpdateQuantity: (id: string, delta: number) => void;
}

export default function TiltFoodCard({ item, onUpdateQuantity }: TiltFoodCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        whileHover={{ 
          rotateX: 0, 
          rotateY: 0, 
          scale: 1.05,
          zIndex: 10,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
        }}
        animate={{ 
            rotateX: 5, 
            rotateY: 10,
            boxShadow: "0 20px 50px -12px rgba(0,0,0,0.2)" 
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-white rounded-3xl overflow-hidden h-full flex flex-col transform-preserve-3d"
      >
        {/* Image Section (60% Height) */}
        <Link href={`/product/${item.slug || item.storeProductId}`} className="relative h-48 sm:h-56 w-full bg-gray-100 block group">
          {item.image && !imageError ? (
             <Image 
                src={item.image} 
                fill 
                className="object-cover" 
                alt={item.name} 
                onError={() => setImageError(true)}
             />
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-400">
                <UtensilsCrossed size={32} strokeWidth={1.5} />
             </div>
          )}
          {/* Shine Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Link>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-1 justify-between">
           <div>
              <Link href={`/product/${item.slug || item.storeProductId}`} className="font-bold text-gray-800 text-lg leading-tight mb-1 line-clamp-2 hover:text-[#D35400] transition-colors">{item.name}</Link>
              <p className="text-xs text-gray-400 line-clamp-2">{item.description || "Refreshing and delicious"}</p>
           </div>

           <div className="flex items-center justify-between mt-4">
              <span className="font-black text-xl text-gray-900">₹{(item.price / 100).toFixed(2)}</span>
              
              {/* Neumorphic Counter */}
              <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
                 <button 
                    onClick={() => onUpdateQuantity(item.storeProductId, -1)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 shadow-sm hover:scale-110 active:scale-95 transition-all text-xs"
                 >
                    <Minus size={14} strokeWidth={3} />
                 </button>
                 <span className="w-8 text-center font-bold text-sm text-gray-700">{item.quantity}</span>
                 <button 
                    onClick={() => onUpdateQuantity(item.storeProductId, 1)}
                    className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-200 hover:scale-110 active:scale-95 transition-all text-xs"
                 >
                    <Plus size={14} strokeWidth={3} />
                 </button>
              </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
