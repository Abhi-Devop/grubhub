import { redirect } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export const auth = {
  getToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  setToken: (token: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("token", token);
  },

  removeToken: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  setUser: (user: User) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
  },

  isAuthenticated: () => {
    return !!auth.getToken();
  },

  // Server-side helper (simulated for now, as real server-side auth needs cookies)
  requireAuth: () => {
    // In a real Next.js app, this would check cookies or headers
    // For client-side rendering, we use the AuthGuard component
    return true; 
  }
};
