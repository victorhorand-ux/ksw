import React from 'react';
import { formatRWF } from '../../../utils/currency';

export default function MobileBuyBar({ product, language, quantity, onAddToCart }) {
  const price = Number(product.price) || 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 lg:hidden z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-safe">
      <div className="flex items-center gap-4 max-w-lg mx-auto">
        <div className="flex-1 pl-2 text-left">
          <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Total</p>
          <p className="text-lg sm:text-xl font-black text-slate-900 leading-none">{formatRWF(price * quantity)}</p>
        </div>
        <button
          onClick={onAddToCart}
          disabled={!product.inStock}
          className="flex-[1.5] bg-gradient-to-r from-sky-500 to-blue-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {language === 'en' ? 'Add to Cart' : 'Ongeraho'}
        </button>
      </div>
    </div>
  );
}