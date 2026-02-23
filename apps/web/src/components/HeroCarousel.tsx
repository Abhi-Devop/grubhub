"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  type: "image" | "video";
  title: string;
  subtitle: string;
  src: string;
  color: string;
  link: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    type: "video",
    title: "Cinematic Craving",
    subtitle: "Experience Food Like Never Before",
    src: "/videos/hero-banner.mp4",
    color: "bg-black",
    link: "/category/New%20Arrivals"
  },
  {
    id: 2,
    type: "video",
    title: "Cinematic Sushi",
    subtitle: "Experience the Art of Food",
    src: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-chef-preparing-sushi-4107-large.mp4",
    color: "bg-[#1a1a1a]",
    link: "/category/Asian"
  },
  {
    id: 3,
    type: "video",
    title: "Cheesy Goodness",
    subtitle: "Hot & Fresh Pizza Delivered",
    src: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-pizza-being-sliced-40618-large.mp4",
    color: "bg-[#c0392b]",
    link: "/category/Pizza"
  },
  {
    id: 4,
    type: "image",
    title: "50% OFF First Order",
    subtitle: "Use code: WELCOME50",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    color: "bg-[#2D5A27]",
    link: "/offers"
  },
  {
    id: 5,
    type: "image",
    title: "Healthy & Fresh",
    subtitle: "Start your day right",
    src: "https://images.unsplash.com/photo-1543353071-87ddb03020c0?q=80&w=800&auto=format&fit=crop",
    color: "bg-[#D35400]",
    link: "/category/Healthy"
  },
  {
    id: 6,
    type: "image",
    title: "Late Night Munchies",
    subtitle: "Open until 3 AM",
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    color: "bg-[#1F2937]",
    link: "/category/Late%20Night%20Munchies"
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[380px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/10 mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${SLIDES[current].color}`}
        >
          <Link href={SLIDES[current].link} className="flex h-full w-full relative group">
            
            {/* Background Layer (Video or Image) */}
            <div className="absolute inset-0 z-0">
               {SLIDES[current].type === "video" ? (
                 <video
                   autoPlay
                   loop
                   muted
                   playsInline
                   className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[20s]"
                 >
                   <source src={SLIDES[current].src} type="video/mp4" />
                 </video>
               ) : (
                 <div className="w-full h-full relative">
                    <Image
                      src={SLIDES[current].src}
                      alt={SLIDES[current].title}
                      fill
                      className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-[20s]"
                      priority
                    />
                 </div>
               )}
               {/* Cinematic Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-10" />
            </div>

            {/* Glassmorphism Content Card */}
            <div className="relative z-20 w-full md:w-[55%] flex flex-col justify-center px-8 md:px-16 text-white h-full">
              <motion.div 
                 initial={{ opacity: 0, x: -30, backdropFilter: "blur(0px)" }}
                 animate={{ opacity: 1, x: 0, backdropFilter: "blur(16px)" }}
                 transition={{ delay: 0.2, duration: 0.8 }}
                 className="bg-black/30 border border-white/20 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden"
              >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="inline-block px-3 py-1 bg-[#D35400] text-white text-[10px] font-black tracking-[0.2em] uppercase rounded-full mb-5 shadow-[0_0_20px_rgba(211,84,0,0.6)]"
                  >
                    Featured Collection
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl md:text-6xl font-black leading-[0.9] mb-4 tracking-tight text-white drop-shadow-lg font-serif"
                  >
                    {SLIDES[current].title}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-white/80 font-medium text-lg mb-8 leading-relaxed max-w-sm drop-shadow-md"
                  >
                    {SLIDES[current].subtitle}
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 bg-white text-black font-black px-8 py-4 rounded-2xl w-fit hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all text-sm uppercase tracking-wider"
                  >
                    Order Now <ChevronRight size={16} className="text-[#D35400] stroke-[3px]" />
                  </motion.button>
              </motion.div>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Modern Indicators */}
      <div className="absolute bottom-8 left-16 flex gap-3 z-30">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              current === idx ? "bg-white w-12 shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-white/20 w-3 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
