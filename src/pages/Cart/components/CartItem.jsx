// src/pages/Cart/components/CartItem.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { formatRWF } from '../../../utils/currency'
import LazyImage from '../../../components/LazyImage'

export default function CartItem({ item, language, updateQuantity, removeItem }) {
  return (
    <div className="p-4 sm:p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
      <div className="flex gap-4 sm:gap-6">
        
        {/* Image */}
        <Link to={`/products/${item.slug}`} className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 rounded-xl md:rounded-2xl flex-shrink-0 overflow-hidden border border-slate-200">
          <LazyImage
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            fallback={<div className="w-full h-full flex items-center justify-center text-2xl">🏊</div>}
          />
        </Link>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
               <Link to={`/products/${item.slug}`} className="font-bold text-slate-900 text-base md:text-lg hover:text-sky-600 transition line-clamp-2 mr-2 leading-tight">
                 {language === 'en' ? item.name : item.nameRw}
               </Link>
            </div>
            {item.brand && <p className="text-slate-400 font-medium text-xs mt-1 uppercase tracking-wider">{item.brand}</p>}
            
            {/* Variants Chips */}
            <div className="flex flex-wrap gap-2 text-[10px] md:text-xs font-bold text-slate-600 mt-2 md:mt-3">
              {item.selectedSize && (
                <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">
                  {language === 'en' ? 'Size' : 'Ingano'}: {item.selectedSize}
                </span>
              )}
              {item.selectedColor && (
                <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">
                  {language === 'en' ? 'Color' : 'Ibara'}: {item.selectedColor}
                </span>
              )}
            </div>
          </div>

          {/* --- MOBILE VIEW --- */}
          <div className="flex items-center justify-between mt-4 sm:hidden">
            <div className="flex items-center border border-slate-300 rounded-lg bg-white h-8 w-24 shadow-sm">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex-1 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">-</button>
              <span className="w-8 text-center font-bold text-slate-900 text-sm border-x border-slate-100 h-full flex items-center justify-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex-1 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">+</button>
            </div>
            <div className="flex items-center gap-3">
               <p className="font-black text-slate-900 text-sm whitespace-nowrap">
                 {formatRWF(item.price * item.quantity)}
               </p>
               <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 p-1.5 bg-slate-50 rounded-md transition-colors" aria-label="Remove item">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
               </button>
            </div>
          </div>

          {/* --- DESKTOP VIEW --- */}
          <div className="hidden sm:flex items-center justify-between mt-2">
            <div className="flex items-center border border-slate-300 rounded-lg bg-white h-9 w-28 shadow-sm">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex-1 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-l-lg transition-colors">-</button>
              <span className="w-10 text-center font-bold text-sm border-x border-slate-100 h-full flex items-center justify-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex-1 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-r-lg transition-colors">+</button>
            </div>
            <div className="flex items-center gap-4">
               <p className="font-black text-lg text-slate-900">{formatRWF(item.price * item.quantity)}</p>
               <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors p-2 bg-slate-50 hover:bg-red-50 rounded-lg">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}