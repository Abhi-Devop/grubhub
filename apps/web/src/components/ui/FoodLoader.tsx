"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Pizza, Sandwich } from "lucide-react";

export default function FoodLoader() {
  const [index, setIndex] = useState(0);

  const icons = [
    { component: Sandwich, color: "text-orange-500" }, // Hamburger substitute
    { component: Utensils, color: "text-gray-600" },
    { component: Pizza, color: "text-red-500" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 800);
    return () => clearInterval(timer);
  }, [icons.length]);

  const CurrentIcon = icons[index].component;

  return (
    <div className="flex items-center justify-center p-10">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute"
          >
            <div className={`p-4 bg-white rounded-2xl shadow-xl border border-gray-100 ${icons[index].color}`}>
              <CurrentIcon size={48} />
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Orbiting particles */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-full"
        >
             <div className="absolute top-0 left-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-lg -translate-x-1/2 -translate-y-2" />
             <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-green-400 rounded-full shadow-lg -translate-x-1/2 translate-y-2" />
        </motion.div>
      </div>
    </div>
  );
}
