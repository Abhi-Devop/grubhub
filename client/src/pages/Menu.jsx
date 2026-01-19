import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { API_URL } from '../config';

const Menu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`${API_URL}/api/services/${id}`);
        const data = await response.json();
        setRestaurant(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-brand-black flex items-center justify-center text-brand-yellow text-xl">Loading Menu...</div>;
  if (!restaurant) return <div className="min-h-screen bg-brand-black text-white p-10 text-center">Restaurant not found</div>;

  return (
    <div className="min-h-screen bg-brand-black text-white pt-20">
        {/* Banner */}
        {/* Banner */}
        <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover scale-105 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
            
            {/* Back Button */}
            <a href="/services" className="absolute top-6 left-6 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/10 group">
                 <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={24} />
            </a>

            <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full max-w-7xl mx-auto z-10">
                <h1 className="text-4xl md:text-7xl font-black text-white mb-3 tracking-tighter drop-shadow-2xl">{restaurant.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-lg font-medium backdrop-blur-md bg-white/10 p-4 rounded-2xl inline-flex border border-white/10 shadow-xl">
                    <span className="flex items-center gap-1 text-brand-yellow font-bold"><Star className="fill-brand-yellow" size={20} /> {restaurant.rating}</span>
                    <span className="text-white/80">|</span>
                    <span className="text-white/90">{restaurant.time}</span>
                    <span className="text-white/80">|</span>
                    <span className="text-white/90">{restaurant.deliveryFee} Delivery</span>
                </div>
            </div>
        </div>

        {/* Menu Section */}
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 border-b border-gray-800 pb-4">Menu</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurant.menu.map((item) => (
                    <div key={item._id} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex justify-between items-center hover:border-brand-purple/30 transition-all">
                        <div className="flex-1 pr-4">
                            <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                            <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                            <span className="text-brand-yellow font-bold text-lg">${item.price}</span>
                        </div>
                        <button onClick={() => addToCart(item)} className="bg-white text-black p-3 rounded-full hover:bg-brand-purple hover:text-white transition-colors shadow-lg active:scale-95 transform duration-100">
                            <ShoppingBag size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Menu;
