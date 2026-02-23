"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; // Assuming links to filtered pages

interface CuratedCollectionCardProps {
  name: string;
  image: string;
  link?: string;
}

export default function CuratedCollectionCard({ name, image, link = "#" }: CuratedCollectionCardProps) {
  return (
    <Link href={link} className="block group font-sans">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative w-80 aspect-[16/9] rounded-2xl overflow-hidden shadow-md cursor-pointer"
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay: Solid black bottom -> Transparent top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Text Positioned at Bottom Left */}
        <div className="absolute bottom-0 left-0 p-5 w-full flex-col justify-end">
           <h3 className="text-white text-lg font-serif tracking-wide leading-tight group-hover:text-[#d4af37] transition-colors">
             {name}
           </h3>
           
           <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
              <ArrowRight size={16} className="text-white" />
           </div>
        </div>
      </motion.div>
    </Link>
  );
}
