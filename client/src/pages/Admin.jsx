import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const response = await fetch(`${API_URL}/api/orders`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) return <div className="p-10 text-center text-white">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-brand-black text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-brand-yellow">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-gray-400 mb-2">Total Orders</h3>
                <p className="text-4xl font-bold">{orders.length}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-gray-400 mb-2">Total Revenue</h3>
                <p className="text-4xl font-bold text-brand-green-400">${orders.reduce((acc, order) => acc + order.totalPrice, 0).toFixed(2)}</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-gray-400 mb-2">Services Active</h3>
                <p className="text-4xl font-bold text-brand-purple">4</p>
            </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <table className="w-full text-left">
                <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                    <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Items</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-800/50 transition-colors">
                            <td className="p-4 font-mono text-sm text-gray-500">{order._id.substring(0, 8)}...</td>
                            <td className="p-4 font-medium">{order.user?.name || 'Guest'}</td>
                            <td className="p-4 text-sm text-gray-400">
                                {order.orderItems.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                            </td>
                            <td className="p-4 font-bold text-brand-yellow">${order.totalPrice.toFixed(2)}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                    order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' : 
                                    order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                                }`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="p-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
