"use client";

import { MapPin, Search, ShoppingCart, User, ChevronDown, LogOut, ShoppingBag, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/useCart";
import { useAuthStore } from "@/store/useAuth";
import { useLocation } from "@/lib/LocationContext";
import LocationModal from "@/components/LocationModal";
import SearchBar from "@/components/SearchBar";
import { logoutAction } from "@/app/actions/auth";

export default function Navbar() {
  const { items } = useCart();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { address } = useLocation(); // Use global address
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Auto-logout legacy mock user
  if (isAuthenticated && user?.name === "GrubHub User") {
      logoutAction().then(() => logout());
  }

  const totalItems = Array.isArray(items) ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <>
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#2D5A27]/5 h-[100px] flex items-center transition-all duration-500 shadow-elevation-low hover:shadow-elevation-mid">
      <div className="max-w-7xl mx-auto w-full px-8 flex items-center justify-between gap-12">
        
        {/* Left: Logo & Location */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex flex-col leading-none group relative overflow-hidden">
             <motion.span 
                whileHover={{ y: -2, transition: { duration: 0.3 } }}
                className="text-4xl font-serif text-[#1e3e1a] font-black tracking-tight group-hover:text-[#D35400] transition-colors"
             >
                GRUBHUB
             </motion.span>
             <span className="text-[11px] font-bold text-gray-400 tracking-[0.3em] uppercase mt-1.5 opacity-80 flex items-center gap-1">
                <Sparkles size={10} className="text-[#D35400]" /> Epicurean <span className="text-[#D35400]">Concierge</span>
             </span>
          </Link>

          <motion.div 
            whileHover={{ x: 5 }}
            onClick={() => setShowLocationModal(true)}
            className="hidden xl:flex flex-col cursor-pointer group border-l border-[#2D5A27]/10 pl-12"
          >
            <h2 className="font-bold text-gray-900 text-[13px] leading-tight flex items-center gap-2 font-serif italic text-[#2D5A27] group-hover:text-[#D35400] transition-colors">
              <MapPin size={14} strokeWidth={2.5} />
              Priority Delivery
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold group-hover:text-gray-900 transition-colors mt-0.5">
               <span className="truncate max-w-[220px]">{address}</span>
               <ChevronDown size={12} strokeWidth={3} className="text-[#D35400]" />
            </div>
          </motion.div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl hidden lg:block">
           <motion.div 
                whileHover={{ scale: 1.01 }}
                className="transition-natural"
           >
                <SearchBar />
           </motion.div>
        </div>

        {/* Right: Profile & Cart */}
        <div className="flex items-center gap-6">
            {isAuthenticated ? (
                <div className="relative">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                        className="flex items-center justify-center focus:outline-none group"
                    >
                        <div className="w-11 h-11 rounded-full bg-[#f3f4f6] flex items-center justify-center text-gray-700 border border-transparent group-hover:bg-[#2D5A27]/5 group-hover:text-[#2D5A27] transition-all duration-300 relative overflow-hidden">
                            {user?.image ? (
                                <img src={user.image} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <User size={22} strokeWidth={1.5} />
                            )}
                        </div>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                className="absolute right-0 top-full mt-4 w-56 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-elevation-high border border-[#2D5A27]/5 z-50 overflow-hidden"
                            >
                                <div className="p-3 space-y-1">
                                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Signed in as</p>
                                        <p className="text-sm font-bold text-gray-900 truncate">{user?.firstName || user?.name}</p>
                                    </div>
                                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:text-[#2D5A27] hover:bg-[#2D5A27]/5 rounded-xl transition-all group">
                                        <User size={18} className="group-hover:scale-110 transition-transform" />
                                        Private Profile
                                    </Link>
                                    <Link href="/profile?tab=orders" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:text-[#2D5A27] hover:bg-[#2D5A27]/5 rounded-xl transition-all group">
                                        <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                                        Order History
                                    </Link>
                                    <div className="h-px bg-[#2D5A27]/5 my-2 mx-2"></div>
                                    <button 
                                        onClick={async () => { await logoutAction(); logout(); setIsDropdownOpen(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all group"
                                    >
                                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                                        Sign Out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <Link href="/login" className="flex items-center justify-center w-11 h-11 rounded-full bg-[#f3f4f6] hover:bg-[#eaecef] text-gray-700 transition-all group">
                    <User size={22} strokeWidth={1.5} className="group-hover:text-[#2D5A27]" />
                </Link>
            )}

            <Link href="/cart" id="cart-icon-btn">
                 <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative flex items-center justify-center w-11 h-11 transition-all group"
                 >
                    <ShoppingBag size={26} strokeWidth={1.5} className="text-gray-800 group-hover:text-[#2D5A27]" />
                    {totalItems > 0 && (
                        <div className="absolute -top-0.5 -right-0.5 bg-[#D35400] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                            {totalItems}
                        </div>
                    )}
                 </motion.div>
            </Link>
        </div>

      </div>
    </nav>

    {/* Location Modal */}
    <AnimatePresence>
        {showLocationModal && (
            <LocationModal 
                onClose={() => setShowLocationModal(false)}
                onSelect={(addr) => {
                    // Logic handled in LocationModal but triggering strict re-render here via context
                    setShowLocationModal(false);
                }}
            />
        )}
    </AnimatePresence>
    </>
  );
}
