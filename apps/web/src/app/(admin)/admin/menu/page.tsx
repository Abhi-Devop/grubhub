"use client";
import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { apiService } from "@/lib/api";
import ProductForm from "@/components/admin/ProductForm";

export default function MenuPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = () => {
      setEditingItem(null);
      setIsFormOpen(true);
  };

  const handleEdit = (item: any) => {
      setEditingItem(item);
      setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
      if (confirm("Are you sure you want to delete this item?")) {
          await apiService.deleteProduct(id);
          loadProducts();
      }
  };

  const handleSubmit = async (data: any) => {
      if (editingItem) {
          await apiService.updateProduct(editingItem.id, data);
      } else {
          await apiService.createProduct(data);
      }
      loadProducts();
  };

  const loadProducts = async () => {
      setLoading(true);
      const data = await apiService.getProducts();
      // data might be Database Product[] or transformed FoodItem[]
      // apiService.getProducts returns transformed items in Search but Database items in getProducts?
      // checking api.ts: getProducts calls /search?q= which returns transformed items.
      setProducts(data);
      setLoading(false);
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-black text-brand-black tracking-tight">Menu Items</h1>
           <p className="text-gray-500">Manage your food catalog.</p>
        </div>
        <button 
            onClick={handleAdd}
            className="bg-brand-orange text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700 transition-colors"
        >
            <Plus size={20} />
            Add Item
        </button>
      </div>

      {isFormOpen && (
          <ProductForm 
              initialData={editingItem} 
              onClose={() => setIsFormOpen(false)} 
              onSubmit={handleSubmit} 
          />
      )}

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search items..." 
            className="flex-1 outline-none text-gray-700 font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                      <th className="text-left p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Item</th>
                      <th className="text-left p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Category</th>
                      <th className="text-left p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Price</th>
                      <th className="text-left p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Stock</th>
                      <th className="text-right p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  {loading ? (
                      <tr><td colSpan={5} className="p-8 text-center text-gray-400 font-bold">Loading menu...</td></tr>
                  ) : filtered.length === 0 ? (
                      <tr><td colSpan={5} className="p-8 text-center text-gray-400 font-bold">No items found.</td></tr>
                  ) : (
                      filtered.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                              <td className="p-4 flex items-center gap-4">
                                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                      <Image src={item.image || "/placeholder-food.jpg"} alt={item.name} fill className="object-cover" />
                                  </div>
                                  <div>
                                      <div className="font-bold text-gray-800">{item.name}</div>
                                      <div className="text-xs text-gray-400 truncate max-w-[200px]">{item.description}</div>
                                  </div>
                              </td>
                              <td className="p-4 text-sm font-medium text-gray-600">
                                  <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">
                                      {typeof item.category === 'object' ? item.category?.name : item.category}
                                  </span>
                              </td>
                              <td className="p-4 font-bold text-gray-800">₹{(item.price / 100).toFixed(2)}</td>
                              <td className="p-4">
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${item.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                      {item.stock > 0 ? `${item.stock} in stock` : "Out of Stock"}
                                  </span>
                              </td>
                              <td className="p-4 text-right space-x-2">
                                  <button onClick={() => handleEdit(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                      <Edit2 size={16} />
                                  </button>
                                  <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                                      <Trash2 size={16} />
                                  </button>
                              </td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
      </div>
    </div>
  );
}
