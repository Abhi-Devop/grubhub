import React from "react";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Settings size={40} className="text-gray-400" />
      </div>
      <h1 className="text-2xl font-black text-brand-black mb-2">Settings</h1>
      <p className="text-gray-500 max-w-md">
        This module is currently under development. Global application settings will appear here.
      </p>
    </div>
  );
}
