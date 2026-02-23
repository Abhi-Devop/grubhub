"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ImageOff } from "lucide-react";
import { CartItem } from "@/store/useCart";

interface InteractiveCartItemProps {
  item: CartItem;
  index: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function InteractiveCartItem({ item, index, onUpdateQuantity, onRemove }: InteractiveCartItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = React.useState(item.image);
  const [imageError, setImageError] = React.useState(false);

  // Update image if item.image changes
  React.useEffect(() => {
      setImgSrc(item.image);
      setImageError(false);
  }, [item.image]);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative bg-white rounded-2xl border border-gray-100/50 shadow-xl overflow-visible group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl -z-10" />
      
      {/* Floating GLOW effect */}
      <motion.div 
         className="absolute -inset-1 bg-gradient-to-r from-orange-200 to-red-200 rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500" 
         style={{ zIndex: -20 }}
      />

      <div className="p-3 flex items-center gap-4" style={{ transform: "translateZ(20px)" }}>
         {/* 3D Image with Fallback */}
         <Link href={`/product/${item.slug || item.storeProductId}`} className="block relative w-20 h-20 flex-shrink-0 cursor-pointer">
             <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-full h-full relative rounded-2xl overflow-hidden shadow-lg border border-white bg-gray-50 flex items-center justify-center"
                style={{ transform: "translateZ(30px)" }}
             >
                {!imageError && imgSrc ? (
                    <Image 
                        src={imgSrc} 
                        alt={item.name}
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-300">
                        <ImageOff size={20} strokeWidth={1.5} />
                    </div>
                )}
             </motion.div>
         </Link>

         {/* Info */}
         <div className="flex-1 min-w-0" style={{ transform: "translateZ(10px)" }}>
             <Link href={`/product/${item.slug || item.storeProductId}`} className="block">
                 <h3 className="text-base font-black text-gray-800 truncate mb-0.5 hover:text-[#D35400] transition-colors">{item.name}</h3>
             </Link>
             <p className="text-xs font-bold text-gray-400 mb-2 font-[tnum]">₹{(item.price / 100).toFixed(2)}</p>

             <div className="flex items-center gap-4">
                 {/* Premium Counter */}
                 <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full shadow-inner">
                      <motion.button 
                          whileTap={{ scale: 0.8 }}
                          onClick={() => onUpdateQuantity(item.storeProductId, -1)}
                          className="w-8 h-8 rounded-full bg-white text-gray-600 flex items-center justify-center shadow-sm hover:text-red-500"
                      >
                          <Minus size={14} />
                      </motion.button>
                      <span className="w-8 text-center font-bold text-gray-700">{item.quantity}</span>
                      <motion.button 
                          whileTap={{ scale: 0.8 }}
                          onClick={() => onUpdateQuantity(item.storeProductId, 1)}
                          className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg shadow-gray-500/30"
                      >
                          <Plus size={14} />
                      </motion.button>
                 </div>
             </div>
         </div>

         {/* Price & Remove */}
         <div className="text-right" style={{ transform: "translateZ(15px)" }}>
             <div className="text-xl font-black text-gray-900 mb-2 font-[tnum]">₹{(item.price * item.quantity / 100).toFixed(2)}</div>
             <motion.button 
                whileHover={{ scale: 1.1, color: "#EF4444" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(item.storeProductId)}
                className="text-gray-300 hover:text-red-500 p-2"
             >
                 <Trash2 size={20} />
             </motion.button>
         </div>
      </div>
    </motion.div>
  );
}
