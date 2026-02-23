"use client";
import React, { useState } from "react";
import { useCart } from "@/store/useCart";
import { useLocation } from "@/lib/LocationContext";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuth";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { 
  MapPin, 
  ChevronDown, 
  ChevronRight, 
  AlertCircle,
  ShieldCheck,
  Smartphone,
  Banknote,
  Navigation,
  CreditCard as CardIcon,
  ShoppingBag,
  ArrowLeft,
  Wallet
} from "lucide-react";
import Image from "next/image";
import { apiService } from "@/lib/api";
import AnimatedCheckoutButton from "@/components/AnimatedCheckoutButton";
import AuthModal from "@/components/AuthModal";
import { motion, AnimatePresence } from "framer-motion";

// Premium Payment Accordion Component
const PaymentAccordion = ({ 
  id,
  title, 
  subtitle,
  icon: Icon, 
  isOpen, 
  onToggle, 
  children,
  isLast = false
}: { 
  id: string;
  title: string; 
  subtitle?: string;
  icon: any; 
  isOpen: boolean; 
  onToggle: () => void; 
  children?: React.ReactNode;
  isLast?: boolean;
}) => {
  return (
    <motion.div 
      layout
      className={`relative overflow-hidden ${!isLast ? 'border-b border-stone-100' : ''} transition-all duration-500 ${
        isOpen ? 'border-l-4 border-l-[#d4af37] bg-stone-50/30' : 'bg-transparent'
      }`}
    >
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left outline-none group"
      >
        <div className="flex items-center gap-5">
           <div className={`transition-colors duration-500 ${isOpen ? 'text-[#d4af37]' : 'text-stone-300 group-hover:text-stone-500'}`}>
              <Icon size={20} strokeWidth={1.5} />
           </div>
           <div>
              <h3 className={`text-base font-bold tracking-tight transition-colors ${isOpen ? 'text-stone-900' : 'text-stone-500'}`}>{title}</h3>
              {subtitle && <p className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mt-0.5">{subtitle}</p>}
           </div>
        </div>
        <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#d4af37]' : 'text-stone-200'}`}>
           <ChevronDown size={16} />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="overflow-hidden"
          >
             <div className="px-6 pb-8 pt-1">
                {children}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function CheckoutPage() {
  const { items, clearCart, activeStoreId: cartStoreId } = useCart();
  const { address, location, storeId: locationStoreId } = useLocation();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [openSection, setOpenSection] = useState<string>("upi"); 
  const [upiId, setUpiId] = useState("");
  const [isValidUpi, setIsValidUpi] = useState<boolean | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 1500; // Rs 15.00 in cents
  const grandTotal = subtotal + deliveryFee;

  const verifyUpi = () => {
      if (upiId.includes("@")) {
          setIsValidUpi(true);
      } else {
          setIsValidUpi(false);
      }
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated || !user) {
        setIsAuthModalOpen(true);
        return; // Fixed: using return instead of throw to avoid unhandled rejections if we want to show UI
    }

    let activeStoreId = cartStoreId || locationStoreId || "1";
    if (activeStoreId === "global-grubhub") activeStoreId = "1";
    
    setLoading(true);

    try {
        if (openSection === "cash") {
            const order = await apiService.createOrder({
                userId: user.id,
                storeId: activeStoreId,
                items: items.map(i => ({ storeProductId: i.storeProductId, quantity: i.quantity })),
                paymentMethod: "CASH"
            });
            
            clearCart();
            setTimeout(() => {
                router.push(`/orders/${order.orderId}`);
            }, 5500);
            return;
        }

        const rzpOrder = await apiService.createPaymentOrder({
            userId: user.id,
            storeId: activeStoreId,
            items: items.map(i => ({ storeProductId: i.storeProductId, quantity: i.quantity }))
        });

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
            amount: rzpOrder.amount,
            currency: rzpOrder.currency,
            name: "GrubHub Reserve",
            description: "Elite Dining Experience",
            order_id: rzpOrder.id,
            handler: async function (response: any) {
                try {
                    clearCart();
                    setTimeout(() => {
                        router.push(`/orders/${rzpOrder.internalOrderId}`); 
                    }, 3500);
                } catch (err) {
                    console.error("Redirection failed:", err);
                }
            },
            prefill: {
                name: user.firstName ? `${user.firstName} ${user.lastName}` : "Valued Guest",
                email: user.email || "",
                contact: user.phone || ""
            },
            theme: { color: "#0f291e" }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();

    } catch (error: any) {
        console.error("Checkout error:", error);
        alert(error.message || "Something went wrong!");
    } finally {
        setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
        <div className="h-screen bg-[#fafaf9] flex flex-col font-sans overflow-hidden">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6"
                >
                    <div className="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center">
                      <ShoppingBag size={40} strokeWidth={1.5} className="text-stone-400" />
                    </div>
                </motion.div>
                <h2 className="text-3xl font-serif font-light text-stone-900 mb-4 tracking-wide">Your Table is Clear</h2>
                <p className="text-stone-400 font-bold mb-10 max-w-xs text-xs uppercase tracking-widest leading-loose">Our curated menu awaits your selection for an exquisite dining journey.</p>
                <button 
                  onClick={() => router.push("/")} 
                  className="bg-[#0f291e] text-[#fafaf9] px-14 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-stone-900 hover:scale-105 active:scale-95 transition-all text-[11px] shadow-2xl"
                >
                    Explore Menu
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="h-screen bg-[#fafaf9] font-sans selection:bg-[#d4af37]/20 selection:text-[#d4af37] flex flex-col overflow-hidden">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-8 py-8 flex flex-col overflow-hidden">
        <header className="mb-6 shrink-0">
            <div className="flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.3em] text-stone-300 mb-2">
                <Link href="/cart" className="hover:text-[#d4af37] transition-colors">Cart</Link>
                <ChevronRight size={12} strokeWidth={3} className="text-stone-200" />
                <span className="text-stone-900 border-b-2 border-stone-900 pb-0.5">Payment</span>
                <ChevronRight size={12} strokeWidth={3} className="text-stone-200" />
                <span className="opacity-30">Confirmation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-light text-[#0f291e] tracking-tight leading-none">Complete Your Order</h1>
        </header>
        
        <main className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-12 gap-10">
            
            {/* LEFT COLUMN - Payments */}
            <div className="lg:col-span-7 flex flex-col min-h-0">
                <h3 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.3em] mb-5 shrink-0">Select Payment Method</h3>
                
                <div className="flex-1 min-h-0 overflow-y-auto rounded-[2.5rem] border border-stone-200 bg-white shadow-2xl custom-scrollbar-light">
                    <PaymentAccordion 
                      id="upi"
                      title="Unified Payments Interface" 
                      subtitle="UPI / GPay / PhonePe"
                      icon={Smartphone} 
                      isOpen={openSection === "upi"}
                      onToggle={() => setOpenSection("upi")}
                    >
                        <div className="max-w-md space-y-8">
                            <div className="flex items-center gap-6 grayscale opacity-40">
                                 <Image src="https://cdn-icons-png.flaticon.com/128/825/825454.png" width={22} height={22} alt="GPay" />
                                 <Image src="https://cdn-icons-png.flaticon.com/128/196/196566.png" width={22} height={22} alt="Paytm" />
                            </div>

                            <div className="relative">
                                 <input 
                                   type="text" 
                                   placeholder="vpa@bank"
                                   value={upiId}
                                   onChange={(e) => {
                                       setUpiId(e.target.value);
                                       setIsValidUpi(null);
                                   }}
                                   className="w-full bg-transparent border-b-2 border-stone-100 py-4 text-base font-bold placeholder:text-stone-200 outline-none focus:border-[#0f291e] transition-colors rounded-none h-12"
                                 />
                                 <div className="absolute right-0 bottom-4">
                                    {isValidUpi === null && (
                                        <button 
                                            onClick={verifyUpi}
                                            disabled={!upiId}
                                            className="text-[10px] font-black text-[#0f291e] uppercase tracking-widest disabled:opacity-20 hover:text-[#d4af37] transition-colors"
                                        >
                                            Verify
                                        </button>
                                    )}
                                    {isValidUpi === true && <span className="text-green-600 text-[10px] font-black uppercase tracking-widest">Verified</span>}
                                 </div>
                            </div>
                            
                            <AnimatePresence>
                                {isValidUpi === false && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                                        <AlertCircle size={12}/> Verification Required
                                    </motion.p>
                                )}
                                {isValidUpi === true && (
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                                        <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em] text-center w-full py-5">
                                            Select Place Order below to continue
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </PaymentAccordion>

                    <PaymentAccordion 
                      id="cards"
                      title="Credit & Debit Cards" 
                      subtitle="Visa / MasterCard / AMEX"
                      icon={CardIcon} 
                      isOpen={openSection === "cards"}
                      onToggle={() => setOpenSection("cards")}
                    >
                        <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }} className="max-w-md space-y-6">
                            <input type="text" placeholder="Card Number" className="w-full bg-transparent border-b-2 border-stone-100 py-4 text-base font-bold placeholder:text-stone-200 outline-none focus:border-[#0f291e] transition-colors rounded-none h-12" />
                            <div className="grid grid-cols-2 gap-8">
                                 <input type="text" placeholder="MM / YY" className="w-full bg-transparent border-b-2 border-stone-100 py-4 text-base font-bold placeholder:text-stone-200 outline-none focus:border-[#0f291e] transition-colors rounded-none h-12" />
                                 <input type="password" placeholder="CVV" className="w-full bg-transparent border-b-2 border-stone-100 py-4 text-base font-bold placeholder:text-stone-200 outline-none focus:border-[#0f291e] transition-colors rounded-none h-12" />
                            </div>
                        </form>
                    </PaymentAccordion>

                    <PaymentAccordion 
                      id="wallets"
                      title="Digital Wallets" 
                      subtitle="Mobile Wallets"
                      icon={Wallet} 
                      isOpen={openSection === "wallets"}
                      onToggle={() => setOpenSection("wallets")}
                    >
                        <div className="grid grid-cols-2 gap-4 pb-1">
                             <button onClick={handlePlaceOrder} className="group p-5 border-2 border-stone-50 hover:border-[#0f291e] hover:bg-stone-50 transition-all text-left rounded-[1.5rem]">
                                 <h4 className="font-black text-stone-900 text-sm mb-1">PhonePe</h4>
                                 <p className="text-[9px] font-black text-stone-300 uppercase tracking-widest">Connect</p>
                             </button>
                             <button onClick={handlePlaceOrder} className="group p-5 border-2 border-stone-50 hover:border-[#0f291e] hover:bg-stone-50 transition-all text-left rounded-[1.5rem]">
                                 <h4 className="font-black text-stone-900 text-sm mb-1">PayPal</h4>
                                 <p className="text-[9px] font-black text-stone-300 uppercase tracking-widest">Global</p>
                             </button>
                        </div>
                    </PaymentAccordion>

                    <PaymentAccordion 
                      id="cash"
                      title="Settlement at Doorstep" 
                      subtitle="Cash or Physical Card"
                      icon={Banknote} 
                      isOpen={openSection === "cash"}
                      onToggle={() => setOpenSection("cash")}
                      isLast={true}
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 py-2">
                             <div className="text-center sm:text-left">
                                 <h4 className="text-base font-serif italic text-stone-900 mb-1">Concierge Settlement</h4>
                                 <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest leading-relaxed">Prepare currency for arrival</p>
                             </div>
                        </div>
                    </PaymentAccordion>
                </div>
            </div>

            {/* RIGHT COLUMN - Selection Summary */}
            <aside className="lg:col-span-5 flex flex-col min-h-0">
                
                <h3 className="text-[11px] font-black text-stone-400 uppercase tracking-[0.3em] mb-5 shrink-0">Your Selection</h3>
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[#0f291e] p-8 rounded-[3rem] text-stone-100 shadow-2xl relative overflow-hidden flex-1 min-h-0 flex flex-col"
                >
                    <div className="flex-1 min-h-0 overflow-y-auto pr-4 custom-scrollbar-dark mb-8">
                        <div className="space-y-6">
                          {items.map(item => (
                              <div key={item.storeProductId} className="flex justify-between items-center group">
                                  <div className="flex flex-col gap-1">
                                      <span className="text-sm font-black tracking-wide text-white group-hover:text-[#d4af37] transition-colors">{item.name}</span>
                                      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{item.quantity} UNIT{item.quantity > 1 ? 'S' : ''}</span>
                                  </div>
                                  <div className="h-px flex-1 mx-6 border-b border-white/10 border-dashed"></div>
                                  <span className="text-sm font-black text-[#d4af37] tabular-nums">₹{(item.price * item.quantity / 100).toFixed(2)}</span>
                              </div>
                          ))}
                        </div>
                    </div>

                    <div className="space-y-4 border-t border-white/10 pt-8 shrink-0">
                        <div className="flex justify-between text-[11px] font-extrabold text-white/40 uppercase tracking-[0.2em]">
                             <span>Subtotal</span>
                             <span className="text-white">₹{(subtotal / 100).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-extrabold text-white/40 uppercase tracking-[0.2em]">
                             <span>Priority Delivery</span>
                             <span className="text-[#d4af37]">Reserved</span>
                        </div>
                        <div className="pt-6 flex justify-between items-end">
                            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20">Final Amount</span>
                            <span className="text-5xl font-serif font-light text-[#d4af37] tabular-nums leading-none tracking-tighter">₹{(grandTotal / 100).toFixed(2)}</span>
                        </div>
                        
                        {/* DESKTOP CTA */}
                        <div className="hidden lg:block pt-8">
                           <AnimatedCheckoutButton 
                               onClick={handlePlaceOrder} 
                               label="SECURE SETTLEMENT" 
                               disabled={loading}
                           />
                        </div>
                    </div>
                </motion.div>

                {/* Trust Signal */}
                <div className="flex items-center justify-center gap-5 py-8 border-t border-transparent shrink-0">
                    <ShieldCheck size={16} className="text-stone-200" />
                    <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.5em]">Reserved Security</span>
                </div>
            </aside>

        </main>
      </div>

      {/* MOBILE STICKY CTA BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-100 p-8 pb-sorted z-50 flex items-center justify-between shadow-[0_-25px_70px_rgba(0,0,0,0.12)]">
         <div className="flex flex-col">
             <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mb-1">Grand Total</span>
             <span className="text-3xl font-serif font-light text-[#0f291e] tracking-tight leading-none">₹{(grandTotal / 100).toFixed(2)}</span>
         </div>
         <div className="w-48">
             <AnimatedCheckoutButton 
                 onClick={handlePlaceOrder} 
                 label="FINALIZE" 
                 disabled={loading}
             />
         </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => {
            handlePlaceOrder().catch(err => {
                if (err.message !== "AUTH_REQUIRED") console.error(err);
            }); 
        }} 
      />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          background-color: #fafaf9;
          overflow: hidden;
        }
        
        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-sans {
          font-family: 'Outfit', sans-serif;
        }

        .custom-scrollbar-light::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-light::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.08);
          border-radius: 20px;
        }

        .custom-scrollbar-dark::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 20px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.25);
          border-radius: 20px;
        }
        
        .pb-sorted {
          padding-bottom: calc(2rem + env(safe-area-inset-bottom));
        }

        @media (max-width: 1023px) {
          body {
            overflow: auto;
          }
          .h-screen {
            height: auto;
            min-height: 100vh;
          }
          .overflow-hidden {
            overflow: visible;
          }
        }
      `}</style>
    </div>
  );
}
