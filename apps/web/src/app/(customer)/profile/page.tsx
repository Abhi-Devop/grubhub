"use client";
import React, { useEffect, useState } from "react";
import AccountSidebar from "@/components/AccountSidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuth";
import Image from "next/image";

// Sub-components
import OrdersList from "@/components/profile/OrdersList";
import ProfileDetails from "@/components/profile/ProfileDetails";
import FAQ from "@/components/profile/FAQ";
import GiftCards from "@/components/profile/GiftCards";
import AddressesList from "@/components/profile/AddressesList";
import { AnimatePresence, motion } from "framer-motion";
import { apiClient } from "@/lib/api-client";
import Loading from "@/app/loading";
import { Edit2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Sync tab with URL query param ?tab=...
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    if (activeTab === "orders" && isAuthenticated && user?.id) {
       setLoadingOrders(true);
       apiClient.get(`/orders/user/${user.id}`).then((data: any) => {
            if (Array.isArray(data)) setOrders(data);
       }).catch(console.error).finally(() => setLoadingOrders(false));
    }
  }, [activeTab, isAuthenticated]);

  if (!isAuthenticated) return <Loading />; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#fff7ed]">
      <div className="container mx-auto px-4 max-w-7xl pt-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar - Floating Glass Panel (Span 3) */}
            <div className="md:col-span-12 lg:col-span-3 z-10 sticky top-24">
              <AccountSidebar activeTab={activeTab} setActiveTab={(tab) => {
                  setActiveTab(tab);
                  router.push(`/profile?tab=${tab}`, { scroll: false });
              }} user={user} />
            </div>

            {/* Main Content (Span 9) */}
            <div className="md:col-span-12 lg:col-span-9 min-h-[600px] flex flex-col gap-8">
              
              {/* Cinematic Profile Header */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-900 group"
              >
                  {/* Hero Background Image */}
                  <div className="relative h-64 md:h-80 w-full">
                      <Image 
                        src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
                        fill 
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
                        alt="Profile Header" 
                      />
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col md:flex-row items-end md:items-center gap-6">
                      {/* 3D Floating Avatar */}
                      <motion.div 
                         initial={{ scale: 0.8, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         transition={{ delay: 0.2 }}
                         className="relative"
                      >
                         <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden bg-gray-800 backdrop-blur-sm relative z-10">
                            {/* Avatar Image or Initial */}
                            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-5xl font-bold text-white uppercase">
                                {user?.name?.[0] || "U"}
                            </div>
                         </div>
                         
                         {/* Edit Button */}
                         <button className="absolute bottom-2 right-2 z-20 bg-white text-gray-900 p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                             <Edit2 size={16} />
                         </button>
                      </motion.div>

                      <div className="flex-1 mb-2">
                           <motion.h1 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-md"
                           >
                              Welcome back, {user?.name || "Foodie"}!
                           </motion.h1>
                           <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                              className="text-gray-300 font-medium text-lg max-w-lg leading-relaxed"
                           >
                              Manage your orders, saved addresses, and payment methods from your personal command center.
                           </motion.p>
                      </div>
                  </div>
              </motion.div>

              {/* Dynamic Content Area */}
              <AnimatePresence mode="wait">
                  <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/50 backdrop-blur-xl border border-white/60 shadow-lg rounded-[2rem] p-6 md:p-10 min-h-[400px]"
                  >
                        {activeTab === "profile" && <ProfileDetails />}
                        {activeTab === "orders" && (
                            loadingOrders ? <Loading /> : <OrdersList orders={orders} />
                        )}
                        {activeTab === "faq" && <FAQ />}
                        {activeTab === "giftcards" && <GiftCards />}
                        {activeTab === "addresses" && <AddressesList />}
                        
                        {/* Fallback for others */}
                        {["prescriptions", "privacy"].includes(activeTab) && (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                                    <Edit2 size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">{activeTab.replace('-', ' ')}</h2>
                                <p className="text-gray-500 max-w-xs">This feature is currently under maintanence or coming soon to your region.</p>
                            </div>
                        )}
                  </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
  );
}
