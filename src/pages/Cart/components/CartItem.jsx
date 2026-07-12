import React from 'react'
import { Link } from 'react-router-dom'
import { formatRWF } from '../../../utils/currency'
import LazyImage from '../../../components/LazyImage'
import Button from '../../../components/ui/Button' // 🚀 Imported Button

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
            fallback={
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            }
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
            <div className="flex items-center gap-1">
              <Button variant="secondary" size="sm" className="!px-3" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</Button>
              <span className="w-8 text-center font-bold text-slate-900 text-sm">{item.quantity}</span>
              <Button variant="secondary" size="sm" className="!px-3" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
            </div>
            <div className="flex items-center gap-3">
               <p className="font-black text-slate-900 text-sm whitespace-nowrap">
                 {formatRWF(item.price * item.quantity)}
               </p>
               <Button 
                 variant="outline" 
                 size="sm" 
                 className="!px-2 border-transparent text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200" 
                 onClick={() => removeItem(item.id)} 
                 aria-label="Remove item"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
               </Button>
            </div>
          </div>

          {/* --- DESKTOP VIEW --- */}
          <div className="hidden sm:flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <Button variant="secondary" size="sm" className="!px-3" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</Button>
              <span className="w-10 text-center font-bold text-sm text-slate-900">{item.quantity}</span>
              <Button variant="secondary" size="sm" className="!px-3" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
            </div>
            <div className="flex items-center gap-4">
               <p className="font-black text-lg text-slate-900">{formatRWF(item.price * item.quantity)}</p>
               <Button 
                 variant="outline" 
                 size="sm" 
                 className="!px-2 border-transparent text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200" 
                 onClick={() => removeItem(item.id)}
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
               </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}