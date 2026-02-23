"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, ShoppingBag } from "lucide-react";
import { useEffect } from "react";

export type NotificationType = "success" | "error" | "info";

interface ThreeDNotificationProps {
  message: string;
  isVisible: boolean;
  type?: NotificationType;
  onClose: () => void;
}

export default function ThreeDNotification({ 
  message, 
  isVisible, 
  type = "success",
  onClose 
}: ThreeDNotificationProps) {
  
  // Auto-dismiss
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getIcon = () => {
    switch(type) {
      case "success": return <CheckCircle className="text-green-400" size={24} />;
      case "error": return <AlertCircle className="text-red-400" size={24} />;
      default: return <ShoppingBag className="text-blue-400" size={24} />;
    }
  };

  const getBorderColor = () => {
    switch(type) {
        case "success": return "border-green-500/50 shadow-[0_0_20px_rgba(74,222,128,0.3)]";
        case "error": return "border-red-500/50 shadow-[0_0_20px_rgba(248,113,113,0.3)]";
        default: return "border-blue-500/50 shadow-[0_0_20px_rgba(96,165,250,0.3)]";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] perspective-[1000px]">
          <motion.div
            initial={{ rotateX: -90, opacity: 0, y: -20 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ rotateX: 70, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`
                flex items-center gap-3 px-6 py-4 
                bg-black/80 backdrop-blur-xl
                text-white rounded-xl
                border ${getBorderColor()}
                transform-style-3d
            `}
          >
            {getIcon()}
            <span className="font-bold tracking-wide">{message}</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
