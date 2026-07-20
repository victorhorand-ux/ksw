// src/pages/Products/components/ProductCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { formatRWF } from '../../../utils/currency'
import LazyImage from '../../../components/LazyImage'

export default function ProductCard({ product, language, addItem }) {
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  const hasDiscount = originalPrice > price && originalPrice > 0;
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-sky-200 transition-all duration-300">
      <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
        <Link to={`/products/${product.slug}`} className="block w-full h-full">
          <LazyImage
            src={product.image}
            alt={language === 'en' ? product.name : product.nameRw}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            width={400}
            height={500}
            fallback={<div className="w-full h-full flex items-center justify-center text-4xl">🏊</div>}
          />
        </Link>
        {hasDiscount && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] md:text-xs font-black px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1 border border-red-400/30">
            <span>🔥</span>
            <span>-{discountPercentage}%</span>
          </div>
        )}
        <button 
          onClick={(e) => { e.preventDefault(); addItem(product); }}
          className="lg:hidden absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white w-9 h-9 md:w-10 md:h-10 rounded-full shadow-xl flex items-center justify-center active:scale-95 transition-transform z-20"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </button>
        <div className="hidden lg:block absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button 
            onClick={(e) => { e.preventDefault(); addItem(product); }}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3 rounded-xl shadow-xl hover:from-sky-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            {language === 'en' ? 'Add to Cart' : 'Ongeraho'}
          </button>
        </div>
      </div>
      <div className="p-3 md:p-4 flex flex-col flex-1 bg-white">
        <Link to={`/products/${product.slug}`} className="flex-1">
          <h3 className="font-bold text-slate-800 text-sm md:text-base leading-tight group-hover:text-sky-600 transition-colors line-clamp-2 mb-2">
            {language === 'en' ? product.name : product.nameRw}
          </h3>
        </Link>
        <div className="flex flex-col gap-0.5 mt-auto">
          <p className="font-black text-sky-600 text-sm md:text-lg">{formatRWF(price)}</p>
          <div className="min-h-[16px] md:min-h-[20px]">
            {hasDiscount && (
              <p className="text-[10px] md:text-xs text-slate-400 line-through font-medium">{formatRWF(originalPrice)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}