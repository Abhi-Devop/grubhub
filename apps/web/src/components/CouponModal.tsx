"use client";

import { motion } from "framer-motion";
import { X, Tag, TicketPercent, Check } from "lucide-react";
import { useState } from "react";

interface CouponModalProps {
  onClose: () => void;
  onApply: (code: string, discount: number) => void;
}

export default function CouponModal({ onClose, onApply }: CouponModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const coupons = [
      { code: "WELCOME50", discount: 50, desc: "Flat ₹50 off on first order" },
      { code: "GRUBHUB20", discount: 20, desc: "20% off up to ₹100" },
      { code: "FREEDEL", discount: 35, desc: "Free Delivery on orders > ₹200" }
  ];

  const handleApply = (couponCode: string, discount: number) => {
      onApply(couponCode, discount);
      onClose();
  };

  const handleManualApply = () => {
      const coupon = coupons.find(c => c.code === code.toUpperCase());
      if (coupon) {
          handleApply(coupon.code, coupon.discount);
      } else {
          setError("Invalid coupon code");
      }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <TicketPercent size={20} className="text-[#D35400]" />
                Apply Coupon
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
            </button>
        </div>

        <div className="p-6 space-y-6">
            <div className="flex gap-2">
                <input 
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setError(""); }}
                    placeholder="Enter coupon code"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold bg-white focus:border-[#D35400] outline-none transition-colors uppercase placeholder:normal-case"
                />
                <button 
                    onClick={handleManualApply}
                    className="bg-gray-900 text-white font-bold px-6 rounded-xl hover:bg-black transition-colors"
                >
                    APPLY
                </button>
            </div>
            {error && <p className="text-red-500 text-xs font-bold -mt-4 ml-1">{error}</p>}

            <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Available Coupons</h3>
                <div className="space-y-3">
                    {coupons.map((c) => (
                        <button 
                            key={c.code}
                            onClick={() => handleApply(c.code, c.discount)}
                            className="w-full text-left bg-white border border-dashed border-gray-300 rounded-xl p-4 hover:border-[#D35400] hover:bg-orange-50/50 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-[#D35400] transition-colors"></div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-black text-gray-800 text-lg border-b-2 border-transparent group-hover:border-[#D35400]/20 inline-block mb-1">
                                        {c.code}
                                    </h4>
                                    <p className="text-sm text-gray-500">{c.desc}</p>
                                </div>
                                <span className="font-bold text-[#D35400] text-sm">APPLY</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
