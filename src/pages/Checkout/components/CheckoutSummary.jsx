// src/pages/Checkout/components/CheckoutSummary.jsx
import React from 'react'
import { formatRWF, formatRWFSimple } from '../../../utils/currency'
import LazyImage from '../../../components/LazyImage'

export default function CheckoutSummary({ language, items, subtotal, deliveryFee, finalTotal, selectedZone }) {
  return (
    <div className="lg:col-span-5">
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 lg:p-8 sticky top-28">
        <h2 className="text-xl font-black text-slate-900 mb-6 pb-4 border-b border-slate-100 flex justify-between items-center">
          {language === 'en' ? 'Order Summary' : 'Incamake'}
          <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full uppercase tracking-wider">{items.length} Items</span>
        </h2>

        <div className="space-y-5 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
          {items.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 group-hover:border-sky-200 transition-colors">
                <LazyImage src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-800 line-clamp-1 group-hover:text-sky-600 transition-colors uppercase tracking-tight">{language === 'en' ? item.name : item.nameRw}</p>
                <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-tighter">Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`}</p>
              </div>
              <div className="text-sm font-black text-slate-900 whitespace-nowrap">
                {formatRWFSimple(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 py-6 border-t border-slate-100">
          <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <span>Subtotal</span>
            <span className="text-slate-900 text-sm">{formatRWF(subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <span>Delivery ({selectedZone})</span>
            <span className="text-slate-900 text-sm">{formatRWF(deliveryFee)}</span>
          </div>
        </div>

        <div className="pt-6 border-t border-dashed border-slate-200 bg-slate-50 -mx-6 lg:-mx-8 px-6 lg:px-8 pb-4 rounded-b-[2rem]">
          <div className="flex justify-between items-end">
            <span className="font-black text-slate-900 uppercase tracking-[0.2em] text-[10px] mb-2">Total Amount</span>
            <span className="text-4xl font-black text-sky-600 tracking-tighter">{formatRWF(finalTotal)}</span>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100">
              <span className="text-sky-500 text-sm">🔒</span> SSL Secured
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}