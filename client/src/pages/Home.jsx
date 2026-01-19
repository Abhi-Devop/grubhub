import React from 'react';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-brand-black text-white overflow-hidden">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute w-full h-full object-cover z-0 opacity-50"
          poster="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070"
        >
          <source src="https://v.pinimg.com/videos/iht/720p/2e/03/49/2e0349w84b7a1e0b503020613290b05.mp4" type="video/mp4" />
           Your browser does not support the video tag.
        </video>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-[-50px]">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter animate-fade-in-up">
            <span className="text-brand-white">CRAVING</span> 
            <span className="text-brand-yellow block mt-2 drop-shadow-lg">PERFECTION?</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the finest culinary delights delivered to your doorstep. 
            From gourmet burgers to artisan sushi, we curate the best.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="/services" className="group bg-brand-yellow text-brand-black px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-brand-yellow/20 flex items-center gap-2">
              Order Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/menu" className="px-10 py-4 rounded-full font-bold text-lg border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all text-white">
              View Menu
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="text-brand-yellow w-10 h-10" />
        </div>
      </div>

      {/* Featured Categories (Smoor-inspired aesthetic) */}
      <section className="py-20 px-6 bg-brand-black">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-brand-yellow mb-4 tracking-tight">CURATED COLLECTIONS</h2>
                <div className="w-24 h-1 bg-brand-purple mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Gourmet Burgers", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
                    { title: "Artisan Pizzas", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80" },
                    { title: "Exotic Desserts", img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80" },
                ].map((item, idx) => (
                    <div key={idx} className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                            <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                            <span className="text-brand-yellow font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">Explore Collection &rarr;</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
