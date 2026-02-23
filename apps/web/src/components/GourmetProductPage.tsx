"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { 
    Clock, Star, Plus, CheckCircle2, 
    Heart, TicketPercent, Utensils, Leaf, ChefHat, ShoppingBag, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFlyAnimation } from "@/components/FlyingCartAnimation";

interface GourmetProductPageProps {
  product: any;
  similarProducts: any[];
}

export default function GourmetProductPage({ product, similarProducts }: GourmetProductPageProps) {
  const { items, addItem } = useCart();
  const [activeImage, setActiveImage] = useState(product?.image);
  
  if (!product) return null;

  // Flatten variants logic
  const price = product.storeProducts?.[0]?.price || 0;
  const mrp = product.storeProducts?.[0]?.mrp || price * 1.2;
  const discountValues = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0; 

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
        image: product.image,
        slug: product.slug
      },
      "1"
    );
  };

  const thumbs = [product.image, product.image, product.image, product.image].filter(Boolean);

  return (
    <div className="bg-white min-h-screen font-sans text-[#1a1a1a] pb-20">
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
           <Link href="/" className="hover:text-gray-900">Home</Link>
           <span>/</span>
           <Link href="/category/Gourmet" className="hover:text-gray-900">Gourmet Meals</Link>
           <span>/</span>
           <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* Left: Gallery (Thumbnail Strip + Main Image) */}
           <div className="lg:col-span-7 flex gap-6 h-fit sticky top-24">
               {/* Thumbnails */}
               <div className="hidden md:flex flex-col gap-4">
                   {thumbs.map((img, i) => (
                       <div 
                         key={i} 
                         onMouseEnter={() => setActiveImage(img)}
                         className={`w-20 h-20 rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${activeImage === img ? 'border-[#1e3e1a]' : 'border-transparent hover:border-gray-200'}`}
                       >
                           <div className="relative w-full h-full bg-gray-50">
                               <Image src={img} alt="" fill className="object-cover" />
                           </div>
                       </div>
                   ))}
               </div>

               {/* Main Image */}
               <div className="flex-1 relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl group bg-gray-100">
                    <Image 
                        src={activeImage || product.image || "/placeholder.jpg"} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                    />
                    
                    {/* Discount Badge */}
                    {selectedVariant.discount > 0 && (
                        <div className="absolute top-6 left-6 bg-[#1e3e1a] text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg">
                            {selectedVariant.discount}% OFF
                        </div>
                    )}

                    <button className="absolute top-6 right-6 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors text-gray-600 hover:text-red-500">
                        <Heart size={20} />
                    </button>
               </div>
           </div>

           {/* Right: Details */}
           <div className="lg:col-span-5 space-y-8">
               
               {/* Header Info */}
               <div>
                   <div className="flex items-center gap-3 mb-4">
                       <span className="bg-green-50 text-[#1e3e1a] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-green-100">
                           {product.category?.name || "Gourmet"}
                       </span>
                       <span className="bg-green-50 text-[#1e3e1a] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-green-100 flex items-center gap-1">
                           <Clock size={12} /> 10 MINS DELIVERY
                       </span>
                   </div>
                   
                   <h1 className="text-4xl lg:text-5xl font-serif font-black leading-tight text-gray-900 mb-4">
                       {product.name}
                   </h1>

                   <div className="flex items-center gap-4">
                       <div className="flex items-center bg-[#D35400] text-white px-2 py-1 rounded gap-1 text-sm font-bold">
                           <Star size={14} className="fill-current" /> 4.7
                       </div>
                       <span className="text-sm text-gray-500 font-medium">164 Reviews</span>
                       <span className={`text-xs font-bold px-2 py-0.5 border rounded ${product.isVeg ? 'border-green-600 text-green-700' : 'border-red-600 text-red-700'}`}>
                           {product.isVeg ? 'VEG' : 'NON-VEG'}
                       </span>
                   </div>
               </div>

               {/* Quantity Selection */}
               <div className="space-y-3">
                   <h3 className="text-sm font-bold text-gray-900">Select Quantity</h3>
                   <div className="flex gap-4">
                       {variants.map((v) => (
                           <button
                             key={v.id}
                             onClick={() => setSelectedVariant(v)}
                             className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${selectedVariant.id === v.id ? 'border-[#1e3e1a] bg-green-50/30 ring-1 ring-[#1e3e1a]/20' : 'border-gray-200 hover:border-gray-300'}`}
                           >
                               <div className="text-sm font-bold text-gray-900 mb-1">{v.unit}</div>
                               <div className="flex items-center gap-2">
                                   <span className="text-lg font-black">₹{(v.price / 100).toFixed(2)}</span>
                                   {v.mrp > v.price && <span className="text-xs text-gray-400 line-through">₹{(v.mrp / 100).toFixed(2)}</span>}
                               </div>
                           </button>
                       ))}
                   </div>
               </div>

               {/* Price & Add to Cart */}
               <div className="flex items-center justify-between pt-4">
                   <div className="flex items-baseline gap-2">
                       <span className="text-5xl font-serif font-black text-gray-900">₹{(selectedVariant.price / 100).toFixed(2)}</span>
                       <span className="text-lg text-gray-400 line-through decoration-gray-300">₹{(selectedVariant.mrp / 100).toFixed(2)}</span>
                   </div>
                   
                   <motion.button
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       onClick={handleAdd}
                       className="bg-[#1e3e1a] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-[#152c11] transition-all flex items-center gap-3"
                   >
                       {quantity > 0 ? (
                           <> <ShoppingBag size={20} /> {quantity} Added</>
                       ) : (
                           <>Add to Cart</>
                       )}
                   </motion.button>
               </div>

               {/* Coupon Box */}
               <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                           <TicketPercent size={20} />
                       </div>
                       <div>
                           <div className="flex items-center gap-2">
                               <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                               <span className="font-bold text-gray-900 text-sm">Available Coupons</span>
                           </div>
                           <p className="text-xs text-blue-700 mt-0.5">Save $10 on your first order of $50+</p>
                       </div>
                   </div>
                   <button className="px-4 py-1.5 bg-white border border-blue-200 text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors uppercase">
                       Apply
                   </button>
               </div>
           </div>
      </div>
    </div>
  );
}
