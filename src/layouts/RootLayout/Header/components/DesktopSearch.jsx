// src/layouts/RootLayout/Header/components/DesktopSearch.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useLanguageStore from '../../../../stores/languageStore';
import useProductStore from '../../../../stores/productStore'; // Adjust path if needed
import { formatRWF } from '../../../../utils/currency'; // Adjust path if needed
import LazyImage from '../../../../components/LazyImage'; // Adjust path if needed

export default function DesktopSearch({ isScrolled, isHome }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const searchProducts = useProductStore(state => state.searchProducts);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle typing for auto-suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length > 1) {
      const results = searchProducts(value).slice(0, 5); // Limit to top 5 results
      setSuggestions(results);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  // Handle hitting "Enter" (Full search page)
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  // Handle clicking a specific suggestion (Direct to product)
  const handleSelectProduct = (product) => {
    setQuery('');
    setIsOpen(false);
    navigate(`/products/${product.slug}`); 
  };

  return (
    <div ref={wrapperRef} className="hidden md:flex flex-1 max-w-md mx-4 relative">
      <form onSubmit={handleSearch} className="w-full relative group">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => { if (query.trim().length > 1) setIsOpen(true); }}
          placeholder={language === 'en' ? "Search for gear..." : "Shakisha..."}
          className={`w-full pl-10 pr-4 py-2.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all ${
            isScrolled || !isHome 
              ? 'bg-slate-100 border-transparent focus:bg-white' 
              : 'bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400'
          }`}
        />
        <button type="submit" className={`absolute left-3 top-1/2 -translate-y-1/2 ${
          isScrolled || !isHome ? 'text-slate-400' : 'text-white/70 group-focus-within:text-slate-400'
        }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {/* 🚀 Floating Suggestions Dropdown */}
      {isOpen && query.trim().length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-[100]">
          {suggestions.length > 0 ? (
            <div className="flex flex-col">
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="flex items-center gap-3 p-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors text-left w-full"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <LazyImage 
                      src={product.image} 
                      alt={product.nameRw || product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-sm font-black text-slate-900 truncate uppercase">
                      {language === 'en' ? (product.name || product.nameRw) : (product.nameRw || product.name)}
                    </h4>
                    <p className="text-xs text-sky-600 font-bold">
                      {formatRWF(product.price)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-slate-400 text-sm font-medium">
              {language === 'en' ? `No products found for "${query}"` : `Nta bicuruzwa byabonetse bya "${query}"`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}