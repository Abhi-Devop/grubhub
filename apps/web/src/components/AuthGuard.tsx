"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuth";
import { motion } from "framer-motion";
import FoodLoader from "@/components/ui/FoodLoader";

export default function AuthGuard({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    // Robust hydration check
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated || !user) {
      router.push("/login"); // Only redirect if we are SURE we are hydrated and not authed
      return;
    }

    if (adminOnly && user.role !== "ADMIN") {
      router.push("/");
    }
  }, [isHydrated, isAuthenticated, user, adminOnly, router]);

  // Show loader while hydrating OR if not authenticated (waiting for redirect)
  if (!isHydrated || !isAuthenticated || (adminOnly && user?.role !== "ADMIN")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <FoodLoader />
      </div>
    );
  }

  return <>{children}</>;
}
