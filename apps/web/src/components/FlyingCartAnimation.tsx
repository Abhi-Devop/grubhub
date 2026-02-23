"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";

interface FlyingItem {
  id: number;
  startX: number;
  startY: number;
  image: string;
}

interface CartAnimationContextType {
  triggerAnimation: (x: number, y: number, image: string) => void;
}

const CartAnimationContext = createContext<CartAnimationContextType | undefined>(undefined);

export function CartAnimationProvider({ children }: { children: ReactNode }) {
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [scope, animate] = useAnimate();

  const triggerAnimation = (x: number, y: number, image: string) => {
    const id = Date.now();
    setFlyingItems((prev) => [...prev, { id, startX: x, startY: y, image }]);

    // Animate the cart icon bump when item arrives (approx 800ms)
    setTimeout(() => {
      const cartIcon = document.getElementById("cart-icon-btn");
      if (cartIcon) {
        animate(cartIcon, { scale: [1, 1.2, 1] }, { duration: 0.2 });
      }
    }, 700);

    // Cleanup after animation
    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((item) => item.id !== id));
    }, 1000);
  };

  return (
    <CartAnimationContext.Provider value={{ triggerAnimation }}>
      <div ref={scope}>
        {children}
      </div>
      
      {/* Animation Layer */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <AnimatePresence>
          {flyingItems.map((item) => (
             <FlyingImage key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </div>
    </CartAnimationContext.Provider>
  );
}

function FlyingImage({ item }: { item: FlyingItem }) {
    // Parabolic Bezier Curve Logic
    // Start: item.startX, item.startY
    // End: window.innerWidth - 80 (approx Cart X), 20 (approx Cart Y)
    // Control Point: Between Start and End, but higher up (negative Y relative to path)
    
    // We can use framer-motion's layout animations or keyframes.
    // For a true parabola, we can animate x and y with different easings (linear X, easeOut Y)
    // OR we can use a keyframe array for precision.
    
    // Let's simplified target coordinates for the cart (Top Right)
    // In a real app we might want to getElementById('cart-icon').getBoundingClientRect()
    // checking this inside useEffect effectively.
    
    const [target, setTarget] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const cartBtn = document.getElementById("cart-icon-btn");
        if (cartBtn) {
            const rect = cartBtn.getBoundingClientRect();
            setTarget({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        } else {
             // Fallback to top right
             setTarget({ x: window.innerWidth - 60, y: 40 });
        }
    }, []);

    if (target.x === 0) return null; // Wait for target

    // Calculate control point for Bezier
    // We want it to go 'up' first.
    // Midpoint X, Top Y - 200px
    const midX = (item.startX + target.x) / 2;
    const midY = Math.min(item.startY, target.y) - 200;

    return (
        <motion.img
            src={item.image}
            initial={{ 
                opacity: 1, 
                left: item.startX, 
                top: item.startY, 
                scale: 1,
                position: "fixed",
                width: 60,
                height: 60,
                borderRadius: "50%",
                objectFit: "cover",
                zIndex: 9999
            }}
            animate={{
                // We use keyframes to simulate the curve if we can't do path() easily in CSS yet without SVG
                // A simple way to get a curve is to animate Top and Left with different easings?
                // Or just standard keyframes:
                left: [item.startX, midX, target.x],
                top: [item.startY, midY, target.y],
                scale: [1, 0.8, 0.2],
                opacity: [1, 1, 0.5],
            }}
            exit={{ opacity: 0 }}
            transition={{ 
                duration: 0.8, 
                ease: "easeInOut",
                times: [0, 0.5, 1] // Keyframe timing
            }}
            className="shadow-2xl border-2 border-white"
        />
    );
}

export function useFlyAnimation() {
  const context = useContext(CartAnimationContext);
  if (!context) {
    throw new Error("useFlyAnimation must be used within a CartAnimationProvider");
  }
  return context;
}
