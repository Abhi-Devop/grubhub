"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";

interface LiquidProgressBarProps {
  current: number;
  total: number;
}

export default function LiquidProgressBar({ current, total }: LiquidProgressBarProps) {
  const percentage = Math.min((current / total) * 100, 100);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      width: `${percentage}%`,
      transition: { duration: 0.8, ease: "easeOut" }
    });

    if (percentage >= 100 && !isUnlocked) {
      setIsUnlocked(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2D5A27', '#D35400', '#ffffff']
      });
    } else if (percentage < 100) {
      setIsUnlocked(false);
    }
  }, [percentage, controls, isUnlocked]);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-bold text-gray-600">
           {isUnlocked ? "Free Delivery Unlocked!" : `Add ₹${total - current} for Free Delivery`}
        </span>
        <span className="text-xs font-bold text-gray-400">{Math.round(percentage)}%</span>
      </div>

      <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
        {/* Liquid Bar */}
        <motion.div
          animate={controls}
          className={`absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#2D5A27] to-[#4ade80] rounded-full relative overflow-hidden`}
        >
            {/* Bubbling Effect Overlay */}
            <motion.div 
               animate={{ x: ["0%", "-50%"] }}
               transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
               className="absolute inset-0 w-[200%] h-full opacity-30"
               style={{
                   backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 10%, transparent 20%)",
                   backgroundSize: "20px 20px"
               }}
            />
            {/* Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </motion.div>
      </div>

      {isUnlocked && (
          <motion.div 
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="mt-2 text-center"
          >
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#2D5A27] text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
                  <Check size={12} /> Free Delivery Applied
              </span>
          </motion.div>
      )}
    </div>
  );
}
