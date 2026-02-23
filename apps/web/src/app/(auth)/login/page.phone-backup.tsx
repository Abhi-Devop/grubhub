"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuth";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const { setLogin, isAuthenticated } = useAuthStore();
  
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }

    // Cleanup existing verifier to prevent conflicts
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.warn("Failed to clear existing recaptcha", e);
      }
      window.recaptchaVerifier = undefined;
    }

    // Initialize Recaptcha
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible', // Use 'invisible' for seamless experience. 'normal' if you want a checkbox.
        'callback': (response: any) => {
          // reCAPTCHA solved
          console.log("Recaptcha solved");
        },
        'expired-callback': () => {
          // Response expired
          console.warn("Recaptcha expired");
          alert("Recaptcha expired. Please reload.");
        }
      });
    } catch (err) {
      console.error("Recaptcha Init Error:", err);
    }

    return () => {
      // Cleanup on unmount
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch(e) {}
        window.recaptchaVerifier = undefined;
      }
    };
  }, [isAuthenticated, router]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
        alert("Please enter a valid 10-digit number");
        return;
    }
    setLoading(true);
    
    try {
        const formattedPhoneNumber = `+91${phone}`;
        
        if (!auth) {
            throw new Error("Firebase Auth not initialized");
        }

        if (!window.recaptchaVerifier) {
            console.warn("RecaptchaVerifier not found, re-initializing...");
            try {
                // Ensure element exists
                if (!document.getElementById('recaptcha-container')) {
                    throw new Error("recaptcha-container element not found");
                }
                
                window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    'size': 'invisible',
                    'callback': (response: any) => {
                         console.log("Recaptcha solved via re-init");
                    }
                });
            } catch (err: any) {
                throw new Error(`Failed to re-init Recaptcha: ${err.message}`);
            }
        }

        const appVerifier = window.recaptchaVerifier;
        if (!appVerifier) {
             throw new Error("appVerifier is still null after init attempt");
        }
        
        console.log("Signing in with:", formattedPhoneNumber);
        
        const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
        setConfirmationResult(confirmation);
        setStep(2);
        // alert(`OTP sent`); 
    } catch (err: any) {
        console.error("Error sending OTP:", err);
        
        let msg = err.message;
        if (err.code === 'auth/argument-error') {
            msg = "Internal Error: Invalid arguments provided to Firebase. Please reload.";
        } else if (err.code === 'auth/captcha-check-failed') {
            msg = "ReCAPTCHA check failed. Please check your connection.";
        } else if (err.code === 'auth/invalid-app-credential') {
            msg = "Invalid config. Check your Firebase domain settings.";
        } else if (err.code === 'auth/billing-not-enabled') {
            msg = "Firebase Billing is not enabled. Go to Firebase Console > Authentication > Sign-in method > Phone > Testing, and add this number as a TEST LOG number to bypass billing and SMS.";
        }
        
        alert(`Error: ${msg}`);
        
        // Use a safer reset approach
         if (window.recaptchaVerifier) {
             try {
                window.recaptchaVerifier.clear();
             } catch(e) {}
             window.recaptchaVerifier = undefined;
        }
    } finally {
        setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
        alert("Please enter a valid 6-digit OTP");
        return;
    }
    setLoading(true);

    try {
        if (!confirmationResult) {
            throw new Error("No confirmation result found. Please request OTP again.");
        }

        const result = await confirmationResult.confirm(otp);
        const idToken = await result.user.getIdToken();

        // Call backend to verify token and get user data
        const res = await fetch("http://localhost:3002/auth/phone-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
        });
        
        const data = await res.json();
        
        if (res.ok) {
            setLogin(data.user);
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/");
        } else {
            alert(data.message || "Login failed");
        }
    } catch (err: any) {
        console.error("Verification Error:", err);
        alert(`Verification failed: ${err.message}`);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
       <Header />
       <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white px-8 py-10 rounded-2xl shadow-sm max-w-sm w-full text-center">
             <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl">
                🍔
             </div>
             <h2 className="text-2xl font-bold mb-2">
                 {step === 1 ? "Get Started with GrubHub" : "Verify OTP"}
             </h2>
             <p className="text-gray-500 mb-8 text-sm">
                 {step === 1 ? "Log in or Sign up to continue" : `Enter the OTP sent to +91 ${phone}`}
             </p>

             {/* Recaptcha Container */}
             <div id="recaptcha-container"></div>

             {step === 1 ? (
                 <form onSubmit={handleSendOtp} className="space-y-4">
                     <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-700">+91</span>
                        <input 
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 10) setPhone(val);
                          }}
                          placeholder="Enter mobile number"
                          className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-14 pr-4 outline-none focus:border-black font-medium transition-colors text-lg tracking-widest"
                          maxLength={10}
                          autoFocus
                        />
                     </div>
                     <button 
                       disabled={loading}
                       className="w-full bg-brand-green text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700 transition-colors disabled:opacity-70"
                     >
                        {loading ? "Sending OTP..." : "Continue"}
                        {!loading && <ChevronRight size={18} />}
                     </button>
                 </form>
             ) : (
                 <form onSubmit={handleVerifyOtp} className="space-y-4">
                     <div className="relative">
                        <input 
                          type="text"
                          value={otp}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 6) setOtp(val);
                          }}
                          placeholder="Enter 6-digit OTP"
                          className="w-full bg-white border border-gray-300 rounded-xl py-3 px-4 text-center outline-none focus:border-black font-bold transition-colors text-2xl tracking-[10px]"
                          maxLength={6}
                          autoFocus
                        />
                     </div>
                     <button 
                       disabled={loading}
                       className="w-full bg-brand-orange text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-70"
                     >
                        {loading ? "Verifying..." : "Login"}
                        {!loading && <ArrowRight size={18} />}
                     </button>
                     <button 
                         type="button" 
                         onClick={() => setStep(1)}
                         className="text-xs text-gray-500 font-bold hover:text-brand-black"
                     >
                         Change Phone Number
                     </button>
                 </form>
             )}
             
             <p className="text-xs text-gray-400 mt-6">
                By continuing, you agree to our Terms of Service & Privacy Policy
             </p>
          </div>
       </div>
    </div>
  );
}
