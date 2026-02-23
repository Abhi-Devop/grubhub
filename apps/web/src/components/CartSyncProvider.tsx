"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuth";
import { useCart } from "@/store/useCart";

export default function CartSyncProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const { setUserId } = useCart();

  useEffect(() => {
    console.log('[CartSync] Auth state changed. Authenticated:', isAuthenticated, 'User:', user);
    if (isAuthenticated && user?.id) {
      // Set userId in cart store - this triggers cart sync from DB
      console.log('[CartSync] Setting userId in cart:', user.id);
      setUserId(user.id);
    } else {
      console.log('[CartSync] Clearing userId from cart');
      setUserId(null);
    }
  }, [isAuthenticated, user, setUserId]);

  return <>{children}</>;
}
