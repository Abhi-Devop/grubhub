import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuth";
import { apiService } from "@/lib/api"; // Corrected import
import { User, Phone, Mail, Save, Loader2 } from "lucide-react";

export default function ProfileDetails() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "", // Email usually read-only but good to show
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        if (!user?.id) return;
        
        const updatedUser = await apiService.updateProfile(user.id, {
            name: formData.name,
            phone: formData.phone
            // Email updates usually require verification, skipping for now
        });

        setUser({ ...user, ...updatedUser });
        alert("Profile updated successfully!");
    } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 animate-in fade-in">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
         <User className="text-brand-orange" /> Personal Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                </div>
                <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all"
                    placeholder="Enter your name"
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Phone size={18} />
                </div>
                <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none transition-all"
                    placeholder="Enter phone number"
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                </div>
                <input 
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 border rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
            </div>
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
        </div>

        <div className="pt-4">
            <button 
                type="submit" 
                disabled={loading}
                className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-orange-200 hover:bg-orange-600 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                Save Changes
            </button>
        </div>
      </form>
    </div>
  );
}
