"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, TicketPercent, FileText, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/store/useCart";
import Navbar from "@/components/Navbar";
import BillDetails from "@/components/BillDetails";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveCartItem from "@/components/InteractiveCartItem";
import LocationModal from "@/components/LocationModal";
import CouponModal from "@/components/CouponModal";
import { useLocation } from "@/lib/LocationContext";
import ThreeDNotification, { NotificationType } from "@/components/ThreeDNotification";
import AuthModal from "@/components/AuthModal";
import { useAuthStore } from "@/store/useAuth";

export default function CartPage() {
  const router = useRouter();
  const { items, addItem, removeItem, instructions, setInstructions } = useCart();
  const { address, setManualLocation } = useLocation();
  const { isAuthenticated } = useAuthStore();
  
  // States
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // Removed local instructions state
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [notification, setNotification] = useState<{ message: string; visible: boolean; type: NotificationType }>({
    message: "",
    visible: false,
    type: "success"
  });
  const [addons, setAddons] = useState<any[]>([]);

  useEffect(() => {
      // Fetch real products from backend to use as suggested add-ons
      fetch("http://localhost:3002/products?storeId=1")
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                // Shuffle or just pick first 4
                setAddons(data.sort(() => 0.5 - Math.random()).slice(0, 4));
            }
        })
        .catch(console.error);
  }, []);

  // ... (Notification and Calculation logic remains same)

  const showNotification = (message: string, type: NotificationType = "success") => {
    setNotification({ message, visible: true, type });
  };

  // Calculations
  const subtotal = useMemo(() => (items || []).reduce((sum, item) => sum + (item.price * item.quantity), 0), [items]);
  const deliveryFee = subtotal > 500 ? 0 : 35;
  const platformFee = 6;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + platformFee + gst - discount;
  
  // Mock savings calculation (assuming 20% markup on original price) + Coupon Discount
  const savings = Math.round(subtotal * 0.25) + discount;

  const handleCheckout = () => {
    if (!isAuthenticated) {
        setIsAuthModalOpen(true);
        return;
    }
    setIsCheckingOut(true);
    setTimeout(() => router.push("/checkout"), 800);
  };

  const handleIncrement = (item: any) => {
      addItem({
          storeProductId: item.storeProductId,
          name: item.name,
          price: item.price,
          image: item.image,
          slug: item.slug
      }, "1");
  };

  const handleDecrement = (id: string, currentQty: number) => {
      if (currentQty > 1) {
          removeItem(id);
      } else {
        removeItem(id);
      }
  };

  const handleApplyCoupon = (code: string, discountAmount: number) => {
      setDiscount(discountAmount);
      setAppliedCoupon(code);
      showNotification(`Coupon ${code} applied! saved ₹${discountAmount}`, "success");
  };

  if (items.length === 0) {
     // ... (Empty cart logic - kept for brevity but functionality preserved)
     return (
        <div className="min-h-screen bg-gray-50 pb-20">
          <Navbar />
          <div className="flex flex-col items-center justify-center pt-20 px-4">
             <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                  <Image 
                      src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
                      alt="Empty Cart" 
                      width={100} 
                      height={100} 
                      className="opacity-50 grayscale"
                  />
             </div>
             <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
             <p className="text-gray-500 mb-8 text-center max-w-sm">
               Good food is always cooking! Go ahead, order some yummy items from the menu.
             </p>
             <Link href="/" className="bg-[#D35400] text-white px-8 py-3 rounded-lg font-bold shadow-sm hover:shadow-md transition-all">
                 Browse Food
             </Link>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900 antialiased subpixel-antialiased">
      <Navbar />

      <ThreeDNotification 
        message={notification.message}
        isVisible={notification.visible}
        type={notification.type}
        onClose={() => setNotification(prev => ({ ...prev, visible: false }))}
      />

      <AnimatePresence>
        {showLocationModal && (
            <LocationModal 
                onClose={() => setShowLocationModal(false)} 
                onSelect={() => setShowLocationModal(false)}
            />
        )}
        {showCouponModal && (
            <CouponModal
                onClose={() => setShowCouponModal(false)}
                onApply={handleApplyCoupon}
            />
        )}
        <AuthModal 
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onSuccess={() => {
                setIsCheckingOut(true);
                setTimeout(() => router.push("/checkout"), 800);
            }}
        />
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-80px)] pb-24">
        
        <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 items-start h-full">
            
            <div className="lg:col-span-8 space-y-6 w-full">
                
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
                    <div className="flex gap-4">
                        <div className="p-2 bg-white border border-gray-100 rounded-lg shadow-sm">
                            <MapPin size={20} className="text-[#D35400]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-900 text-sm">Delivering to Home</h3>
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">Default</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed max-w-md">
                                {address}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowLocationModal(true)}
                        className="text-[#D35400] text-xs font-bold hover:underline py-1"
                    >
                        CHANGE
                    </button>
                </div>

                {/* Cart Items List Container - Scrollable with Custom Scrollbar */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col max-h-[450px]">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center shrink-0 z-10">
                        <h3 className="font-bold text-gray-900 text-sm">Items Added</h3>
                        <span className="text-xs text-gray-500">{items.length} Items</span>
                    </div>

                    <div className="overflow-y-auto p-4 space-y-4 pr-2 hover:pr-1 transition-all
                        [&::-webkit-scrollbar]:w-1.5
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:bg-gray-200
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <AnimatePresence>
                            {(items || []).map((item, index) => (
                                <InteractiveCartItem 
                                    key={item.storeProductId}
                                    item={item}
                                    index={index}
                                    onUpdateQuantity={(id, delta) => delta > 0 ? handleIncrement(item) : removeItem(id)}
                                    onRemove={() => removeItem(item.storeProductId)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Instructions Input (Connected to Global Store) */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50/30 shrink-0 z-10">
                         <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Add cooking instructions (e.g. less spicy)..." 
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-xs focus:outline-none focus:border-gray-400 text-gray-700 transition-colors"
                            />
                            <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                         </div>
                    </div>
                </div>

                {/* Suggested Add-ons (Refined Layout) */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h3 className="font-bold text-gray-900 text-lg px-1">Complete your meal</h3>
                    <div className="flex flex-nowrap gap-4 overflow-x-auto pb-6 scrollbar-hide">
                         {addons.length > 0 ? addons.map((addon) => (
                             <motion.div 
                                whileHover={{ y: -5 }}
                                key={addon.storeProductId} 
                                className="min-w-[180px] bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                             >
                                 <div className="w-full aspect-[4/3] bg-gray-50 rounded-xl relative overflow-hidden">
                                     <Image 
                                        src={addon.image} 
                                        alt={addon.name} 
                                        fill 
                                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                     />
                                     <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                                 </div>
                                 <div className="flex-1">
                                     <p className="font-semibold text-sm text-gray-800 truncate mb-1">{addon.name}</p>
                                     <p className="text-xs font-bold text-gray-500 tabular-nums tracking-tight">₹{(addon.price / 100).toFixed(2)}</p>
                                 </div>
                                 <button 
                                     onClick={() => addItem({
                                         storeProductId: addon.storeProductId, 
                                         name: addon.name, 
                                         price: addon.price, 
                                         image: addon.image,
                                         slug: addon.slug
                                     }, "1")}
                                     className="w-full bg-white border-2 border-green-600 text-green-700 text-xs font-black py-2.5 rounded-xl hover:bg-green-600 hover:text-white transition-all uppercase tracking-wide"
                                 >
                                     ADD
                                 </button>
                             </motion.div>
                         )) : (
                             <div className="text-xs text-gray-400">Loading suggestions...</div>
                         )}
                    </div>
                </div>

            </div>

            {/* Right Column (Sidebar - Sticky) */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4 w-full h-fit mt-8 lg:mt-0">
                
                {/* Coupon Section */}
                <div 
                    onClick={() => setShowCouponModal(true)}
                    className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-blue-200 transition-colors group relative overflow-hidden"
                >
                    <div className="flex items-start gap-3 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <TicketPercent size={16} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-sm text-gray-900">
                                {appliedCoupon ? `Coupon Applied: ${appliedCoupon}` : "Apply Coupon"}
                            </h3>
                            <p className="text-xs text-blue-600 mt-0.5">
                                {appliedCoupon ? `You saved ₹${discount}` : "Save ₹50 with code WELCOME50"}
                            </p>
                        </div>
                        <span className="text-[#D35400] font-bold text-xs uppercase group-hover:underline pt-1">
                            {appliedCoupon ? "CHANGE" : "View All"}
                        </span>
                    </div>
                </div>

                {/* Bill Details Component */}
                <BillDetails 
                    subtotal={subtotal}
                    deliveryFee={deliveryFee}
                    platformFee={platformFee}
                    gst={gst}
                    total={total}
                    savings={savings}
                    onCheckout={handleCheckout}
                    isCheckingOut={isCheckingOut}
                />

                <p className="text-xs text-center text-gray-400">
                    By proceeding, you agree to our Terms & Conditions
                </p>

            </div>

        </div>
      </main>
    </div>
  );
}
