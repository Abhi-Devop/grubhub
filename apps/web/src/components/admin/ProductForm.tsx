"use client";
import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { apiService } from "@/lib/api";

interface ProductFormProps {
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export default function ProductForm({ initialData, onClose, onSubmit }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price ? (initialData.price / 100).toString() : "",
      category: initialData?.category?.name || initialData?.category || "",
      image: initialData?.image || "",
  });

  useEffect(() => {
    const fetchCats = async () => {
        const data = await apiService.getCategories();
        setCategories(data);
    };
    fetchCats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      await onSubmit({
          ...formData,
          price: Number(formData.price)
      });
      setIsLoading(false);
      onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h2 className="font-extrabold text-xl text-brand-black tracking-tight">{initialData ? "Edit Product" : "Add New Product"}</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                    <X size={20} />
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1.5 tracking-widest">Product Title</label>
                    <input 
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange font-bold text-gray-800 transition-all"
                        placeholder="e.g. Signature Truffle Pizza"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1.5 tracking-widest">Story & Ingredients</label>
                    <textarea 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm font-semibold text-gray-700 h-24 resize-none transition-all"
                        placeholder="A delightful blend of..."
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase mb-1.5 tracking-widest">Price (₹)</label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                            <input 
                                required
                                type="number"
                                step="0.01"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 pl-8 outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange font-bold text-gray-800 transition-all"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase mb-1.5 tracking-widest">Category</label>
                        <div className="relative">
                            <select 
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange font-bold text-gray-800 appearance-none transition-all"
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                ))}
                                <option value="NEW">+ Create New Category</option>
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        </div>
                        {formData.category === 'NEW' && (
                            <input 
                                required
                                className="mt-2 w-full bg-orange-50 border border-orange-200 rounded-xl p-3.5 outline-none focus:border-brand-orange font-bold text-gray-800 animate-in slide-in-from-top-2"
                                placeholder="Enter New Category Name"
                                onChange={e => setFormData({...formData, category: e.target.value})}
                            />
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1.5 tracking-widest">Gallery Image Link</label>
                    <input 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm font-semibold text-gray-500 transition-all"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.image}
                        onChange={e => setFormData({...formData, image: e.target.value})}
                    />
                </div>

                <div className="pt-4">
                    <button 
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-brand-black text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-black/10 hover:bg-gray-900 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? "Synchronizing..." : (initialData ? "Update Collection" : "Add to Menu")}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}

