"use client";

import React from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { useAuthStore } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
      // Simple client-side protection
      if (!isAuthenticated) {
          router.push("/login");
      }
      // Add role check if needed: if (user?.role !== 'ADMIN') router.push('/');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
