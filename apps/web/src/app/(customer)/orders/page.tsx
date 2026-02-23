"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import OrdersList from "@/components/profile/OrdersList";
import Loading from "@/app/loading";
import { useAuthStore } from "@/store/useAuth";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data: any = await apiClient.get("/orders");
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
        fetchOrders();
    } else {
        setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <OrdersList orders={orders} />
      </div>
    </div>
  );
}
