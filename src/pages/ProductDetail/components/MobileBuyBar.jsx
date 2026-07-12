import React from 'react';
import { formatRWF } from '../../../utils/currency';
import Button from '../../../components/ui/Button'; // 🚀 Imported the reusable Button

export default function MobileBuyBar({ product, language, quantity, onAddToCart, onBuyNow }) {
  const price = Number(product.price) || 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 lg:hidden z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-safe">
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        
        {/* Total Price Display (Hides on very small screens to save space) */}
        <div className="hidden sm:block flex-shrink-0 pl-2 pr-4">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Total</p>
          <p className="text-lg font-black text-slate-900 leading-none">{formatRWF(price * quantity)}</p>
        </div>

        {/* Secondary: Add to Cart Icon Button */}
        <Button
          variant="secondary"
          size="icon"
          onClick={onAddToCart}
          disabled={!product.inStock}
          aria-label="Add to cart"
          className="flex-shrink-0"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </Button>

        {/* Primary: Buy Now Button */}
        <Button
          variant="primary"
          className="flex-1 h-14 text-sm sm:text-base"
          onClick={onBuyNow}
          disabled={!product.inStock}
        >
          {language === 'en' ? 'Buy It Now' : 'Gura Nonaha'}
        </Button>

      </div>
    </div>
  );
}