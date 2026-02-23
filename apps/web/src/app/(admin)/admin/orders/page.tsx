"use client";

import React, { useState, useEffect } from "react";
import { Clock, ChefHat, Truck, CheckCircle, MoreHorizontal } from "lucide-react";
import { apiService } from "@/lib/api";

const STATUS_COLS = [
  { id: "PENDING", label: "Pending", icon: Clock, color: "bg-yellow-100 text-yellow-700" },
  { id: "PREPARING", label: "Preparing", icon: ChefHat, color: "bg-orange-100 text-orange-700" },
  { id: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: Truck, color: "bg-blue-100 text-blue-700" },
  { id: "DELIVERED", label: "Delivered", icon: CheckCircle, color: "bg-green-100 text-green-700" },
];

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function OrdersPage() {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery<any[]>({
    queryKey: ["admin", "orders"],
    queryFn: () => apiService.getOrders(),
    refetchInterval: 5000,
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ orderId, newStatus }: { orderId: string, newStatus: string }) => {
      const res = await fetch(`http://localhost:3002/orders/${orderId}/status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onMutate: async ({ orderId, newStatus }) => {
      await queryClient.cancelQueries({ queryKey: ["admin", "orders"] });
      const previousOrders = queryClient.getQueryData(["admin", "orders"]);

      queryClient.setQueryData(["admin", "orders"], (old: any[] | undefined) => 
        old?.map(o => o.id.toString() === orderId ? { ...o, status: newStatus } : o)
      );

      return { previousOrders };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["admin", "orders"], context?.previousOrders);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });

  if (isLoading) return <div className="p-8 text-center text-gray-400 font-bold">Loading orders...</div>;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
       <div className="mb-6">
           <h1 className="text-3xl font-black text-brand-black tracking-tight">Orders</h1>
           <p className="text-gray-500">Drag and drop orders to update status.</p>
       </div>

       <div className="flex-1 grid grid-cols-4 gap-6 overflow-hidden">
           {STATUS_COLS.map(col => (
               <div 
                   key={col.id} 
                   className="bg-gray-50 rounded-2xl p-4 flex flex-col h-full border border-gray-100"
                   onDragOver={(e) => e.preventDefault()}
                   onDrop={(e) => {
                       e.preventDefault();
                       const orderId = e.dataTransfer.getData("orderId");
                       if (orderId) updateStatus({ orderId, newStatus: col.id });
                   }}
               >
                   <div className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider mb-4 ${col.color} w-fit`}>
                       <col.icon size={14} />
                       {col.label}
                       <span className="bg-white/50 px-1.5 rounded-full ml-1 text-[10px]">
                            {orders.filter(o => o.status === col.id).length}
                       </span>
                   </div>

                   <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar">
                       {orders.filter(o => o.status === col.id).map(order => (
                           <div 
                               key={order.id} 
                               draggable
                               onDragStart={(e) => e.dataTransfer.setData("orderId", order.id.toString())}
                               className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                           >
                               <div className="flex justify-between items-start mb-2">
                                   <div className="text-xs font-bold text-gray-400">#{order.orderId}</div>
                                   <div className="text-[10px] font-medium text-gray-400">
                                       {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                   </div>
                               </div>
                               
                               <div className="font-bold text-gray-800 text-sm mb-1">{order.user?.name || "Guest"}</div>
                               <div className="text-xs text-brand-black mb-3">
                                   {order.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(", ")}
                               </div>
                               
                               <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                                   <div className="font-black text-brand-black">₹{(order.totalAmount / 100).toFixed(2)}</div>
                                   
                                   {/* Drag indicator in place of old buttons */}
                                   <div className="text-[10px] text-gray-300 uppercase font-bold tracking-widest flex items-center gap-1">
                                       <MoreHorizontal size={12} /> Drag to move
                                   </div>
                               </div>
                           </div>
                       ))}
                       {orders.filter(o => o.status === col.id).length === 0 && (
                           <div className="text-center text-xs text-gray-400 py-8 italic">No orders</div>
                       )}
                   </div>
               </div>
           ))}
       </div>
    </div>
  );
}
