import React, { useEffect, useState } from 'react';
import { Star, Clock, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/api/services`);
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div className="min-h-screen bg-brand-black flex items-center justify-center text-brand-yellow text-2xl animate-pulse">Loading Deliciousness...</div>;

  return (
    <div className="min-h-screen bg-brand-black text-brand-white p-6 pt-24"> {/* Added padding top for fixed nav */}
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-yellow mb-4 tracking-tight">Best Restaurants Near You</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">Discover top-rated food spots curated just for you.</p>
          
          <div className="relative max-w-md mx-auto">
            <input 
                type="text" 
                placeholder="Search restaurants or cuisines..." 
                className="w-full bg-gray-900 border border-gray-800 rounded-full px-6 py-3 pl-12 text-white focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
                key={service._id} 
                onClick={() => navigate(`/menu/${service._id}`)}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-brand-purple/50 hover:shadow-2xl hover:shadow-brand-purple/10 transition-all duration-300 group cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star size={14} className="fill-brand-yellow text-brand-yellow" />
                  {service.rating}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-yellow transition-colors">{service.name}</h3>
                  <span className="bg-brand-purple/20 text-brand-purple px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">{service.deliveryFee}</span>
                </div>
                
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-brand-yellow" />
                    {service.time}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-brand-yellow" />
                    2.5 km
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300 hover:bg-gray-700 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
