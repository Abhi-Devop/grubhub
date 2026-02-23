"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Phone, MessageSquare, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TrackOrder() {
  const [status, setStatus] = useState(0);

  // Simulate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(prev => (prev < 3 ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: "Order Accepted", desc: "Restaurant has accepted your order", time: "12:30 PM" },
    { title: "Chef is Preparing", desc: "Your food is being cooked with love", time: "12:35 PM" },
    { title: "Rider Picked Up", desc: "Rider is on the way to your location", time: "12:45 PM" },
    { title: "Rider Near You", desc: "Arriving in 2 minutes", time: "12:55 PM" },
  ];

  return (
    <div className="h-SCREEN flex flex-col bg-white overflow-hidden">
      {/* Map Half */}
      <div className="h-[55vh] relative bg-gray-200 w-full">
         {/* Back Button */}
         <Link href="/" className="absolute top-4 left-4 z-20 bg-white p-2 rounded-full shadow-md text-brand-black">
           <ArrowLeft size={24} />
         </Link>

         {/* Mock Map Image */}
         <div className="absolute inset-0 bg-blue-50 opacity-50 overflow-hidden">
             {/* Abstract Map Grid */}
             <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         </div>
         
         {/* Rider Pulsing Dot */}
         <motion.div 
           animate={{ 
             x: [50, 150, 250, 200], 
             y: [100, 150, 100, 200] 
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/4 left-1/4"
         >
            <div className="relative">
               <div className="w-8 h-8 rounded-full bg-brand-orange/30 animate-ping absolute inset-0"></div>
               <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-brand-orange relative z-10">
                 <Image src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png" alt="Bike" width={20} height={20} />
               </div>
            </div>
         </motion.div>
      </div>

      {/* Bottom Sheet Status */}
      <div className="flex-1 bg-white rounded-t-[30px] -mt-10 relative z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-6">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
        
        <div className="flex items-center justify-between mb-8">
           <div>
             <h2 className="text-xl font-bold text-brand-black">Arriving in 15 mins</h2>
             <p className="text-sm text-gray-500 font-medium">On time | 1:10 PM</p>
           </div>
           <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border-2 border-green-500">
               <Image 
                 src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop"
                 alt="Rider"
                 width={48}
                 height={48}
               />
           </div>
        </div>

        {/* Timeline */}
        <div className="relative flex-1 overflow-y-auto no-scrollbar pl-2 space-y-8">
            {/* Vertical Line */}
            <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-gray-100"></div>

            {steps.map((step, idx) => {
              const isActive = idx <= status;
              const isCurrent = idx === status;
              
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex items-start gap-4"
                >
                  <div className={`w-6 h-6 rounded-full border-[3px] z-10 flex-shrink-0 flex items-center justify-center ${
                    isActive ? "border-brand-green bg-white" : "border-gray-200 bg-white"
                  }`}>
                    {isActive && <div className="w-2.5 h-2.5 rounded-full bg-brand-green"></div>}
                  </div>
                  
                  <div className={`${isActive ? "opacity-100" : "opacity-40"}`}>
                    <h4 className="font-bold text-brand-black text-sm">{step.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                  
                  <div className="ml-auto text-xs font-bold text-gray-400">
                    {step.time}
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Call Rider */}
        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-gray-100 text-brand-black font-bold h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
            <Phone size={18} /> Call Rider
          </button>
          <button className="flex-1 bg-brand-green/10 text-brand-green font-bold h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-green/20 transition-colors">
            <MessageSquare size={18} /> Chat
          </button>
        </div>
      </div>
    </div>
  );
}
