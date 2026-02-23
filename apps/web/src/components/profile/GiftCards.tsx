"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Plus, X } from "lucide-react";

export default function GiftCards() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleBuy = (amount: number) => {
      // Mock payment gateway redirection
      const confirmBuy = window.confirm(`Proceed to pay ₹${amount} for this Gift Card?`);
      if (confirmBuy) {
          alert("Redirecting to payment gateway... (Mock Success)");
          setBalance(prev => prev + amount);
      }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Gift className="text-purple-600" /> E-Gift Cards
      </h2>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg mb-8 relative overflow-hidden">
        <div className="relative z-10">
            <h3 className="text-purple-100 font-medium tracking-wider text-sm mb-1">TOTAL BALANCE</h3>
            <div className="text-4xl font-black mb-6">₹{balance.toFixed(2)}</div>
            <button 
                onClick={() => setShowAddModal(true)}
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/30 transition-colors"
            >
                <Plus size={16} /> Add Gift Card
            </button>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-x-5 translate-y-5"></div>
      </div>

      <h3 className="font-bold text-gray-800 mb-4">No active gift cards</h3>
      <p className="text-gray-500 text-sm mb-6">Purchase a gift card for yourself or gift it to your loved ones.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1000, 2000, 5000].map(amount => (
            <div 
                key={amount} 
                onClick={() => handleBuy(amount)}
                className="border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer group"
            >
                <div className="font-bold text-gray-700 group-hover:text-purple-700">Buy ₹{(amount / 100).toFixed(2)} Card</div>
                <button className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full group-hover:bg-purple-100">BUY</button>
            </div>
        ))}
      </div>

      {/* Add Card Modal */}
      <AnimatePresence>
        {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
                >
                    <button 
                        onClick={() => setShowAddModal(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                    
                    <h3 className="text-xl font-bold mb-4">Add Gift Card</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">PIN</label>
                            <input type="password" placeholder="****" className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 outline-none" />
                        </div>
                        <button 
                            onClick={() => {
                                alert("Invalid Card Details (Mock)");
                                setShowAddModal(false);
                            }}
                            className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors"
                        >
                            Redeem Card
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
