"use client";
import React from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Percent, Timer, Star } from "lucide-react";
import Image from "next/image";
import { ALL_ITEMS } from "@/lib/data";
import FoodCard from "@/components/FoodCard";

export default function OffersPage() {
  const discountedItems = ALL_ITEMS.slice(0, 8); // Mocking discounted items

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <div className="pt-24 px-4 container mx-auto max-w-6xl">
        
        {/* Header Banner */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white mb-10 shadow-xl relative overflow-hidden"
        >
            <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
                    SUPER DEALS
                </h1>
                <p className="text-xl opacity-90 font-medium mb-6">
                    Save up to 60% on your favorite restaurants. Limited time offers ending soon!
                </p>
                <div className="flex gap-4">
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        <Timer size={20} /> Ends in 02:45:12
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
            <div className="absolute -bottom-10 -right-10 text-white/10 rotate-12">
                <Percent size={300} strokeWidth={4} />
            </div>
        </motion.div>

        {/* Coupons Section */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Percent className="text-brand-orange" /> Bank Offers & Coupons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
                { code: "GRUB50", desc: "Flat 50% OFF on first order", color: "bg-orange-50 border-orange-200 text-orange-700" },
                { code: "HDFC10", desc: "10% Cashback using HDFC Cards", color: "bg-blue-50 border-blue-200 text-blue-700" },
                { code: "FREEDEL", desc: "Free Delivery on orders above ₹199", color: "bg-green-50 border-green-200 text-green-700" },
            ].map((offer, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`border-2 border-dashed rounded-xl p-4 flex flex-col justify-between h-32 cursor-pointer hover:shadow-md transition-shadow ${offer.color}`}
                >
                    <div className="font-bold text-lg">{offer.code}</div>
                    <div className="text-sm font-medium opacity-80">{offer.desc}</div>
                    <div className="text-xs uppercase font-extrabold tracking-wide self-end bg-white px-2 py-1 rounded">Copy Code</div>
                </motion.div>
            ))}
        </div>

        {/* Discounted Items Grid */}
        <h2 className="text-2xl font-bold mb-6">🔥 Hot Deals Near You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountedItems.map(item => (
                <div key={item.id} className="relative">
                    <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                        50% OFF
                    </div>
                    <FoodCard item={item} />
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}
