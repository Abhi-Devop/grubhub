"use client";
import React from "react";
import { Package, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Order {
  id: string;
  orderId: string;
  store?: { name: string };
  createdAt: string;
  status: string;
  totalAmount: number;
  items?: { quantity: number; name: string }[];
}

export default function OrdersList({ orders }: { orders: Order[] }) {
  const router = useRouter();

  if (orders.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 bg-white rounded-xl shadow-sm border"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            🛍️
        </div>
        <h3 className="text-lg font-bold text-gray-800">No orders yet</h3>
        <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
        <button 
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-brand-green text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
        >
            Start Shopping
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.map((order, index) => (
        <motion.div 
          key={order.id} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => router.push(`/orders/${order.id}`)}
          className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-4">
                     <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                         <Package size={24} />
                     </div>
                     <div>
                         <h3 className="font-bold text-lg group-hover:text-brand-green transition-colors">{order.store?.name || "Blinkit Store"}</h3>
                         <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString()}
                         </p>
                     </div>
                 </div>
                 <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.status}
                    </span>
                    <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                 </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mb-4 border border-gray-100">
                {order.items?.map((i) => `${i.quantity}x ${i.name}`).join(", ") || "Items..."}
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200">
                <div className="text-xs font-bold text-gray-400">
                    ORDER #{order.orderId || order.id.slice(0, 8)}
                </div>
                <div className="font-bold text-lg text-brand-black">
                    ₹{(order.totalAmount / 100).toFixed(2)}
                </div>
            </div>
        </motion.div>
      ))}
    </div>
  );
}
