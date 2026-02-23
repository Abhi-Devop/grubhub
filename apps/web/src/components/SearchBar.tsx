"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X, Loader2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

interface SearchResult {
  id: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
}

// Typewriter Effect Hook
function useTypewriter(words: string[], speed = 100, pause = 2000) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(timeout2);
  }, []);

  // Typing logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? pause : speed, parseInt(Math.random() * 350 + "")));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed, pause]);

  return `${words[index].substring(0, subIndex)}${blink ? "|" : " "}`;
}

const PLACEHOLDERS = [
  "Search for 'Butter Chicken'...",
  "Search for 'Milk'...",
  "Search for 'Farm Fresh Veggies'...",
  "Search for 'Coca Cola'...",
  "Search for 'Ice Cream'..."
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const placeholder = useTypewriter(PLACEHOLDERS, 80, 2000);

  useEffect(() => {
    async function fetchResults() {
      if (debouncedQuery.length < 2) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (debouncedQuery) fetchResults();
    else setResults([]);
  }, [debouncedQuery]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
      setIsOpen(false);
      setQuery("");
      router.push(`/product/${id}`);
  }

  return (
    <div ref={wrapperRef} className="relative group w-full max-w-2xl">
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#D35400] transition-colors" size={20} />
            <input 
            type="text" 
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    setIsOpen(false);
                    router.push(`/search?q=${encodeURIComponent(query)}`);
                }
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-[#D35400]/50 focus:ring-4 focus:ring-[#D35400]/10 rounded-2xl py-3.5 pl-12 pr-10 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900 shadow-sm"
            />
            {isLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-orange">
                    <Loader2 size={18} className="animate-spin" />
                </div>
            )}
            {!isLoading && query && (
                <button onClick={() => { setQuery(""); setResults([]); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                </button>
            )}
        </div>

        {/* Dropdown Results */}
        <AnimatePresence>
            {isOpen && query.length >= 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 divide-y divide-gray-50 max-h-[400px] overflow-y-auto"
                >
                    {results.length > 0 ? (
                        <>
                        <div className="p-2">
                             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 py-2">Suggested Products</h3>
                        </div>
                        {results.map((product) => (
                            <div 
                                key={product.id}
                                onClick={() => handleSelect(product.id)}
                                className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer transition-colors group"
                            >
                                <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                    <Image src={product.image || "/placeholder.png"} alt={product.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-800 text-sm truncate group-hover:text-brand-orange transition-colors">{product.name}</h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs font-bold text-gray-900">₹{(product.price / 100).toFixed(2)}</span>
                                        {product.mrp > product.price && (
                                            <span className="text-[10px] text-gray-400 line-through">₹{(product.mrp / 100).toFixed(2)}</span>
                                        )}
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-orange" />
                            </div>
                        ))}
                        <div className="p-2 bg-gray-50 text-center">
                            <button className="text-xs font-bold text-brand-orange hover:underline py-1">
                                See all results for "{query}"
                            </button>
                        </div>
                        </>
                    ) : (
                        !isLoading && (
                            <div className="p-8 text-center text-gray-500">
                                <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Search size={20} className="text-gray-400" />
                                </div>
                                <p className="text-sm font-medium">No results found for "{query}"</p>
                                <p className="text-xs text-gray-400 mt-1">Try searching for 'Milk' or 'Bread'</p>
                            </div>
                        )
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
