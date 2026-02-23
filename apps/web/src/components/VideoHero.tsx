"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

export default function VideoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Video with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
          poster="/placeholder-food.jpg" // Fallback
        >
          {/* Using a high-quality food stock video URL */}
          <source src="https://videos.pexels.com/video-files/3195958/3195958-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
        >
            <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-6 drop-shadow-2xl tracking-tight">
                Taste the <span className="text-[#D35400] italic">Extraordinary</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                Experience gourmet dining delivered to your doorstep. Crafted by master chefs, enjoyed by you.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
                <input 
                    type="text" 
                    placeholder="Search for 'Truffle Pasta'..." 
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D35400] transition-all shadow-xl"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D35400] text-white px-6 py-2 rounded-full font-bold hover:bg-[#a04000] transition-colors">
                    Find Food
                </button>
            </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
            <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown size={24} />
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
