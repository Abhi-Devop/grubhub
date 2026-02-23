"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, Clock, Package, Truck, RefreshCw, ChevronLeft } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import Image from "next/image";
import Loading from "@/app/loading";
import Link from "next/link";

const STEPS = [
    { label: "Order Placed", icon: Clock },
    { label: "Preparing", icon: Package },
    { label: "Out for Delivery", icon: Truck },
    { label: "Delivered", icon: CheckCircle },
];

import { useQuery } from "@tanstack/react-query";

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();

  const { data: order, isLoading, refetch } = useQuery<any>({
    queryKey: ["order", params.id],
    queryFn: async () => {
        try {
            return await apiClient.get(`/orders/${params.id}`);
        } catch (e) {
            // Fallback mock data for UI demo
            return {
                id: params.id,
                orderId: "ORD-12345-MOCK",
                status: "COOKING",
                totalAmount: 450,
                paymentStatus: "PAID",
                items: [{ id: 1, name: "Butter Chicken", quantity: 1, price: 350 }, { id: 2, name: "Naan", quantity: 2, price: 50 }],
                createdAt: new Date().toISOString()
            };
        }
    },
    refetchInterval: 5000, // Sync every 5s
  });

  const getStatusStep = (status: string) => {
      const statusMap: any = { 
          'PENDING': 0, 
          'COOKING': 1, 
          'CONFIRMED': 1, 
          'PREPARING': 1,
          'OUT_FOR_DELIVERY': 2,
          'DELIVERING': 2, 
          'DELIVERED': 3 
      };
      return statusMap[status] || 0;
  };

  const statusStep = order ? getStatusStep(order.status) : 0;

  if (isLoading && !order) return <Loading />;

  if (!order) return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-500 mb-6">We couldn't find the order details.</p>
          <Link href="/orders" className="text-brand-orange hover:underline">Back to Orders</Link>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
         
         <Link href="/orders" className="inline-flex items-center gap-1 text-gray-500 hover:text-brand-orange mb-6 text-sm font-medium">
            <ChevronLeft size={16} /> Back to My Orders
         </Link>

         {/* Live Map or Status Header */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
             <div className="bg-gray-900 text-white p-6 flex justify-between items-start">
                <div>
                    <h1 className="text-xl font-bold mb-1">
                        {order.status === 'DELIVERED' ? 'Order Delivered!' : 'Order in Progress'}
                    </h1>
                    <p className="text-gray-400 text-sm">Order ID: #{order.orderId}</p>
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border border-white/20">
                    {order.paymentStatus === 'PAID' ? 'PAID' : 'COD'}
                </div>
             </div>
             
             {/* Map Placeholder */}
             <div className="w-full aspect-[2/1] bg-gray-100 relative overflow-hidden flex items-center justify-center bg-gray-200">
                 <div className="absolute inset-0 bg-opacity-10 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/77.6412,12.9716,14,0/800x400?access_token=pk.mock')] bg-cover bg-center opacity-50"></div>
                 <div className="z-10 bg-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-3">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="font-bold text-gray-800 text-sm">Live Tracking Map (Mock)</span>
                 </div>
             </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             
             {/* Timeline */}
             <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-gray-800">Tracking Status</h3>
                    <button onClick={() => refetch()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <RefreshCw size={16} className="text-gray-400" />
                    </button>
                 </div>
                 
                 <div className="space-y-8 relative pl-2">
                     {/* Vertical connecting line */}
                     <div className="absolute left-5 top-3 bottom-6 w-0.5 bg-gray-100"></div>
                     
                     {STEPS.map((step, index) => {
                         const isCompleted = index <= statusStep;
                         const isCurrent = index === statusStep;
                         
                         return (
                             <div key={index} className="flex items-start gap-4 relative z-10">
                                 <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center border-4 shrink-0
                                    ${isCompleted ? "bg-green-100 border-green-50 text-green-700 shadow-sm" : "bg-gray-50 border-white text-gray-300"}
                                    transition-all duration-500
                                 `}>
                                     <step.icon size={18} />
                                 </div>
                                 <div className="pt-2">
                                     <h4 className={`font-bold text-sm ${isCompleted ? "text-gray-900" : "text-gray-400"}`}>{step.label}</h4>
                                     {isCurrent && <p className="text-xs text-orange-500 font-medium animate-pulse mt-1">Processing...</p>}
                                 </div>
                             </div>
                         );
                     })}
                 </div>
             </div>

             {/* Order Details */}
             <div className="space-y-6">
                 {/* Rider Card */}
                 {statusStep >= 2 && (
                     <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
                         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Delivery Partner</h4>
                         <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center font-bold text-yellow-600">
                                RK
                             </div>
                             <div>
                                 <h4 className="font-bold text-sm text-gray-800">Raju Kumar</h4>
                                 <p className="text-xs text-gray-500">Vaccinated • 4.8 ⭐</p>
                             </div>
                         </div>
                     </div>
                 )}

                 {/* Order Items */}
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Order Details</h4>
                     <div className="space-y-3 mb-4 max-h-[200px] overflow-y-auto">
                         {order.items?.map((item: any) => (
                             <div key={item.id} className="flex justify-between text-sm">
                                 <div className="flex gap-2">
                                     <span className="text-gray-500 font-bold">{item.quantity}x</span>
                                     <span className="text-gray-700 line-clamp-1">{item.name}</span>
                                 </div>
                                 <span className="font-medium">₹{(item.price * item.quantity / 100).toFixed(2)}</span>
                             </div>
                         ))}
                     </div>
                     <div className="border-t pt-3 flex justify-between font-bold text-gray-800">
                         <span>Total Paid</span>
                         <span>₹{(order.totalAmount / 100).toFixed(2)}</span>
                     </div>
                 </div>
             </div>

         </div>
      </div>
    </div>
  );
}
