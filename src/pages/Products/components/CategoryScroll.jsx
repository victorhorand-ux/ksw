// src/pages/Products/components/CategoryScroll.jsx
import React from 'react'
import { 
  PiSwimmingPoolBold, 
  PiEyeglassesBold, 
  PiTShirtBold,
  PiWaveformBold
} from "react-icons/pi";
import { FaSwimmer } from "react-icons/fa";
import { MdOutlineSportsScore } from "react-icons/md";

const categoryIconMap = {
  'Goggles': <PiEyeglassesBold />,
  'Swimwear': <PiTShirtBold />,
  'Equipment': <PiSwimmingPoolBold />,
  'Accessories': <MdOutlineSportsScore />,
  'Training': <PiWaveformBold />,
  'all': <FaSwimmer />
};

export default function CategoryScroll({ categories, selectedCategory, handleCategoryClick, language }) {
  return (
    <div 
      className="mb-8 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth snap-x snap-mandatory"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex gap-3 min-w-max items-center">
        {/* All Category */}
        <button
          onClick={() => handleCategoryClick('all')}
          className={`snap-center flex items-center gap-2.5 px-6 py-3 rounded-2xl border transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-[0_10px_20px_rgba(15,23,42,0.2)] scale-105'
              : 'bg-white text-slate-600 border-slate-200 hover:border-sky-400 hover:bg-sky-50'
          }`}
        >
          <span className="text-xl">{categoryIconMap['all']}</span>
          <span className="font-bold whitespace-nowrap">
            {language === 'en' ? 'All' : 'Byose'}
          </span>
        </button>
        
        {/* Dynamic Categories */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`snap-center flex items-center gap-2.5 px-6 py-3 rounded-2xl border transition-all duration-300 ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-[0_10px_20px_rgba(15,23,42,0.2)] scale-105'
                : 'bg-white text-slate-600 border-slate-200 hover:border-sky-400 hover:bg-sky-50'
            }`}
          >
            <span className="text-xl">
              {categoryIconMap[cat.name] || <PiSwimmingPoolBold />}
            </span>
            <span className="font-bold whitespace-nowrap">
              {language === 'en' ? cat.name : cat.nameRw}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}