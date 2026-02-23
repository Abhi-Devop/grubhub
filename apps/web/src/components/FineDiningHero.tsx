"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FineDiningHero() {
  return (
    <div className="relative w-full h-[70vh] min-h-[600px] overflow-hidden">
      {/* Background (Video/Image) */}
      <div className="absolute inset-0">
         <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
         >
            {/* Fallback to a high-quality image if video fails or while loading */}
            <source src="/local_data/Video_Creation_for_Website_Banner.mp4" type="video/mp4" />
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" 
              alt="Chef Plating Fine Dining"
              className="w-full h-full object-cover"
            />
         </video>
         <div className="absolute inset-0 bg-black/60" /> {/* Heavy Dark Overlay */}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
         
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
         >
             <p className="text-white/90 text-[10px] font-sans font-medium uppercase tracking-[0.4em] mb-6">
               The Reserve Collection
             </p>
             <h1 className="text-6xl md:text-8xl font-serif text-white mb-10 leading-[0.9] tracking-tight drop-shadow-lg">
               Culinary<br/><span className="italic text-[#C5A880]">Excellence.</span>
             </h1>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="flex flex-col sm:flex-row gap-6 mt-4"
         >
            {/* Primary Transparent Button */}
            <button 
               onClick={() => {
                  const menu = document.getElementById('menu-start');
                  if (menu) {
                     menu.scrollIntoView({ behavior: 'smooth' });
                  } else {
                     window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                  }
               }}
               className="bg-transparent text-white border border-white/40 px-10 py-3.5 font-sans tracking-[0.2em] text-[11px] uppercase hover:bg-white hover:text-black transition-colors duration-500"
            >
               Explore Menu
            </button>

            {/* Secondary Transparent Button - Link to Reservations */}
            <Link href="/reservations">
               <button className="bg-transparent text-[#C5A880] border border-[#C5A880]/40 px-10 py-3.5 font-sans tracking-[0.2em] text-[11px] uppercase hover:bg-[#C5A880] hover:text-black transition-colors duration-500">
                  Book a Table
               </button>
            </Link>
         </motion.div>
      </div>
    </div>
  );
}
