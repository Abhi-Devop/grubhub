"use client";

import { Search, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 lg:py-32 flex flex-col justify-center h-full min-h-[640px]">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
        >
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
                Hungry? <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                    We've Got You.
                </span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 font-medium max-w-lg leading-relaxed shadow-black drop-shadow-md">
                Order from the best local restaurants with easy, on-demand delivery. Fresh food, delivered fast to your doorstep.
            </p>

            {/* Omni-Search Bar */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-2xl">
                <div className="flex items-center gap-3 px-4 py-4 flex-1 w-full bg-white/90 rounded-xl hover:bg-white transition-colors cursor-text group">
                    <MapPin className="text-brand-orange group-hover:scale-110 transition-transform" size={22} />
                    <input 
                        type="text" 
                        placeholder="Location" 
                        className="outline-none bg-transparent text-gray-800 font-semibold placeholder:text-gray-400 w-full text-lg"
                        defaultValue="New York, USA"
                    />
                </div>
                <div className="flex items-center gap-3 px-4 py-4 flex-[1.5] w-full bg-white/90 rounded-xl hover:bg-white transition-colors cursor-text group">
                    <Search className="text-gray-400 group-hover:text-brand-black transition-colors" size={22} />
                    <input 
                        type="text" 
                        placeholder="Search for food..." 
                        className="outline-none bg-transparent text-gray-800 font-semibold placeholder:text-gray-400 w-full text-lg"
                        onKeyDown={(e) => e.key === 'Enter' && router.push('/search')}
                    />
                </div>
                <button 
                    onClick={() => router.push('/search')}
                    className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-lg py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 active:scale-95 w-full md:w-auto h-full whitespace-nowrap"
                >
                    Find Food
                </button>
            </div>
        </motion.div>
      </div>

      {/* Floating Features Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 py-6 hidden md:block">
         <div className="max-w-7xl mx-auto px-12 flex items-center gap-12 text-white">
            {[
                { label: "Fast Delivery", sub: "Within 30 mins", icon: "⚡" },
                { label: "Best Prices", sub: "Cheaper than menu", icon: "💰" },
                { label: "Wide Choice", sub: "500+ Restaurants", icon: "🍔" }
            ].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                    <span className="text-2xl">{feat.icon}</span>
                    <div>
                        <div className="font-bold leading-none">{feat.label}</div>
                        <div className="text-xs opacity-70">{feat.sub}</div>
                    </div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}
