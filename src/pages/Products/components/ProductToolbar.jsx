// src/pages/Products/components/ProductToolbar.jsx
import React from 'react'
import { FaFilter } from "react-icons/fa"
import { MdSort } from "react-icons/md"
import { formatRWF } from '../../../utils/currency'

export default function ProductToolbar({ 
  urlSearchQuery, filteredCount, language, filterRef, 
  showPriceFilter, setShowPriceFilter, priceRange, setPriceRange, 
  sortBy, setSortBy 
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        {urlSearchQuery ? (
          <h1 className="text-lg md:text-xl font-bold text-slate-900">
            {language === 'en' ? 'Results for' : 'Ibisubizo'}: <span className="text-sky-600">"{urlSearchQuery}"</span>
          </h1>
        ) : (
          <p className="text-slate-500 font-medium">
            {language === 'en' ? 'Showing' : 'Ibicuruzwa'} <span className="text-slate-900 font-bold">{filteredCount}</span> {language === 'en' ? 'items' : ''}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Price Filter */}
        <div className="relative" ref={filterRef}>
          <button 
            onClick={() => setShowPriceFilter(!showPriceFilter)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-sm transition-all ${
              priceRange[1] < 1000000 
                ? 'bg-sky-50 text-sky-700 border-sky-200' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <FaFilter className="text-[10px]" />
            <span>{language === 'en' ? 'Price' : 'Igiciro'}</span>
          </button>

          {showPriceFilter && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-30 animate-fade-in-up">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-slate-900 text-sm">{language === 'en' ? 'Max Price' : 'Igiciro Ntarengwa'}</span>
                <span className="text-sky-600 font-black">{formatRWF(priceRange[1])}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative group">
          <MdSort className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer hover:bg-slate-50 transition-all"
          >
            <option value="newest">{language === 'en' ? 'Newest' : 'Bishya'}</option>
            <option value="price-low">{language === 'en' ? 'Price: Low' : 'Gito'}</option>
            <option value="price-high">{language === 'en' ? 'Price: High' : 'Heje'}</option>
          </select>
        </div>
      </div>
    </div>
  )
}