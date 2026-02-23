"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuth";
import { useLocation } from "@/lib/LocationContext";
import { login as loginAction, signup as signupAction } from "@/app/actions/auth";
import { auth } from "@/lib/auth";
import { useToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const router = useRouter();
  const { setLogin } = useAuthStore(); // Changed from login to setLogin to match store
  const { setManualLocation } = useLocation();
  const { error: toastError, success: toastSuccess } = useToast();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill for demo
  useEffect(() => {
      if(!isLogin) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
      } else {
          setEmail("user@example.com");
          setPassword("password");
      }
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      
      if (!isLogin) {
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
      }

      // Call Server Actions
      const result = isLogin ? await loginAction({}, formData) : await signupAction({}, formData);

      if (result.errors) {
        const errorMsg = Object.values(result.errors).flat().join(", ");
        toastError(errorMsg || "Validation failed");
        setIsLoading(false);
      } else if (result.message && !result.data) {
        toastError(result.message);
        setIsLoading(false);
      } else if (result.data) {
        // Success
        const mockToken = "mock-token-" + Date.now(); // In real app, token comes from server
        auth.setToken(mockToken);
        auth.setUser(result.data);
        setLogin(result.data);
        
        // Set default location
        // Set default location (New York)
        setManualLocation(40.7128, -74.0060, "New York, NY");

        toastSuccess(isLogin ? "Welcome back!" : "Account created successfully!");
        
        // Redirect based on role
        setTimeout(() => {
             router.push(result.data.role === 'ADMIN' ? "/admin" : "/");
        }, 1000);
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      toastError(err.message || "Authentication failed");
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
      setIsLogin(!isLogin);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans selection:bg-orange-500 selection:text-white">
      
      {/* 1. Page Background (Static & Blurred) */}
      <div className="absolute inset-0 z-0">
        <Image 
            src="/images/login-bg.png" 
            alt="Atmospheric Dining Background" 
            fill 
            className="object-cover filter blur-xl brightness-[0.40] scale-110"
            quality={90}
            priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 2. Main Layout (Centered Flex Container) */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-7xl p-4 perspective-1000">

        {/* 3. The Left Element: The 'Video Glass Slab' */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
            className="relative w-[320px] h-[600px] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black group transition-all duration-500"
        >
            {/* 1. The Video */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/videos/loginpage.mp4" type="video/mp4" />
            </video>
            
            {/* 2. THE SECRET SAUCE: Glossy Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/20 border border-white/30 rounded-[2rem] pointer-events-none z-10" />

            {/* 3. Text Content */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <h2 className="text-3xl font-serif italic text-white mb-2 leading-tight">Experience <br/>Taste.</h2>
                    <p className="text-white/70 text-xs font-light tracking-widest uppercase">The future of dining is here.</p>
                </motion.div>
            </div>
        </motion.div>

        {/* 4. The Right Element: The 'Login Console' */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} // Staggered entrance
            className="w-full max-w-[400px] p-10 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
        >
            {/* Branding */}
            <div className="mb-8 text-center">
                <h1 className="text-5xl font-black tracking-tighter text-white drop-shadow-lg">
                    GRUBHUB
                </h1>
                <p className="text-sm text-gray-400 font-serif italic mt-1 tracking-wide">
                    Epicurean <span className="text-orange-500">Concierge.</span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* SignUp Name Fields */}
                <motion.div 
                    initial={false}
                    animate={{ height: isLogin ? 0 : "auto", opacity: isLogin ? 0 : 1, marginBottom: isLogin ? 0 : 20 }}
                    className="overflow-hidden space-y-4"
                >
                     <div className="flex gap-3">
                         <div className="flex-1">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">First Name</label>
                            <input 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 hover:bg-white/10 focus:bg-white/10 focus:border-orange-500 focus:scale-[1.02] focus:ring-4 focus:ring-orange-500/20 font-light"
                                placeholder="John"
                            />
                         </div>
                         <div className="flex-1">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Last Name</label>
                            <input 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 hover:bg-white/10 focus:bg-white/10 focus:border-orange-500 focus:scale-[1.02] focus:ring-4 focus:ring-orange-500/20 font-light"
                                placeholder="Doe"
                            />
                         </div>
                     </div>
                </motion.div>

                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                        Communication
                    </label>
                    <div className="relative group">
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" size={16} />
                        <input 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 hover:bg-white/10 focus:bg-white/10 focus:border-orange-500 focus:scale-[1.02] focus:ring-4 focus:ring-orange-500/20 font-light"
                            placeholder="user@example.com"
                            required 
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                        Security Key
                    </label>
                    <div className="relative group">
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" size={16} />
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 hover:bg-white/10 focus:bg-white/10 focus:border-orange-500 focus:scale-[1.02] focus:ring-4 focus:ring-orange-500/20 font-light tracking-widest"
                            placeholder="••••••••"
                            required 
                        />
                    </div>
                </div>

                {/* The CTA Button (Liquid Glow) */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-lg tracking-wide shadow-[0_10px_30px_rgba(249,115,22,0.4)] relative overflow-hidden group mt-6"
                >
                    <span className="relative z-10 font-black uppercase">
                        {isLoading ? (isLogin ? "Authenticating..." : "Creating...") : (isLogin ? "LOG IN" : "SIGN UP")}
                    </span>
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </motion.button>
            </form>

            <div className="mt-8 text-center space-y-4">
                <p className="text-gray-400 text-xs font-medium tracking-wide">
                    {isLogin ? "New to the experience?" : "Already a member?"} 
                    <button onClick={toggleMode} className="text-orange-500 font-bold hover:text-white transition-colors ml-2 uppercase tracking-widest text-[10px] border-b border-orange-500/30 pb-0.5">
                        {isLogin ? "Create Account" : "Access Login"}
                    </button>
                </p>
                
                <Link href="/" className="inline-block text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] hover:text-white transition-colors">
                    Skip Experience
                </Link>
            </div>
        </motion.div>

      </div>
    </div>
  );
}
