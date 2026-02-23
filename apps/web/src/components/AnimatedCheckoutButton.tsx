'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingCart } from 'lucide-react';

interface AnimatedCheckoutButtonProps {
  onClick: () => Promise<void>;
  label?: string;
  successLabel?: string;
  className?: string;
  disabled?: boolean;
}

export default function AnimatedCheckoutButton({ 
  onClick, 
  label = "Complete Order", 
  successLabel = "Order Placed",
  className = "",
  disabled = false
}: AnimatedCheckoutButtonProps) {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handleCheckout = async () => {
    if (status !== 'idle' || disabled) return; 
    
    setStatus('processing');
    
    // Give browser a moment to paint the 'processing' state before running API call
    setTimeout(async () => {
      try {
        // Ensure the animation plays for at least 4s (as requested by user)
        const minAnimationTime = new Promise(resolve => setTimeout(resolve, 4000));
        await Promise.all([onClick(), minAnimationTime]);
        
        setStatus('success');
      } catch (error: any) {
        // If payment fails or auth is required, revert back to idle
        setStatus('idle');
      }
    }, 50);
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={disabled || status !== 'idle'}
      className={`relative overflow-hidden w-full h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl group ${
        status === 'idle' ? 'bg-[#0f291e] hover:bg-[#1a4231] text-white' : 
        status === 'processing' ? 'bg-stone-900 cursor-default' : 
        'bg-[#d4af37] text-black cursor-default shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
      } ${className}`}
    >
      <AnimatePresence>
        {/* STATE 1: IDLE TEXT */}
        {status === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-2 font-bold tracking-widest uppercase text-xs"
          >
            <ShoppingCart size={16} />
            <span>{label}</span>
          </motion.div>
        )}

        {/* STATE 2: PROCESSING ANIMATION (The Road & Truck) */}
        {status === 'processing' && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full pointer-events-none flex items-center"
          >
            {/* The Road Dashed Line */}
            <div className="absolute top-1/2 left-0 w-full h-[4px] -translate-y-1/2 border-t-4 border-dashed border-stone-600 opacity-40" />
            
            {/* The Top-Down Truck - Adjusted path to keep it on-screen longer */}
            <motion.div 
              initial={{ x: -100 }}
              animate={{ x: 380 }} // Optimized distance for button width
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              className="absolute left-0 flex items-center drop-shadow-2xl scale-[1.35]"
            >
              {/* Truck Trailer (White box) - Slightly Larger */}
              <div className="w-18 h-9 bg-stone-50 rounded-sm border border-stone-200 shadow-inner" />
              
              {/* Connector Hitch */}
              <div className="w-2.5 h-4.5 bg-stone-700" />
              
              {/* Truck Cabin (Blue box) - Slightly Larger */}
              <div className="w-10 h-8 bg-blue-500 rounded-r-sm flex flex-col justify-between py-[2px] relative shadow-lg">
                <div className="w-4 h-2 bg-yellow-200 rounded-r-full absolute -right-2 top-1.5 shadow-[10px_0_20px_rgba(253,224,71,1)]" />
                <div className="w-4 h-2 bg-yellow-200 rounded-r-full absolute -right-2 bottom-1.5 shadow-[10px_0_20px_rgba(253,224,71,1)]" />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* STATE 3: SUCCESS TEXT */}
        {status === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 font-bold tracking-widest uppercase text-xs"
          >
            <Check size={20} strokeWidth={3} />
            <span>{successLabel}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Shine Effect for Idle */}
      {status === 'idle' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
      )}
    </button>
  );
}
