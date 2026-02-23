import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f291e] pt-20 pb-10 px-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-4xl text-stone-100 tracking-tight">GRUBHUB</h2>
              <span className="block text-sm font-sans tracking-[0.3em] text-[#d4af37] mt-1">RESERVE</span>
            </div>
            <p className="font-serif italic text-stone-400 text-lg">
              "Culinary Excellence, Delivered."
            </p>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h3 className="font-serif text-[#d4af37] text-lg mb-6">Discover</h3>
            <ul className="space-y-4 flex flex-col font-light text-stone-300 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="/private-dining" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Private Dining
                </Link>
              </li>
              <li>
                <Link href="/chefs" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Master Chefs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="font-serif text-[#d4af37] text-lg mb-6">Concierge</h3>
             <ul className="space-y-4 flex flex-col font-light text-stone-300 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-serif text-[#d4af37] text-lg mb-6">Join the Reserve</h3>
            <p className="text-stone-400 font-light text-sm mb-4">
              Unlock exclusive menus and chef experiences.
            </p>
            <form className="flex flex-col items-end">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-b border-stone-500 focus:border-[#d4af37] outline-none text-stone-100 py-2 w-full text-sm placeholder:text-stone-500 transition-colors"
                aria-label="Email Address"
              />
              <button 
                type="submit" 
                className="mt-4 text-xs uppercase tracking-widest text-[#d4af37] hover:text-white transition-colors duration-300 border-b border-transparent hover:border-white pb-1"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Legal & Socials */}
        <div className="border-t border-emerald-900/50 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 font-light">
          <p>© 2026 Grubhub Reserve. All rights reserved.</p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#d4af37] transition-colors duration-300" aria-label="Instagram">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a href="#" className="hover:text-[#d4af37] transition-colors duration-300" aria-label="Twitter">
              <Twitter size={20} strokeWidth={1.5} />
            </a>
             <a href="#" className="hover:text-[#d4af37] transition-colors duration-300" aria-label="Facebook">
              <Facebook size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
