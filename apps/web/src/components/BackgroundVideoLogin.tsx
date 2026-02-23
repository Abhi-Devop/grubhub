"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, User as UserIcon } from "lucide-react";
import { useAuthStore } from "@/store/useAuth";
import { signup, login as loginAction } from "@/app/actions/auth";

interface BackgroundVideoLoginProps {
  onLoginSuccess: () => void;
}

export default function BackgroundVideoLogin({ onLoginSuccess }: BackgroundVideoLoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { setLogin } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (isLogin) {
         // Real Login with Server Action
         const formData = new FormData();
         formData.append("email", email);
         formData.append("password", password);

         try {
             // We need to pass a mock prevState as the first argument because server actions used directly don't bind state automatically like useFormState
             // But here we are calling it like a function. 
             const result = await loginAction({}, formData);

             if (result.message && !result.data) {
                 setError(result.message);
                 setIsLoading(false);
                 return;
             }

             if (result.data) {
                 setLogin({
                     id: result.data.id,
                     name: result.data.name || `${result.data.firstName} ${result.data.lastName}`,
                     firstName: result.data.firstName,
                     lastName: result.data.lastName,
                     email: result.data.email,
                     role: result.data.role
                 });
                 
                 setIsLoading(false);
                 onLoginSuccess();
             }
         } catch (err) {
             console.error(err);
             setError("Login failed. Please try again.");
             setIsLoading(false);
         }
    } else {
        // Sign Up with Server Action
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);

        try {
            const result = await signup({}, formData);
            
            if (result.errors) {
                const errorMsg = Object.values(result.errors).flat().join(", ");
                setError(errorMsg || "Validation failed");
                setIsLoading(false);
                return;
            }

            if (result.message && !result.data) {
                setError(result.message);
                setIsLoading(false);
                return;
            }

            if (result.data) {
                 useAuthStore.getState().setLogin({
                    id: result.data.id,
                    name: result.data.name || `${result.data.firstName} ${result.data.lastName}`,
                    firstName: result.data.firstName,
                    lastName: result.data.lastName,
                    email: result.data.email,
                    role: result.data.role
                 });
                 setIsLoading(false);
                 onLoginSuccess();
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    }
  };

  return (
    <motion.div 
        className="fixed inset-0 z-[100] grid place-items-center bg-black"
        exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-60"
                poster="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop"
            >
                <source src="/local_data/loginpage.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        </div>

        {/* Modal Card */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md mx-4 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl"
        >
            <div className="flex flex-col items-center mb-6">
                <h1 className="text-5xl font-black text-white tracking-tighter mb-2 drop-shadow-lg">GRUBHUB</h1>
                <p className="text-white/80 font-medium text-lg">Delicious food, delivered.</p>
            </div>

            {error && (
                <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center font-medium flex items-center justify-center gap-2"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {!isLogin && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-white/80 uppercase tracking-widest pl-1">First Name</label>
                            <div className="relative group">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors" size={16} />
                                <input 
                                    type="text" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="John"
                                    className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-10 pr-2 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/20 focus:border-white/30 transition-all font-medium text-sm"
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-white/80 uppercase tracking-widest pl-1">Last Name</label>
                            <div className="relative group">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors" size={16} />
                                <input 
                                    type="text" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Doe"
                                    className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-10 pr-2 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/20 focus:border-white/30 transition-all font-medium text-sm"
                                    required={!isLogin}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/80 uppercase tracking-widest pl-1">
                        {isLogin ? "Email or Phone" : "Email Address"}
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors" size={20} />
                        <input 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={isLogin ? "user@example.com" : "you@company.com"}
                            className="w-full bg-white/10 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/20 focus:border-white/30 transition-all font-medium"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/80 uppercase tracking-widest pl-1">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors" size={20} />
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-white/10 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/20 focus:border-white/30 transition-all font-medium"
                            required
                        />
                    </div>
                </div>

                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold h-14 rounded-xl transition-all shadow-lg shadow-orange-500/30 text-lg mt-6 flex items-center justify-center gap-2"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            {isLogin ? "Log In" : "Sign Up"} <ArrowRight size={20} />
                        </>
                    )}
                </motion.button>
            </form>

            <div className="mt-8 text-center space-y-4">
                <button 
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setError(null);
                    }}
                    className="text-white/90 text-sm hover:underline"
                >
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                </button>
                
                <div>
                    <button onClick={onLoginSuccess} className="text-white/50 text-xs font-bold uppercase hover:text-white transition-colors">
                        Skip for now
                    </button>
                </div>
            </div>
        </motion.div>
    </motion.div>
  );
}
