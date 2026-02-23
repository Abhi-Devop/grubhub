"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string; // e.g., "30-40 min"
  minOrder?: number;
  address?: string;
  tags?: string[]; // ["Italian", "Pizza"]
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <motion.div
        className="bg-white rounded-[2rem] border border-gray-100 flex flex-col h-full card-hover group overflow-hidden"
      >
        <div className="relative aspect-[16/10] w-full bg-gray-50 image-zoom-hover">
           <Image
             src={restaurant.image || "/placeholder-restaurant.jpg"}
             alt={restaurant.name}
             fill
             className="object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
           <div className="absolute bottom-3 right-3 brand-glass px-3 py-1.5 rounded-full text-[10px] font-black shadow-lg flex items-center gap-1.5 text-gray-900 uppercase tracking-wider">
             <Clock size={12} strokeWidth={3} className="text-[#D35400]" />
             {restaurant.deliveryTime}
           </div>
        </div>
        
        <div className="p-6 flex flex-col flex-1">
           <div className="flex justify-between items-start mb-2.5">
              <h3 className="font-extrabold text-xl text-gray-900 line-clamp-1 tracking-tight group-hover:text-[#D35400] transition-colors">
                {restaurant.name}
              </h3>
              <div className="flex items-center gap-1 bg-green-50 text-[#2D5A27] px-2 py-0.5 rounded-full text-[10px] font-black border border-green-100/50">
                 {restaurant.rating} <Star size={10} className="fill-[#2D5A27]" />
              </div>
           </div>

           {restaurant.tags && (
             <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 line-clamp-1">
               {restaurant.tags.slice(0, 3).join(" • ")}
             </p>
           )}

           <div className="mt-auto flex items-center justify-between text-[10px] font-bold text-gray-400 border-t pt-4 border-dashed border-gray-100">
              <span className="flex items-center gap-1.5 uppercase transition-colors group-hover:text-gray-600">
                <MapPin size={12} strokeWidth={3} className="text-[#D35400]/70" />
                {restaurant.address || "Nearby"}
              </span>
              {restaurant.minOrder && (
                 <span className="bg-gray-50 px-2 py-1 rounded-md text-gray-500">MIN: ₹{(restaurant.minOrder / 100).toFixed(2)}</span>
              )}
           </div>
        </div>
      </motion.div>
    </Link>
  );
}
