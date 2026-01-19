import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { API_URL } from '../config';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
        navigate('/login');
        return;
    }

    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const response = await fetch(`${API_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
            body: JSON.stringify({
                orderItems: cart,
                totalPrice: cartTotal + 2.99 + (cartTotal * 0.1),
                paymentMethod: 'Stripe' // Mock
            })
        });

        if (response.ok) {
            clearCart();
            alert('Order Placed Successfully!');
            navigate('/services'); // Or order tracking page
        } else {
            alert('Failed to place order');
        }
    } catch (error) {
        console.error('Checkout error:', error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-black text-white flex flex-col items-center justify-center p-6 pt-24">
        <h2 className="text-3xl font-bold mb-4 text-brand-yellow">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added any delicious food yet.</p>
        <a href="/services" className="px-8 py-3 bg-brand-purple rounded-full font-bold hover:bg-purple-600 transition-colors">
          Browse Restaurants
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-white pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 border-b border-gray-800 pb-4">Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                    <div key={item._id} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex items-center justify-between group hover:border-brand-purple/30 transition-all">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                            <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                            <span className="text-brand-yellow font-bold">${item.price}</span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3 bg-black rounded-full px-3 py-1">
                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 hover:text-brand-yellow transition-colors"><Minus size={16} /></button>
                                <span className="font-bold w-4 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 hover:text-brand-yellow transition-colors"><Plus size={16} /></button>
                            </div>
                            <button onClick={() => removeFromCart(item._id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-24">
                    <h3 className="text-2xl font-bold mb-6 text-white">Summary</h3>
                    
                    <div className="space-y-3 mb-6 border-b border-gray-800 pb-6">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Delivery Fee</span>
                            <span>$2.99</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Taxes</span>
                            <span>${(cartTotal * 0.1).toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between text-xl font-bold text-brand-yellow mb-8">
                        <span>Total</span>
                        <span>${(cartTotal + 2.99 + (cartTotal * 0.1)).toFixed(2)}</span>
                    </div>
                    
                    <button onClick={handleCheckout} className="w-full bg-brand-yellow text-brand-black font-bold py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 group">
                        Proceed to Checkout
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
