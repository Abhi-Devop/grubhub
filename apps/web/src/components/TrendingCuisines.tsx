"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const OFFERS = [
    { title: "50% OFF", sub: "First Order", color: "from-orange-500 to-red-600", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500" },
    { title: "VEG ONLY", sub: "Pure Veg", color: "from-green-500 to-emerald-700", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500" },
    { title: "NIGHT CRAVINGS", sub: "Midnight Delivery", color: "from-blue-500 to-indigo-700", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500" },
    { title: "SWEET TOOTH", sub: "Desserts", color: "from-pink-500 to-rose-600", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500" },
];

export default function TrendingCuisines() {
  return (
    <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-brand-black tracking-tight">Trying something new?</h2>
                <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">←</button>
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">→</button>
                </div>
            </div>

            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x">
                {OFFERS.map((offer, i) => (
                    <Link href={`/search?q=${encodeURIComponent(offer.title)}`} key={i}>
                        <motion.div 
                            className={`flex-shrink-0 w-[280px] h-[160px] rounded-2xl bg-gradient-to-br ${offer.color} relative overflow-hidden cursor-pointer snap-center shadow-lg group`}
                            whileHover={{ y: -5 }}
                        >
                            <div className="absolute inset-0 p-5 z-10 text-white flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-black italic">{offer.title}</h3>
                                    <p className="text-sm font-medium opacity-90">{offer.sub}</p>
                                </div>
                                <button className="bg-white/20 backdrop-blur self-start px-3 py-1 rounded-full text-xs font-bold uppercase border border-white/30 group-hover:bg-white group-hover:text-black transition-colors pointer-events-none">
                                    Browse
                                </button>
                            </div>
                            <Image 
                                src={offer.img} 
                                alt={offer.title} 
                                fill 
                                className="object-cover opacity-30 group-hover:scale-110 transition-transform duration-700 mix-blend-overlay"
                            />
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  );
}
