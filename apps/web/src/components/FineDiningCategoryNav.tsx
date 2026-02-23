"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface FineDiningCategoryNavProps {
  categories: Category[];
  id?: string;
}

export default function FineDiningCategoryNav({ categories, id }: FineDiningCategoryNavProps) {
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVegOnly = searchParams.get('vegOnly') === 'true';

  const toggleVegOnly = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isVegOnly) {
        params.delete('vegOnly');
    } else {
        params.set('vegOnly', 'true');
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    // Scroll Spy Logic
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            
            // Auto-scroll the nav to keep active item in view
            const navItem = document.getElementById(`nav-item-${entry.target.id}`);
            if (navItem && navRef.current) {
                navItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", 
        threshold: 0,
      }
    );

    categories.forEach((cat) => {
      const element = document.getElementById(cat.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [categories]);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header (adjust 180px as needed based on header height)
      const y = element.getBoundingClientRect().top + window.scrollY - 180;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if(!categories || categories.length === 0) return null;

  return (
    <div id={id} className="sticky top-[100px] z-40 bg-[#fcfaf8]/95 backdrop-blur-md border-b border-[#0f291e]/10 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div 
            ref={navRef}
            className="flex overflow-x-auto whitespace-nowrap no-scrollbar pb-2 items-center gap-8 scroll-smooth"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`nav-item-${cat.id}`}
              onClick={() => scrollToCategory(cat.id)}
              className={cn(
                "whitespace-nowrap text-sm font-sans font-bold tracking-widest uppercase pb-2 border-b-2 transition-all duration-300",
                activeId === cat.id
                  ? "text-[#0f291e] border-[#d4af37]"
                  : "text-stone-400 border-transparent hover:text-[#0f291e] hover:border-[#0f291e]/20"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        {/* Veg Only Toggle */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-3 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-widest">Veg Only</span>
            <button 
                onClick={toggleVegOnly}
                className={cn(
                    "w-10 h-5 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer flex",
                    isVegOnly ? "bg-green-600 justify-end" : "bg-stone-300 justify-start"
                )}
            >
                <motion.div 
                    layout 
                    className="w-3 h-3 bg-white rounded-full shadow-sm"
                />
            </button>
        </div>
      </div>
    </div>
  );
}
