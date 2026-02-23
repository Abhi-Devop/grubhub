"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuth";

export default function AuthProvider({ 
  user, 
  children 
}: { 
  user: any | null, 
  children: React.ReactNode 
}) {
  const initialized = useRef(false);

  // Initialize Zustand synchronously on first render so there's no layout shift
  if (!initialized.current) {
    if (user) {
      useAuthStore.setState({ isAuthenticated: true, user });
    } else {
      useAuthStore.setState({ isAuthenticated: false, user: null });
    }
    initialized.current = true;
  }

  // Also sync if user prop changes (e.g. on navigation)
  useEffect(() => {
    if (user) {
      useAuthStore.setState({ isAuthenticated: true, user });
    } else {
      useAuthStore.setState({ isAuthenticated: false, user: null });
    }
  }, [user]);

  return <>{children}</>;
}
