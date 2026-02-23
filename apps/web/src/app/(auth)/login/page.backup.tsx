"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User as UserIcon, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuth";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ui/Toast";
import { auth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { setLogin, isAuthenticated } = useAuthStore();
  const { toast, error: toastError, success } = useToast();
  
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const { email, password, firstName, lastName } = formData;

  useEffect(() => {
    if (isAuthenticated) {
        const user = auth.getUser();
        if (user?.role === 'ADMIN') {
             router.push("/admin");
        } else {
             router.push("/");
        }
    }
  }, [isAuthenticated, router]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
          const formData = new FormData();
          formData.append("email", email);
          formData.append("password", password);

          const { login } = await import("@/app/actions/auth");
          const result = await login({}, formData);

          if (result.message && !result.data) {
              toastError(result.message);
          } else if (result.data) {
              const mockToken = "mock-token-" + Date.now();
              auth.setToken(mockToken);
              auth.setUser(result.data);
              setLogin(result.data);
              success("Welcome back!");
              router.push(result.data.role === 'ADMIN' ? "/admin" : "/");
          }
      } else {
          // Use Server Action for Signup
          const formData = new FormData();
          formData.append("firstName", firstName);
          formData.append("lastName", lastName);
          formData.append("email", email);
          formData.append("password", password);

          const { signup } = await import("@/app/actions/auth"); // Dynamic import to avoid server-on-client issues if not handled
          const result = await signup({}, formData);

          if (result.errors) {
              const errorMsg = Object.values(result.errors).flat().join(", ");
              toastError(errorMsg || "Validation failed");
          } else if (result.message && !result.data) {
              toastError(result.message);
          } else if (result.data) {
              // Auto-login (simulate or real) - For now, we simulate since we don't have a token from Server Action unless we generate one
              // But the user requested "stores in db".
              // We can rely on the returned user object to set the store.
              const newUser = result.data;
              // We don't have a token here unless the server action generates it. 
              // For now, let's allow it as a "success" and maybe redirect to login or auto-login with strictly client-side mock token if needed.
              // BUT existing login expects a token.
              // Let's just notify success and switch to login view, or auto-login with a mock token if that's acceptable.
              // Given BackgroundVideoLogin mocks it, let's mock it here too for consistency if strict auth isn't enforced by backend yet.
              
              const mockToken = "mock-token-" + Date.now();
              auth.setToken(mockToken);
              auth.setUser(newUser);
              setLogin(newUser);
              success("Account created successfully!");
              router.push("/");
          }
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      toastError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-sm w-full">
          <div className="bg-white px-8 py-10 rounded-2xl shadow-sm w-full">
             <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl">
                🍔
             </div>
             <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
                 {isLogin ? "Welcome Back" : "Create Account"}
             </h2>
             <p className="text-gray-500 mb-8 text-sm text-center">
                 {isLogin ? "Log in to continue to GrubHub" : "Sign up to get started"}
             </p>

             <form onSubmit={handleSubmit} className="space-y-4">
                 {!isLogin && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              type="text"
                              name="firstName"
                              value={firstName}
                              onChange={onChange}
                              placeholder="First Name"
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                              required
                            />
                        </div>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              type="text"
                              name="lastName"
                              value={lastName}
                              onChange={onChange}
                              placeholder="Last Name"
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                              required
                            />
                        </div>
                    </div>
                 )}

                 <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      placeholder="Email Address"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      required
                    />
                 </div>

                 <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      placeholder="Password"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      required
                      minLength={6}
                    />
                 </div>

                 <button 
                   disabled={loading}
                   className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-70 shadow-lg shadow-orange-500/20"
                 >
                    {loading ? "Processing..." : (isLogin ? "Login" : "Create Account")}
                    {!loading && <ArrowRight size={18} />}
                 </button>
             </form>
             
             <button 
                type="button"
                onClick={() => {
                    setIsLogin(!isLogin);
                    toast(""); // Clear toasts
                }}
                className="w-full mt-6 text-sm text-gray-600 font-medium hover:text-orange-500 transition-colors"
             >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
             </button>

             <p className="text-xs text-gray-400 mt-8 text-center">
                By continuing, you agree to our Terms of Service & Privacy Policy
             </p>
          </div>
       </div>
    </div>
  );
}
