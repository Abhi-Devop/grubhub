"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { 
    Clock, ChevronRight, Star, Minus, Plus, CheckCircle2, 
    Timer, Heart, Share2, AlertCircle, ShoppingBag, 
    TicketPercent, Utensils, Leaf, ChefHat, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFlyAnimation } from "@/components/FlyingCartAnimation";

interface ProductClientProps {
  product: any;
  similarProducts: any[];
}

export default function ProductClient({ product, similarProducts }: ProductClientProps) {
  const { items, addItem, removeItem } = useCart();
  
  // -- Product Not Found UI --
  if (!product) {
      return (
          <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                  <AlertCircle className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
              <p className="text-gray-500 max-w-md mb-8">
                  The product you are looking for might have been removed or is temporarily unavailable.
              </p>
              <Link 
                  href="/"
                  className="bg-[#1e3e1a] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                  Back to Home
              </Link>
          </div>
      );
  }

  // State
  const [activeImage, setActiveImage] = useState(product.image);
  
  // Flatten variants logic
  const price = product.storeProducts?.[0]?.price || 0;
  const mrp = product.storeProducts?.[0]?.mrp || price * 1.2;
  const discountValues = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 22; 

  const variants = [
    { id: 'v1', unit: '1 unit', price: price, mrp: mrp, discount: discountValues },
    { id: 'v2', unit: 'Pack of 2', price: Math.floor(price * 1.8), mrp: mrp * 2, discount: discountValues + 5 }
  ];

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  // Cart Logic
  const cartItem = items.find((i) => i.storeProductId === product.id); 
  const quantity = cartItem ? cartItem.quantity : 0;

  /* Animation */
  const { triggerAnimation } = useFlyAnimation();

  const handleAdd = (e?: React.MouseEvent<HTMLElement>) => {
    if (e) {
        const rect = (e.currentTarget).getBoundingClientRect();
        triggerAnimation(rect.left + rect.width/2, rect.top + rect.height/2, product.image);
    }

    const storeProductId = product.storeProducts?.[0]?.id || product.id;

    addItem(
      { 
        storeProductId, 
        name: `${product.name} (${selectedVariant.unit})`, 
        price: selectedVariant.price,
        image: product.image
      },
      "1"
    );
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Gourmet Meals", href: "/category/Gourmet%20Meals" },
    { label: product.category?.name || "Product", href: null }
  ];

  // Helper for thumbnails
  const thumbnails = [product.image, product.image, product.image, product.image];

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      
      {/* Top Header / Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
           <div className="flex items-center gap-2 text-[11px] font-bold text-gray-300 uppercase tracking-widest">
                {breadcrumbs.map((crumb, i) => (
                    <span key={i} className="flex items-center gap-3">
                        {i > 0 && <span className="opacity-30">/</span>}
                        {crumb.href ? (
                            <Link href={crumb.href} className="hover:text-gray-900 transition-colors">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="text-gray-900">{crumb.label}</span>
                        )}
                    </span>
                ))}
           </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
        
        {/* Left Column: Visuals (5/12) */}
        <div className="lg:col-span-7 flex gap-8 h-fit lg:sticky lg:top-32">
            {/* 1. Vertical Thumbnails */}
            <div className="hidden md:flex flex-col gap-4 w-[80px]">
                {thumbnails.map((img, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => setActiveImage(img)}
                        className={`aspect-square rounded-xl border-2 overflow-hidden cursor-pointer transition-all p-1 ${activeImage === img ? 'border-[#1e3e1a] shadow-xl shadow-[#1e3e1a]/10' : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'}`}
                    >
                         <div className="relative w-full h-full rounded-[8px] overflow-hidden bg-white">
                            <Image src={img || "/placeholder.jpg"} alt="" fill className="object-cover" />
                         </div>
                    </motion.div>
                ))}
            </div>

            {/* 2. Hero Image */}
            <div className="flex-1 relative aspect-square bg-[#0b0b0b] rounded-[2.5rem] overflow-hidden shadow-elevation-high group">
                <Image 
                    src={activeImage || "/placeholder.jpg"} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out opacity-90"
                    priority
                />
                
                {/* Badges */}
                <div className="absolute top-8 left-8">
                    <span className="bg-[#1e3e1a] text-white text-[10px] font-black px-4 py-2 rounded-full shadow-2xl tracking-[0.2em] uppercase backdrop-blur-md">
                        {selectedVariant.discount}% OFF
                    </span>
                </div>
                
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-8 right-8 w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white/40 hover:text-red-500 transition-all shadow-elevation-mid z-20 border border-white/10"
                >
                    <Heart size={24} className="fill-current" />
                </motion.button>
            </div>
        </div>

        {/* Right Column: Info & Actions (7/12) */}
        <div className="lg:col-span-5 space-y-10">
            {/* Header Content */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black bg-[#1e3e1a]/5 text-[#1e3e1a] px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-[#1e3e1a]/10">
                        {product.category?.name || "Italian"}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-black bg-orange-50 text-[#D35400] px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-orange-100/50">
                        <Star size={12} className="fill-current" />
                        4.8 RATING
                    </span>
                    <span className={`text-[10px] font-black border-2 px-4 py-1 rounded-full uppercase tracking-[0.2em] ${product.isVeg ? 'border-[#1e3e1a]/20 text-[#1e3e1a]' : 'border-red-100 text-red-500'}`}>
                        {product.isVeg ? 'VEG' : 'NON-VEG'}
                    </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-serif font-black text-[#1a1a1a] leading-[1.1] tracking-tight">
                    {product.name}
                </h1>
                
                <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-md">
                    Experience the pinnacle of culinary artistry with our signature {product.name.toLowerCase()}, masterfully prepared by our world-class chefs.
                </p>
            </div>

            <div className="h-px bg-gray-50 w-full" />

            {/* Selection */}
            <div className="space-y-6">
                 <h3 className="text-sm font-black text-gray-300 uppercase tracking-[0.2em]">Select Quantity</h3>
                 
                 <div className="grid grid-cols-2 gap-4">
                   {variants.map((variant) => (
                       <button 
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant)}
                            className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all relative overflow-hidden group ${selectedVariant.id === variant.id ? "border-[#1e3e1a] bg-[#1e3e1a]/5 shadow-elevation-mid" : "border-gray-50 bg-white hover:border-gray-100"}`}
                       >
                            <span className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">{variant.unit}</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-black text-[#1a1a1a]">₹{(variant.price / 100).toFixed(2)}</span>
                                {variant.mrp > variant.price && (
                                    <span className="text-xs text-gray-300 line-through font-medium">₹{(variant.mrp / 100).toFixed(2)}</span>
                                )}
                            </div>
                       </button>
                   ))}
                 </div>
            </div>

            {/* Pricing & Checkout Block */}
            <div className="flex items-center justify-between gap-6 p-6 bg-white rounded-[2rem] border border-gray-50 shadow-elevation-ultra">
                <div className="flex flex-col">
                     <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-serif font-black text-[#1a1a1a]">₹{(selectedVariant?.price / 100).toFixed(2)}</span>
                        <span className="text-base text-gray-200 line-through font-medium italic">₹{(Math.floor(selectedVariant.price * 1.3) / 100).toFixed(2)}</span>
                     </div>
                     <span className="text-[9px] font-black text-[#1e3e1a] uppercase tracking-[0.2em] mt-1 opacity-60">Hand-delivered with care</span>
                </div>
                
                <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "#152c11" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdd}
                    className="flex-1 max-w-[200px] h-[64px] bg-[#1e3e1a] text-white font-black text-base rounded-full shadow-elevation-high hover:shadow-elevation-ultra transition-all relative overflow-hidden flex items-center justify-center gap-3 active:scale-95"
                >
                    {quantity === 0 ? (
                        <>Add to Cart <Plus size={18} strokeWidth={3} /></>
                    ) : (
                        <span className="flex items-center gap-4">
                            <ShoppingBag size={18} strokeWidth={3} /> {quantity} Added
                        </span>
                    )}
                </motion.button>
            </div>
        </div>
      </main>

      {/* Middle Section: About This Dish */}
      <section className="bg-[#fcfbf9] mt-32 py-24 mb-32 border-y border-gray-50/50">
           <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-serif font-black text-[#1a1a1a]">The Story Behind The Plate</h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                "{product.description || "A masterfully crafted signature dish, prepared with the finest ingredients and delivered with precision."}"
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#1e3e1a]/5 flex items-center justify-center text-[#1e3e1a]">
                                        <Leaf size={20} />
                                    </div>
                                    <h4 className="font-serif font-bold text-lg">Pure Ingredients</h4>
                                </div>
                                <p className="text-sm text-gray-400 font-medium">Sourced daily from chosen artisanal farms to ensure peak flavor and nutritional integrity.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#D35400]">
                                        <ChefHat size={20} />
                                    </div>
                                    <h4 className="font-serif font-bold text-lg">Chef's Vision</h4>
                                </div>
                                <p className="text-sm text-gray-400 font-medium">Designed with a focus on textural harmony and a modern interpretation of classic culinary roots.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[3rem] shadow-elevation-high border border-gray-50">
                        <div className="flex items-center gap-4 mb-8">
                             <div className="w-12 h-12 bg-[#1e3e1a] rounded-xl flex items-center justify-center text-white">
                                <Utensils size={24} />
                             </div>
                             <h3 className="text-2xl font-serif font-black text-gray-900">What's Inside</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            {[
                                { label: "Origin", value: "Handpicked Local Seeds" },
                                { label: "Preparation", value: "Slow Cooked (4 Hours)" },
                                { label: "Seasoning", value: "Celtic Sea Salt & Peppercorns" },
                                { label: "Delivery", value: "Temperature Controlled" }
                            ].map((item, i) => (
                                <div key={i} className="space-y-1.5 border-l-2 border-gray-50 pl-6">
                                    <div className="text-[10px] text-gray-300 uppercase font-black tracking-[0.2em]">{item.label}</div>
                                    <div className="text-sm font-bold text-gray-800">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
           </div>
      </section>

      {/* Frequently Bought Together (Horizontal Grid) */}
      {similarProducts.length > 0 && (
           <div className="max-w-7xl mx-auto px-6 mb-40">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-5xl font-serif font-black text-[#1a1a1a]">Frequently Bought Together</h2>
                    <p className="text-gray-400 font-medium">Elevate your experience by pairing your selection with these culinary companion dishes.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {similarProducts.slice(0, 3).map(simItem => (
                        <motion.div 
                            key={simItem.id}
                            whileHover={{ y: -12 }}
                            className="group relative"
                        >
                            <Link href={`/product/${simItem.id}`}>
                                 <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden bg-gray-50 mb-8 shadow-elevation-mid group-hover:shadow-elevation-high transition-all duration-700">
                                    <Image src={simItem.image} alt={simItem.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                 </div>
                                 <div className="space-y-3 px-2">
                                    <div className="flex items-center justify-between">
                                        <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest ">Companion Choice</div>
                                        <div className="flex items-center gap-1 text-[#D35400]">
                                            <Star size={10} className="fill-current" />
                                            <span className="text-[10px] font-black">4.9</span>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-serif font-black text-[#1a1a1a] leading-tight group-hover:text-[#1e3e1a] transition-colors">{simItem.name}</div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div className="text-xl font-black text-[#1e3e1a]">₹{(simItem.storeProducts?.[0]?.price || 0 / 100).toFixed(2)}</div>
                                        <button className="h-10 px-6 bg-[#1e3e1a]/5 text-[#1e3e1a] font-black text-[10px] rounded-full uppercase tracking-widest hover:bg-[#1e3e1a] hover:text-white transition-all">Add Companion</button>
                                    </div>
                                 </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
           </div>
      )}
    </div>
  );
}
