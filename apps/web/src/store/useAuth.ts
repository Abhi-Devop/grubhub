import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
  phone?: string;
  role?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setLogin: (user: User) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setLogin: (user) => set({ isAuthenticated: true, user }),
      setUser: (user) => set({ user }), // Update user data without toggling auth
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
