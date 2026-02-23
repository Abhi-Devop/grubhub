"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

const FAQS = [
    {
        q: "Where is my order?",
        a: "You can track your order status in the 'My Orders' section. Once a rider is assigned, you can see their real-time location on the map."
    },
    {
        q: "How can I change my delivery address?",
        a: "You can change your address before placing an order. Once the order is placed, please contact support immediately if you need to change the location."
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Netbanking, and Cash on Delivery."
    },
    {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 1 minute of placing them. After that, the restaurant prepares the food, so cancellation might not be possible."
    },
    {
        q: "I received missing or wrong items.",
        a: "We apologize for the inconvenience. Please go to your Order details and click on 'Report Issue' to get a refund or replacement."
    }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <HelpCircle className="text-brand-orange" /> Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white border hover:border-brand-green/30 transition-colors rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenIndex(active => active === idx ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center font-bold text-gray-800"
                >
                    {faq.q}
                    <motion.div animate={{ rotate: openIndex === idx ? 180 : 0 }}>
                        <ChevronDown size={20} className="text-gray-400" />
                    </motion.div>
                </button>
                <AnimatePresence>
                    {openIndex === idx && (
                        <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="bg-gray-50 px-5 pb-5 text-gray-600 text-sm leading-relaxed"
                        >
                            {faq.a}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-center gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm text-blue-600">
              <MessageCircle size={24} />
          </div>
          <div>
              <h3 className="font-bold text-gray-800">Still have questions?</h3>
              <p className="text-sm text-gray-600 mb-2">Our support team is available 24/7 to help you.</p>
              <button 
                  onClick={() => alert("Connecting you to a support agent... (Mock)")}
                  className="text-blue-700 font-bold text-sm hover:underline"
              >
                  Chat with Support
              </button>
          </div>
      </div>
    </motion.div>
  );
}
