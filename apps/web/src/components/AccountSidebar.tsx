"use client";
import React from "react";
import { Package, MapPin, Gift, HelpCircle, Shield, LogOut, FileText, User, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuth";
import { motion } from "framer-motion";
import { logoutAction } from "@/app/actions/auth";

interface AccountSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
}

export default function AccountSidebar({ activeTab, setActiveTab, user }: AccountSidebarProps) {
  const router = useRouter();

  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logoutAction();
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "prescriptions", label: "My Prescriptions", icon: FileText },
    { id: "giftcards", label: "E-Gift Cards", icon: Gift },
    { id: "faq", label: "FAQ's", icon: HelpCircle },
    { id: "privacy", label: "Account Privacy", icon: Shield },
  ];

  return (
    <div className="bg-white/50 backdrop-blur-2xl border border-white/40 shadow-[20px_0_60px_-30px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden h-fit sticky top-24">
      {/* Header */}
      <div className="p-8 border-b border-white/20">
        <h2 className="text-2xl font-black text-gray-800 mb-1 tracking-tight">Command Center</h2>
        <p className="text-gray-500 font-medium text-sm">{user?.phone || "+91 ••••• •••••"}</p>
      </div>

      {/* Menu */}
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative w-full flex items-center gap-4 px-5 py-4 transition-all rounded-xl group overflow-hidden ${
                 isActive ? "text-orange-900" : "text-gray-500 hover:text-gray-900 hover:bg-white/40"
              }`}
            >
              {/* THE 3D SLIDING BACKGROUND */}
              {isActive && (
                <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] rounded-xl -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Icon with 3D pop */}
              <motion.div
                 animate={{ scale: isActive ? 1.1 : 1 }}
                 className={`relative z-10 ${isActive ? 'text-orange-600 drop-shadow-sm' : ''}`}
              >
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              
              {/* Label */}
              <span className={`relative z-10 text-sm font-bold tracking-wide ${isActive ? "" : "font-medium"}`}>
                {item.label}
              </span>
              
              {/* Active Indicator Chevron */}
              {isActive && (
                 <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-auto text-orange-500"
                 >
                    <ChevronRight size={18} strokeWidth={3} />
                 </motion.div>
              )}
            </button>
          );
        })}

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 text-red-500 hover:bg-red-50/50 rounded-xl transition-colors group"
        >
          <LogOut size={22} className="group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm">Log Out</span>
        </button>
      </div>
    </div>
  );
}
