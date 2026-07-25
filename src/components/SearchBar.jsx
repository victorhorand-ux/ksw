import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductStore from '../stores/productStore';
import useLanguageStore from '../stores/languageStore'; // 🚀 Added Language Store
import { formatRWF } from '../utils/currency';
import LazyImage from './LazyImage';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  const searchProducts = useProductStore(state => state.searchProducts);
  const { language } = useLanguageStore(); // 🚀 Hooked into your language state
  const navigate = useNavigate();
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

  // Update suggestions as the user types
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

  // 🚀 Added: Handle hitting "Enter" to go to the full search page
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleSelectProduct = (product) => {
    setQuery('');
    setIsOpen(false);
    // Navigate to the product details page using the slug
    navigate(`/products/${product.slug}`); 
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto z-50">
      
      {/* 🚀 Wrapped in a form so hitting Enter works */}
      <form onSubmit={handleSearchSubmit} className="relative group">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => { if (query.trim().length > 1) setIsOpen(true); }}
          placeholder={language === 'en' ? "Search for gear..." : "Shakisha..."}
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 transition-all text-sm font-medium"
        />
        <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {/* Floating Suggestions Dropdown */}
      {isOpen && query.trim().length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden">
          {suggestions.length > 0 ? (
            <div className="flex flex-col">
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="flex items-center gap-3 p-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors text-left w-full"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <LazyImage 
                      src={product.image} 
                      alt={product.nameRw || product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    {/* 🚀 Translates the dropdown names based on current language */}
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
               {/* 🚀 Translates the "Not Found" message */}
               {language === 'en' ? `No products found for "${query}"` : `Nta bicuruzwa byabonetse bya "${query}"`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}