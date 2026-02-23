"use client";

import React from "react";
import { ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface BillDetailsProps {
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  gst: number;
  total: number;
  savings: number;
  onCheckout: () => void;
  isCheckingOut: boolean;
}

export default function BillDetails({
  subtotal,
  deliveryFee,
  platformFee,
  gst,
  total,
  savings,
  onCheckout,
  isCheckingOut,
}: BillDetailsProps) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] sticky top-24 overflow-hidden"
    >
      {/* Header */}
      <div className="pb-4 border-b border-gray-100 mb-4">
        <h3 className="font-bold text-gray-900 text-lg">Bill Summary</h3>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Item Total</span>
          <span className="font-medium text-gray-900 font-mono tracking-tight">₹{(subtotal / 100).toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="flex items-center gap-1">
             Delivery Fee <span className="text-xs text-gray-400"> | 2.5 kms</span>
          </span>
          {deliveryFee === 0 ? (
            <span className="font-bold text-green-600">FREE</span>
          ) : (
            <span className="font-medium text-gray-900 font-mono tracking-tight">₹{(deliveryFee / 100).toFixed(2)}</span>
          )}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Platform Fee</span>
          <span className="font-medium text-gray-900 font-mono tracking-tight">₹{(platformFee / 100).toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>GST & Charges</span>
          <span className="font-medium text-gray-900 font-mono tracking-tight">₹{(gst / 100).toFixed(2)}</span>
        </div>

        <div className="h-px bg-dashed border-t border-gray-200 my-3" />

        <div className="flex justify-between items-center">
          <span className="font-black text-gray-900 text-xl">To Pay</span>
          <span className="font-black text-gray-900 text-xl font-mono tracking-tight">₹{(total / 100).toFixed(2)}</span>
        </div>

        {savings > 0 && (
           <motion.div 
              animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="bg-green-50 text-green-700 text-xs font-bold px-3 py-2.5 rounded-xl mt-2 text-center border border-green-100 shadow-sm"
           >
              You saved ₹{(savings / 100).toFixed(2)} on this order!
           </motion.div>
        )}
      </div>

      {/* Action Area */}
      <div className="fixed bottom-0 left-0 w-full z-50 p-4 bg-white border-t border-gray-200 lg:static lg:p-0 lg:border-none lg:mt-6 lg:pt-4">
        <button
          onClick={onCheckout}
          disabled={isCheckingOut}
          className="group relative w-full overflow-hidden bg-[#0c831f] text-white py-4 rounded-xl font-bold shadow-lg shadow-green-900/20 hover:shadow-green-900/40 transition-all active:scale-[0.98] active:translate-y-1 active:shadow-none disabled:opacity-70"
        >
           {/* Sheen Effect */}
           <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
           
           <div className="relative z-20 flex items-center justify-between px-4">
               <span className="text-lg flex flex-col items-start leading-tight">
                 <span className="text-[10px] uppercase opacity-80 font-semibold">Total</span>
                 <span>{isCheckingOut ? "Processing..." : `Pay ₹${total}`}</span>
               </span>
               {!isCheckingOut && (
                  <div className="bg-white/20 p-2 rounded-lg">
                    <ArrowRight size={20} />
                  </div>
               )}
           </div>
        </button>

        {/* Trust Signals */}
        <div className="hidden lg:flex items-center justify-center gap-6 mt-4 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-gray-300" />
                100% Secure
            </div>
            <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-gray-300" />
                Safe Delivery
            </div>
        </div>
      </div>
    </motion.div>
  );
}
