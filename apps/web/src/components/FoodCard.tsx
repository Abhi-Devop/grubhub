"use client";

import React, { useRef } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { motion } from "framer-motion";
import { Star, Clock, Plus } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useFlyAnimation } from "@/components/FlyingCartAnimation";
import { FoodItem } from "@/lib/data";

interface FoodCardProps {
  item: FoodItem | any;
  index?: number;
}

export default function FoodCard({ item, index = 0 }: FoodCardProps) {
  const { addItem } = useCart();
  const { triggerAnimation } = useFlyAnimation();
  const ref = useRef<HTMLDivElement>(null);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    triggerAnimation(rect.left, rect.top, item.image || "/placeholder-food.jpg");
    
    addItem(
      { storeProductId: item.id, name: item.name, price: item.price },
      "global-grubhub"
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="relative group w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
        <Link href={`/product/${encodeURIComponent(item.id)}`} className="block h-full flex flex-col">
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-50">
                <SafeImage
                    src={item.image || "/placeholder-food.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                
                {/* Rating Badge */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-gray-900">{item.rating || 4.2}</span>
                </div>

                {/* Time Badge */}
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Clock size={12} className="text-white" />
                    <span className="text-xs font-medium text-white">{item.time || "25m"}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                    <h3 className="font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.description || "Delicious food item"}</p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="font-bold text-gray-900">₹{(item.price / 100).toFixed(2)}</span>
                    
                    <button
                        onClick={handleAdd}
                        className="bg-gray-100 hover:bg-[#2D5A27] hover:text-white text-gray-700 p-2 rounded-full transition-colors"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            </div>
        </Link>
    </motion.div>
  );
}
