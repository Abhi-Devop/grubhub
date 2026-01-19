import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-3xl font-black text-brand-yellow mb-4 tracking-tighter">GRUB & HUB</h2>
          <p className="text-sm leading-relaxed mb-6 text-gray-400">
            Elevating your dining experience with curated gourmet deliveries. Taste the extraordinary.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-yellow transition-colors"><Facebook size={20}/></a>
            <a href="#" className="hover:text-brand-yellow transition-colors"><Twitter size={20}/></a>
            <a href="#" className="hover:text-brand-yellow transition-colors"><Instagram size={20}/></a>
            <a href="#" className="hover:text-brand-yellow transition-colors"><Youtube size={20}/></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-bold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/" className="hover:text-brand-yellow transition-colors">Home</a></li>
            <li><a href="/services" className="hover:text-brand-yellow transition-colors">Restaurants</a></li>
            <li><a href="/cart" className="hover:text-brand-yellow transition-colors">Cart</a></li>
            <li><a href="/login" className="hover:text-brand-yellow transition-colors">Login / Signup</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-bold mb-6">Support</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Partner with us</a></li>
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-brand-yellow"/>
              <span>support@grubhub.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-brand-yellow"/>
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-brand-yellow"/>
              <span>123 Gourmet Ave, Food City</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} GRUB & HUB. All rights reserved. Crafted with 💛 by Antigravity.</p>
      </div>
    </footer>
  );
};

export default Footer;
