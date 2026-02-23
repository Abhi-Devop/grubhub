"use client";

import { MapPin, User, ChevronDown, Search, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/store/useCart";
import LocationModal from "./LocationModal";

import { useAuthStore } from "@/store/useAuth";

export default function Header() {
  const { user, isAuthenticated } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);
  
  // Calculate totals with safety checks
  const safeItems = items || [];
  const totalItems = safeItems.reduce((acc, item) => acc + (item?.quantity || 0), 0);
  const subtotal = safeItems.reduce((acc, item) => acc + ((item?.price || 0) * (item?.quantity || 0)), 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [address, setAddress] = useState("123, React Lane, JavaScript City, Web State");

  const pathname = usePathname();

  if (!mounted) return null;
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <AnimatePresence>
        {showLocationModal && (
          <LocationModal 
            onClose={() => setShowLocationModal(false)}
            onSelect={(newAddress) => {
              setAddress(newAddress);
              setShowLocationModal(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.header
        style={{ 
          backgroundColor: "rgba(255, 255, 255, 0.8)", 
          boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.05)" : "none",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)"
        }}
        className="fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between">
        {/* LEFT: Logo & Delivery Info */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-1 group">
              <div className="relative">
                <span className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-600">
                  GRUB
                </span>
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-brand-orange rounded-full"
                  layoutId="logo-underline"
                />
              </div>
              <span className="text-3xl font-thin tracking-widest text-brand-black">
                HUB
              </span>
            </div>
          </Link>

          {/* Delivery Info */}
          <div 
            className="hidden md:flex flex-col cursor-pointer group"
            onClick={() => setShowLocationModal(true)}
          >
            <h2 className="font-extrabold text-lg leading-tight text-brand-black">Delivery in 15 minutes</h2>
            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              <span className="truncate max-w-[200px] group-hover:text-brand-black transition-colors">
                {address}
              </span>
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform text-brand-black" />
            </div>
          </div>
        </div>

      {/* MIDDLE: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-3xl mx-12">
        <div 
            onClick={() => router.push('/search')}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl h-12 flex items-center px-4 gap-3 cursor-text hover:bg-white hover:shadow-md transition-all active:scale-[0.99]"
        >
            <Search size={20} className="text-gray-400" />
            <span className="text-gray-400 font-medium">Search "Biryani"</span>
        </div>
      </div>

      {/* RIGHT: Account & Cart */}
      <div className="flex items-center gap-6">
        {/* Account Dropdown */}
        <Link href={isAuthenticated ? "/profile" : "/login"}>
            <button className="hidden md:flex items-center gap-1 text-gray-700 font-medium hover:text-brand-black">
                <span className="text-lg">{isAuthenticated ? (user?.name || "User") : "Account"}</span>
                <ChevronDown size={16} />
            </button>
        </Link>

        {/* Mobile Search Icon (visible only on mobile) */}
        <button className="md:hidden p-2 text-gray-700" onClick={() => router.push('/search')}>
            <Search size={24} />
        </button>

        {/* Cart Button */}
        {totalItems > 0 ? (
            <Link href="/cart">
                <button className="bg-[#0c831f] text-white rounded-lg px-4 py-3 flex flex-col items-start min-w-[100px] hover:bg-green-700 transition-colors shadow-lg shadow-green-100">
                    <span className="text-xs font-bold uppercase tracking-wider">{totalItems} items</span>
                    <div className="flex items-center gap-1 font-extrabold text-sm">
                        ₹{(subtotal / 100).toFixed(2)} <span className="opacity-80">total</span>
                    </div>
                </button>
            </Link>
        ) : (
            <Link href="/cart">
                <button className="bg-gray-100 text-gray-400 rounded-lg p-3 flex items-center gap-2 hover:bg-gray-200 transition-colors">
                    <ShoppingCart size={24} />
                    <span className="font-bold hidden md:inline">My Cart</span>
                </button>
            </Link>
        )}
      </div>
        </div>
      </motion.header>
    </>
  );
}
