"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";

interface TruckOrderButtonProps {
  onClick: () => Promise<void>;
  label?: string;
  successLabel?: string;
  className?: string;
  disabled?: boolean;
}

export default function TruckOrderButton({
  onClick,
  label = "Place Order",
  successLabel = "Order Placed",
  className = "",
  disabled = false,
}: TruckOrderButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleClick = async () => {
    if (status !== "idle" || disabled) return;
    
    setStatus("loading");
    
    try {
      // Ensure the animation plays for at least 1.5s even if the API is very fast
      // to allow the user to see the truck!
      const minAnimationTime = new Promise(resolve => setTimeout(resolve, 1500));
      await Promise.all([onClick(), minAnimationTime]);
      
      setStatus("success");
    } catch (error) {
      // If the API call fails or rejects, revert so the user can try again
      setStatus("idle");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || status !== "idle"}
      className={`relative overflow-hidden group h-14 w-full rounded-2xl font-bold transition-all duration-500 ${
        status === "idle" 
          ? "bg-gray-900 text-white hover:bg-black" 
          : status === "loading"
          ? "bg-[#1e1e1e] cursor-default"
          : "bg-green-600 text-white cursor-default shadow-[0_0_20px_rgba(34,197,94,0.3)]"
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            <span>{label}</span>
          </motion.div>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Parallax Road lines */}
            <div className="absolute inset-x-0 h-[2px] top-[60%] -translate-y-1/2 flex gap-8 px-2 overflow-hidden opacity-30">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 200 }}
                  animate={{ x: -400 }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.05,
                  }}
                  className="h-full w-8 bg-white shrink-0"
                />
              ))}
            </div>

            {/* Truck and Box Container */}
            <motion.div
              initial={{ x: -150 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Falling Box */}
              <motion.div
                initial={{ y: -50, opacity: 0, rotate: -15 }}
                animate={{ y: -8, opacity: 1, rotate: 0 }}
                transition={{ 
                    delay: 0.6, 
                    duration: 0.4, 
                    type: "spring", 
                    bounce: 0.4 
                }}
                className="absolute left-[8px] z-20"
              >
                <div className="w-5 h-5 bg-[#d4a373] border-b-2 border-r-2 border-[#bc8a5f] rounded-sm shadow-sm relative">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#bc8a5f]/30" />
                    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#bc8a5f]/30" />
                </div>
              </motion.div>

              {/* Truck Body (SVG for premium look) */}
              <motion.div
                animate={{ y: [0, -1, 0] }}
                transition={{ duration: 0.15, repeat: Infinity }}
                className="relative"
              >
                <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Trailer */}
                    <rect x="2" y="5" width="38" height="20" rx="2" fill="white" />
                    {/* Cabin */}
                    <path d="M40 10H52C54.2091 10 56 11.7909 56 14V25H40V10Z" fill="white" />
                    {/* Window */}
                    <path d="M48 13H53V18H44L48 13Z" fill="#1e1e1e" opacity="0.2" />
                    {/* Front bumper */}
                    <rect x="56" y="20" width="2" height="3" fill="#ccc" />
                    {/* Wheels */}
                    <circle cx="12" cy="25" r="4" fill="#111" />
                    <circle cx="12" cy="25" r="2" fill="#555" />
                    <circle cx="32" cy="25" r="4" fill="#111" />
                    <circle cx="32" cy="25" r="2" fill="#555" />
                    <circle cx="48" cy="25" r="4" fill="#111" />
                    <circle cx="48" cy="25" r="2" fill="#555" />
                </svg>
                
                {/* Wheel Rotation Animation */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {[12, 32, 48].map((x) => (
                        <motion.div
                            key={x}
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                            style={{ left: x - 4, top: 21 }}
                            className="absolute w-8 h-8 flex items-center justify-center overflow-hidden opacity-0"
                        >
                            {/* Hidden but used to sync rotation logic if needed for complex SVGs */}
                        </motion.div>
                    ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Acceleration effect on transition to success */}
            <AnimatePresence>
                {status === "loading" && (
                    <motion.div 
                        exit={{ x: 300, transition: { duration: 0.5, ease: "easeIn" } }}
                        className="absolute inset-0 pointer-events-none"
                    />
                )}
            </AnimatePresence>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <Check size={16} className="text-green-600" strokeWidth={4} />
            </div>
            <span className="tracking-tight">{successLabel}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Light effect */}
      {status === "idle" && (
        <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[35deg] group-hover:left-[150%] transition-all duration-1000" />
      )}
    </button>
  );
}
