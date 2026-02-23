"use client";

import { motion } from "framer-motion";
import { Trophy, Timer } from "lucide-react";
import { useEffect, useState } from "react";

interface LiquidTrackerProps {
  currentAmount: number;
  targetAmount: number;
}

export default function LiquidTracker({ currentAmount, targetAmount }: LiquidTrackerProps) {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const isComplete = percentage >= 100;
  const [showTrophy, setShowTrophy] = useState(false);

  useEffect(() => {
    if (isComplete) {
      setShowTrophy(true);
    } else {
      setShowTrophy(false);
    }
  }, [isComplete]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
      <div className="flex items-center gap-4 relative z-10">
        <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Base Icon Circle */}
             <motion.div 
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${isComplete ? 'bg-yellow-100' : 'bg-green-50'}`}
                animate={isComplete ? { scale: [1, 1.2, 1] } : {}}
             >
                {isComplete ? (
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <Trophy className="text-yellow-600" fill="currentColor" size={24} />
                    </motion.div>
                ) : (
                    <Timer className="text-brand-green" size={24} />
                )}
             </motion.div>
             
             {/* Ring Progress (Optional, keeping it simple for now) */}
             <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle 
                    cx="24" cy="24" r="22" 
                    fill="none" 
                    stroke={isComplete ? "#EAB308" : "#10B981"} 
                    strokeWidth="2" 
                    strokeDasharray="140"
                    strokeDashoffset={140 - (140 * percentage) / 100}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                />
             </svg>
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1">
             {isComplete ? "Free Delivery Unlocked!" : `Add ₹${Math.round(targetAmount - currentAmount)} for Free Delivery`}
          </h3>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden relative">
             <motion.div 
                className="h-full bg-gradient-to-r from-emerald-400 to-green-600 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, ease: "circOut" }}
             >
                {/* Simulated Fluid/Shimmer Effect */}
                <div className="absolute inset-0 bg-white/30 skew-x-12 animate-[shimmer_2s_infinite] w-full" style={{ transform: 'translateX(-100%)' }}></div>
             </motion.div>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">
            {isComplete ? "You saved ₹35 on delivery fees" : "Get free delivery on orders above ₹500"}
          </p>
        </div>
      </div>
      
      {/* Background Liquid Wave (Subtle) */}
      {/* Could add a subtle wave SVG background here if needed for more depth */}
    </div>
  );
}
