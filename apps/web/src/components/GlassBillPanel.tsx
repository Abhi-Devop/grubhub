"use client";

import { motion } from "framer-motion";
import { ChevronRight, Percent, Info, Clock, Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface GlassBillPanelProps {
  itemTotal: number;
  originalItemTotal: number;
  totalSavings: number;
  deliveryFee: number;
  isFreeDelivery: boolean;
  handlingCharge: number;
  smallCartFee: number;
  platformFee: number;
  lateNightFee: number;
  tipAmount: number;
  donationAmount: number;
  grandTotal: number;
}

export default function GlassBillPanel(props: GlassBillPanelProps) {
  const [fluidPercentage, setFluidPercentage] = useState(0);

  // Animate fluid on mount/update
  useEffect(() => {
    // Target is 500 for free delivery logic
    const percentage = Math.min((props.itemTotal / 500) * 100, 100);
    setFluidPercentage(percentage);
  }, [props.itemTotal]);

  const isComplete = fluidPercentage >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="sticky top-8 w-full max-w-md ml-auto"
    >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl p-8 z-10">
            
            {/* Fluid Wave Progress Bar (Embedded at top) */}
            <div className="mb-8 relative">
                <div className="h-16 w-full bg-white/30 rounded-2xl overflow-hidden relative shadow-inner border border-white/20">
                     {/* The Fluid */}
                     <motion.div 
                        className="absolute bottom-0 left-0 top-0 bg-gradient-to-r from-green-400 to-orange-400 opacity-90"
                        initial={{ width: "0%" }}
                        animate={{ width: `${fluidPercentage}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                     >
                        {/* Bubbles / Wave texture overlay */}
                        <div className="absolute inset-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
                     </motion.div>
                     
                     {/* Text Overlay */}
                     <div className="absolute inset-0 flex items-center justify-between px-5 text-sm font-bold text-gray-800 mix-blend-overlay z-20">
                         {isComplete ? (
                             <span className="flex items-center gap-2 text-green-900"><Check size={18} strokeWidth={3} /> FREE DELIVERY UNLOCKED</span>
                         ) : (
                             <span>₹{(500 - props.itemTotal / 100).toFixed(2)} more for Free Delivery</span>
                         )}
                         <span className="text-xs opacity-70">{Math.round(fluidPercentage)}%</span>
                     </div>
                </div>
            </div>

            <h3 className="font-bold text-2xl text-gray-800 mb-6 drop-shadow-sm">Order Summary</h3>

            {/* Bill Rows */}
            <div className="space-y-4 text-sm font-medium text-gray-700/80">
                <BillRow label="Subtotal" value={`₹${props.itemTotal}`} highlightValue={false} />
                
                {props.isFreeDelivery ? (
                    <BillRow label="Shipping" value="FREE" highlightValue={true} valueColor="text-green-600" />
                ) : (
                    <BillRow label="Shipping" value={`₹${props.deliveryFee}`} highlightValue={false} />
                )}

                {props.totalSavings > 0 && (
                    <div className="flex justify-between items-center py-2 px-3 bg-green-500/10 rounded-xl border border-green-500/20 text-green-700">
                        <span className="flex items-center gap-2"><Percent size={14} /> Total Savings</span>
                        <span className="font-bold">- ₹{(props.totalSavings / 100).toFixed(2)}</span>
                    </div>
                )}
                
                <div className="h-px bg-gradient-to-r from-transparent via-gray-400/30 to-transparent my-4"></div>
                
                <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{(props.grandTotal / 100).toFixed(2)}</span>
                </div>
            </div>

            {/* Candy Checkout Button */}
            <div className="mt-8 group">
                <Link href="/checkout">
                    <button className="relative w-full overflow-hidden rounded-full transition-transform active:scale-95 duration-200">
                        {/* Base Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-400 to-orange-600 shadow-[0_10px_20px_rgba(234,88,12,0.4)]"></div>
                        
                        {/* Gloss Reflection (Inner Border Top) */}
                        <div className="absolute inset-0 border-t-2 border-white/40 rounded-full"></div>
                        
                        {/* Shine Animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

                        <div className="relative py-4 px-6 flex items-center justify-center gap-3 text-white font-black text-lg tracking-wide uppercase text-shadow">
                            Proceed to Pay <ChevronRight size={22} strokeWidth={3} />
                        </div>
                    </button>
                </Link>
                <p className="text-center text-xs text-gray-500 font-medium mt-3 opacity-70">
                    Secure checkout powered by GrubHub
                </p>
            </div>
            
            {/* Background Decor */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-300/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-300/30 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    </motion.div>
  );
}

function BillRow({ label, value, highlightValue, valueColor = "text-gray-900" }: { label: string, value: string, highlightValue: boolean, valueColor?: string }) {
    return (
        <div className="flex justify-between items-center">
            <span>{label}</span>
            <span className={`font-bold ${valueColor}`}>{value}</span>
        </div>
    );
}
