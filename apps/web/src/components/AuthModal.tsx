"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import { useAuthStore } from "@/store/useAuth";
import { login, signup } from "@/app/actions/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { setLogin } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      
      let result;
      if (mode === "login") {
        result = await login({} as any, formData);
      } else {
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        result = await signup({} as any, formData);
      }

      if (result.data) {
        setLogin(result.data);
        onSuccess();
        onClose();
      } else {
        setError(result.message || "Authentication failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Card - Gen Z Professional Styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-[0_32px_80px_rgba(0,0,0,0.5)] border border-gray-100"
          >
            {/* Top Design Accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#d4af37] to-[#0f291e]" />

            <div className="px-8 pt-12 pb-10">
              <button
                onClick={onClose}
                className="absolute right-8 top-8 rounded-full bg-gray-50 p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={20} />
              </button>

              <div className="mb-10">
                <h2 className="text-4xl font-extrabold tracking-tight text-[#0f291e] font-sans">
                  {mode === "login" ? "Welcome back." : "Join Reserve."}
                </h2>
                <p className="mt-3 text-base text-gray-500 font-medium">
                  {mode === "login" 
                    ? "Your culinary dashboard awaits." 
                    : "Experience dining like never before."}
                </p>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 border border-red-100 flex items-center gap-2"
                >
                  <div className="w-1 h-1 bg-red-600 rounded-full" />
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full rounded-2xl bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-900 outline-none ring-2 ring-transparent transition-all placeholder:text-gray-400 focus:bg-white focus:ring-[#d4af37]"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full rounded-2xl bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-900 outline-none ring-2 ring-transparent transition-all placeholder:text-gray-400 focus:bg-white focus:ring-[#d4af37]"
                      />
                    </div>
                  </div>
                )}

                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-2xl bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-900 outline-none ring-2 ring-transparent transition-all placeholder:text-gray-400 focus:bg-white focus:ring-[#d4af37]"
                  />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-900 outline-none ring-2 ring-transparent transition-all placeholder:text-gray-400 focus:bg-white focus:ring-[#d4af37]"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0f291e] py-5 text-sm font-black tracking-widest text-white transition-all hover:bg-[#1a4231] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-[#0f291e]/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          {mode === "login" ? "AUTHENTICATE" : "CONTINUE"}
                          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                  </button>
                </div>

                <div className="mt-8 flex items-center gap-4 text-gray-300">
                  <div className="h-px flex-1 bg-gray-100" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">Or continue with</span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button type="button" className="flex items-center justify-center gap-2 rounded-2xl border border-gray-100 py-3 text-xs font-bold transition-all hover:bg-gray-50">
                      <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                      Google
                   </button>
                   <button type="button" className="flex items-center justify-center gap-2 rounded-2xl border border-gray-100 py-3 text-xs font-bold transition-all hover:bg-gray-50">
                      <Github size={16} />
                      GitHub
                   </button>
                </div>

                <div className="pt-6 text-center text-sm font-bold">
                  {mode === "login" ? (
                    <span className="text-gray-400">
                      New here?{" "}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-[#d4af37] decoration-2 underline-offset-4 hover:underline"
                      >
                        Create an account
                      </button>
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      Already familiar?{" "}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-[#d4af37] decoration-2 underline-offset-4 hover:underline"
                      >
                        Sign in instead
                      </button>
                    </span>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
