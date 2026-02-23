"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function PromoBanner() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mb-8 h-auto lg:h-[400px]">
        
        {/* Main Feature Card (Span 2) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 relative bg-[#2D5A27] rounded-[2rem] overflow-hidden shadow-sm group cursor-pointer min-h-[300px]"
        >
            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0 duration-700" />
            
            <div className="relative z-10 p-8 h-full flex flex-col justify-between items-start">
                <div>
                    <span className="inline-block px-3 py-1 bg-[#D35400] text-white text-xs font-bold tracking-widest uppercase rounded-full mb-4">
                        Featured
                    </span>
                    <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-2">
                        Farm to Table <br/> <i className="font-light text-[#D35400]">Excellence</i>
                    </h3>
                </div>
                
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-[#2D5A27] font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#D35400] hover:text-white transition-colors"
                >
                    Order Now <ArrowRight size={16} />
                </motion.button>
            </div>
            
            {/* Image */}
            <div className="absolute right-0 bottom-0 w-[55%] h-[110%] translate-y-[10%] translate-x-[10%]">
                <Image 
                    src="https://images.unsplash.com/photo-1543353071-87ddb03020c0?q=80&w=800&auto=format&fit=crop"
                    alt="Healthy Food"
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover rounded-l-[100px] shadow-2xl group-hover:scale-105 transition-transform duration-700"
                />
            </div>
        </motion.div>

        {/* Right Column Stack (Span 1) */}
        <div className="flex flex-col gap-4 h-full">
            
            {/* Top Card */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex-1 bg-[#F3F4F6] rounded-[2rem] overflow-hidden p-6 flex flex-col justify-center items-start group min-h-[190px]"
            >
                <div className="relative z-10 max-w-[60%]">
                    <h4 className="text-2xl font-bold text-gray-900 mb-1">Fast Delivery</h4>
                    <p className="text-sm text-gray-500 mb-3">Under 30 mins guarantee</p>
                    <div className="bg-white p-2 rounded-full w-fit shadow-sm">
                        <Clock size={20} className="text-[#D35400]" />
                    </div>
                </div>
                <div className="absolute right-[-20%] top-[10%] w-[60%] h-[120%] rotate-12">
                     <Image 
                        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop"
                        alt="Fast Food"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover rounded-full group-hover:rotate-12 transition-transform duration-500"
                    />
                </div>
            </motion.div>

            {/* Bottom Card */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex-1 bg-[#1F2937] rounded-[2rem] overflow-hidden p-6 flex flex-col justify-center items-start group min-h-[190px]"
            >
                <div className="relative z-10 text-white max-w-[60%]">
                    <div className="flex items-center gap-1 text-yellow-400 mb-1">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold">TOP RATED</span>
                    </div>
                    <h4 className="text-xl font-bold mb-1">Chef's Special</h4>
                    <button className="text-sm text-gray-300 underline decoration-[#D35400] underline-offset-4 group-hover:text-white transition-colors">
                        View Menu
                    </button>
                </div>
                <div className="absolute right-0 bottom-0 w-[50%] h-[100%]">
                     <Image 
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop"
                        alt="Chef Special"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover rounded-tl-[2rem] group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            </motion.div>

        </div>
    </div>
  );
}
