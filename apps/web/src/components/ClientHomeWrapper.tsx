"use client";

import CartSyncProvider from "@/components/CartSyncProvider";

export default function ClientHomeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CartSyncProvider>
      {children}
    </CartSyncProvider>
  );
}
