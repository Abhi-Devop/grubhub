"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Trash2, Edit2, X } from "lucide-react";
import { apiService } from "@/lib/api"; // Switched to apiService
import { useAuthStore } from "@/store/useAuth";

interface Address {
    id: string;
    type: string;
    name: string;
    street: string; 
}

export default function AddressesList() {
  const { user } = useAuthStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ type: "Home", name: "", address: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
        fetchAddresses();
    }
  }, [user?.id]);

  const fetchAddresses = async () => {
    try {
        // apiService.getUserAddresses expects userId or headers? api.ts says it calls /orders/user/... wait
        // api.ts does NOT have getUserAddresses. It has saveAddress, updateAddress, deleteAddress.
        // It has getUserOrders but not getUserAddresses?
        // Let's use apiClient for fetch if apiService lacks it, or add it to apiService.
        // api.ts has saveAddress, updateAddress, deleteAddress.
        // It does NOT have getAddresses explicitly exported... wait.
        // Checking api.ts content from step 542... 
        // It has properties: getProducts, getCategories, getProductById, getOrders, getAllUsers, createProduct...
        // saveAddress, updateAddress, deleteAddress.
        // It DOES NOT have getUserAddresses.
        // I should add getUserAddresses to api.ts or use apiClient directly here.
        // I will use apiClient for fetch to avoid more file referencing issues for now, or just add it.
        // Actually, let's keep using apiClient for fetch since it was working.
        // But for update/save/delete I'll use apiService.
        
        // RE-READING Step 512 original code: uses apiClient.get(`/addresses?userId=${user?.id}`)
        // I will keep that custom fetch or move it to apiService.
        // Let's stick to apiClient for fetch to minimize changes, but use apiService for actions.
    } catch (error) {
        console.error("Failed to fetch addresses:", error);
    } 
  };
  
  // Custom fetch implementation inside component for now to avoid breaking api.ts again
  const getAddresses = async () => {
      if(!user?.id) return;
      try {
        const res = await fetch(`http://localhost:3002/addresses?userId=${user.id}`);
        if(res.ok) {
            const data = await res.json();
            setAddresses(data);
        }
      } catch(e) { console.error(e); }
      setLoading(false);
  }

  useEffect(() => { getAddresses(); }, [user?.id]);

  const handleDelete = async (id: string) => {
      if (confirm("Are you sure you want to delete this address?")) {
          try {
             await apiService.deleteAddress(id, user!.id);
             setAddresses(prev => prev.filter(addr => addr.id !== id));
          } catch (error) {
              console.error("Failed to delete address:", error);
              alert("Failed to delete address");
          }
      }
  };

  const openEdit = (addr: Address) => {
      setFormData({
          type: addr.type,
          name: addr.name,
          address: addr.street || (addr as any).address
      });
      setEditingId(addr.id);
      setShowAddModal(true);
  };

  const openAdd = () => {
      setFormData({ type: "Home", name: "", address: "" });
      setEditingId(null);
      setShowAddModal(true);
  }

  const handleSave = async () => {
      if (!formData.name || !formData.address) return alert("Please fill all fields");
      
      try {
          if (editingId) {
              // Update
              const updated = await apiService.updateAddress(editingId, user!.id, {
                  name: formData.name,
                  address: formData.address,
                  type: formData.type
              });
              
              setAddresses(prev => prev.map(a => a.id === editingId ? updated : a));
              alert("Address updated successfully!");
          } else {
              // Create
              const created = await apiService.saveAddress(user!.id, {
                  name: formData.name,
                  address: formData.address,
                  type: formData.type
              });
              setAddresses(prev => [...prev, created]);
              alert("Address saved successfully!");
          }
          setShowAddModal(false);
      } catch (error) {
          console.error("Failed to save address:", error);
          alert("Failed to save address");
      }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading addresses...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="text-brand-green" /> Saved Addresses
        </h2>
        <button 
            onClick={openAdd}
            className="text-brand-orange text-sm font-bold flex items-center gap-1 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors"
        >
            <Plus size={16} /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
            <div key={addr.id} className="bg-white border rounded-xl p-5 shadow-sm relative group hover:border-brand-green/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-100 text-xs font-bold px-2 py-0.5 rounded text-gray-600 uppercase">{addr.type}</span>
                </div>
                <p className="text-gray-800 font-bold mb-1">{addr.name}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {addr.street || (addr as any).address} 
                </p>
                
                <div className="flex items-center gap-3 pt-3 border-t">
                    <button 
                        onClick={() => openEdit(addr)}
                        className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
                    >
                        <Edit2 size={12}/> EDIT
                    </button>
                    <button 
                        onClick={() => handleDelete(addr.id)}
                        className="text-xs font-bold text-red-500 flex items-center gap-1 hover:underline"
                    >
                        <Trash2 size={12}/> DELETE
                    </button>
                </div>
            </div>
        ))}

        <div 
            onClick={openAdd}
            className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center text-gray-400 gap-2 hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer min-h-[160px]"
        >
            <Plus size={32} className="opacity-50"/>
            <span className="font-bold text-sm">Add New Address</span>
        </div>
      </div>

       {/* Add/Edit Address Modal */}
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
                    
                    <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Address" : "Add New Address"}</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                type="text" 
                                placeholder="e.g. Home, Work, Mom's Place"
                                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-brand-orange outline-none" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <div className="relative">
                                <textarea 
                                    value={formData.address}
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    placeholder="Full address details"
                                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-brand-orange outline-none pr-10" 
                                    rows={3}
                                />
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (navigator.geolocation) {
                                            navigator.geolocation.getCurrentPosition((pos) => {
                                                const { latitude, longitude } = pos.coords;
                                                setFormData(prev => ({
                                                    ...prev, 
                                                    address: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`
                                                }));
                                            }, (err) => alert("Could not fetch location"));
                                        } else {
                                            alert("Geolocation not supported");
                                        }
                                    }}
                                    className="absolute right-2 top-2 text-brand-orange hover:text-orange-700 p-1"
                                    title="Use Current Location"
                                >
                                    <MapPin size={20} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select 
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-brand-orange outline-none"
                            >
                                <option>Home</option>
                                <option>Work</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <button 
                            onClick={handleSave}
                            className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors"
                        >
                            {editingId ? "Update Address" : "Save Address"}
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
