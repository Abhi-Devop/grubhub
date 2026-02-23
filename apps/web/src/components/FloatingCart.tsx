"use client";

import { useCart } from "@/store/useCart";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingCart() {
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
           key={totalItems} 
           initial={{ y: 100, scale: 0.9 }}
           animate={{ y: 0, scale: 1 }}
           exit={{ y: 100, scale: 0.9 }}
           transition={{ type: "spring", stiffness: 300, damping: 20 }}
           className="fixed bottom-4 left-4 right-4 z-50"
        >
          <Link href="/cart">
            <div className="bg-[#0c831f] text-white p-4 rounded-xl shadow-xl shadow-green-900/20 flex items-center justify-between backdrop-blur-md">
              <div className="flex flex-col">
                 <div className="font-bold text-xs uppercase tracking-wider opacity-90">
                   {totalItems} LEVELS UNLOCKED
                 </div>
                 <div className="font-extrabold text-lg flex items-center gap-1">
                   {totalItems} Items <span className="opacity-60 text-sm font-normal">|</span> ₹{(totalPrice / 100).toFixed(2)}
                 </div>
              </div>
              
              <div className="flex items-center gap-2 font-bold text-base bg-black/10 px-3 py-1.5 rounded-lg">
                View Cart <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
