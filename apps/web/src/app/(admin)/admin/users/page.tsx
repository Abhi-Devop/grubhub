"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Shield, User as UserIcon } from "lucide-react";
import { apiService } from "@/lib/api";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
      setLoading(true);
      const data = await apiService.getAllUsers();
      setUsers(data);
      setLoading(false);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
      if (confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
          try {
              await apiService.updateUserRole(userId, newRole);
              // Optimistic update
              setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
          } catch (e) {
              alert("Failed to update role");
          }
      }
  };

  const filtered = users.filter(u => 
      (u.firstName?.toLowerCase() || "").includes(search.toLowerCase()) || 
      (u.email?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-black text-brand-black tracking-tight">User Management</h1>
           <p className="text-gray-500">Manage customers and admin accounts.</p>
        </div>
        <div className="bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <Users size={20} />
            {users.length} Total Users
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="flex-1 outline-none text-gray-700 font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                      <th className="text-left p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">User</th>
                      <th className="text-left p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Contact</th>
                      <th className="text-left p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Joined</th>
                      <th className="text-left p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Role</th>
                      <th className="text-right p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                  {loading ? (
                      <tr><td colSpan={5} className="p-8 text-center text-gray-400 font-bold">Loading users...</td></tr>
                  ) : filtered.length === 0 ? (
                      <tr><td colSpan={5} className="p-8 text-center text-gray-400 font-bold">No users found.</td></tr>
                  ) : (
                      filtered.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                              <td className="p-4 flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex flex-shrink-0 items-center justify-center overflow-hidden">
                                      {user.image ? (
                                          <img src={user.image} alt={user.firstName} className="w-full h-full object-cover" />
                                      ) : (
                                          <UserIcon size={20} className="text-gray-400" />
                                      )}
                                  </div>
                                  <div>
                                      <div className="font-bold text-gray-800">
                                          {[user.firstName, user.lastName].filter(Boolean).join(" ") || "Unnamed User"}
                                      </div>
                                      <div className="text-xs text-gray-400">ID: {user.publicId?.substring(0,8)}...</div>
                                  </div>
                              </td>
                              <td className="p-4">
                                  <div className="text-sm font-medium text-gray-800">{user.email || "No Email"}</div>
                                  <div className="text-xs text-gray-400">{user.phone || "No Phone"}</div>
                              </td>
                              <td className="p-4 text-sm font-medium text-gray-600">
                                  {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                              <td className="p-4">
                                  <span className={`flex items-center gap-1 w-fit px-2 py-1 rounded text-xs font-bold ${
                                      user.role === 'ADMIN' ? "bg-purple-100 text-purple-700" : 
                                      user.role === 'RIDER' ? "bg-blue-100 text-blue-700" :
                                      "bg-gray-100 text-gray-700"
                                  }`}>
                                      {user.role === 'ADMIN' && <Shield size={12} />}
                                      {user.role}
                                  </span>
                              </td>
                              <td className="p-4 text-right">
                                  <select 
                                      className="text-xs font-bold bg-white border border-gray-200 rounded p-1 outline-none focus:border-brand-orange"
                                      value={user.role}
                                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                  >
                                      <option value="USER">Make User</option>
                                      <option value="ADMIN">Make Admin</option>
                                      <option value="RIDER">Make Rider</option>
                                  </select>
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
