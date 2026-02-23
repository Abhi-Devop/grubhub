"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { LocationProvider } from "@/lib/LocationContext";

import { ToastProvider } from "@/components/ui/Toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </LocationProvider>
    </QueryClientProvider>
  );
}
