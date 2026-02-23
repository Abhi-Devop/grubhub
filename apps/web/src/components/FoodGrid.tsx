"use client";

import React from "react";
import { motion } from "framer-motion";
import FoodCard from "@/components/FoodCard";
import { FoodItem } from "@/lib/data";

interface FoodGridProps {
  items: any[]; // Accepting mapped items from page.tsx
}

export default function FoodGrid({ items }: FoodGridProps) {
  if (!items?.length) return null;

  return (
    <div className="w-full mt-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-bold text-lg text-gray-900">Quick Picks</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {items.map((item, index) => (
           <FoodCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
