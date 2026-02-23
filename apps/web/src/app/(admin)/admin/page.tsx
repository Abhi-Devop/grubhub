"use client";
import React, { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import Loading from "@/app/loading";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { title: "Total Revenue", value: "₹0", icon: DollarSign, color: "bg-green-500" },
    { title: "Total Orders", value: "0", icon: ShoppingBag, color: "bg-blue-500" },
    { title: "Active Users", value: "0", icon: Users, color: "bg-purple-500" },
    { title: "Avg. Order Value", value: "₹0", icon: TrendingUp, color: "bg-orange-500" },
  ]);
  const [orderList, setOrderList] = useState<any[]>([]);

  useEffect(() => {
    const loadStats = async () => {
        try {
            const [orders, users] = await Promise.all([
                apiClient.get<any[]>('/orders'), // Admin endpoint returning all orders
                apiClient.post<any[]>('/auth/users', {}) // Auth controller uses POST for users list
            ]);
            
            const totalRevenue = orders.reduce((acc, order) => {
                // Include if PAID or if it's a COD order that is CONFIRMED (implying payment will be collected)
                // For now, let's include all CONFIRMED orders as "Revenue" (booked revenue)
                if (order.status === 'CONFIRMED' || order.paymentStatus === 'PAID') {
                    return acc + (order.totalAmount || 0);
                }
                return acc;
            }, 0);
            setOrderList(orders); // Save full list for table
            const orderCount = orders.length;
            const userCount = users.length;
            const avgOrderValue = orderCount > 0 ? Math.round(totalRevenue / orderCount) : 0;

            setStats([
                { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-green-500" },
                { title: "Total Orders", value: orderCount.toString(), icon: ShoppingBag, color: "bg-blue-500" },
                { title: "Total Users", value: userCount.toString(), icon: Users, color: "bg-purple-500" },
                { title: "Avg. Order Value", value: `₹${avgOrderValue}`, icon: TrendingUp, color: "bg-orange-500" },
            ]);
        } catch (e) {
            console.error("Failed to load admin stats:", e);
        } finally {
            setLoading(false);
        }
    };
    loadStats();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Overview of platform performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg shadow-${stat.color.replace('bg-', '')}/30`}>
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Items</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {orderList.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-12 text-center text-gray-400">No orders found.</td>
                        </tr>
                    ) : (
                        orderList.map((order) => ( // Render orderList
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="py-4 px-6 text-sm font-bold text-gray-900">
                                    #{order.orderId || order.id.slice(0, 8)}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                            {order.user?.name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-900">{order.user?.name || 'Guest'}</div>
                                            <div className="text-xs text-gray-500">{order.user?.phone || order.user?.email || ''}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-sm text-gray-600 font-medium">
                                        {order.items?.length || 0} items
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-sm font-black text-gray-900">
                                    ₹{(order.totalAmount / 100).toFixed(2)}
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
                                        ${order.status === 'CONFIRMED' || order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                                          order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                    <span className="block text-[10px] text-gray-400 mt-1 font-semibold">{order.paymentMethod}</span>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
