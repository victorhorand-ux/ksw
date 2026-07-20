import React, { useState } from 'react';
import { formatRWF } from '../../../utils/currency';
import Button from '../../../components/ui/Button'; // 🚀 Imported the new reusable Button

export default function ProductActionPanel({
  product,
  language,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  onAddToCart,
  onBuyNow,
  onOpenSizeChart
}) {
  const [openSection, setOpenSection] = useState('description');

  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  const hasDiscount = originalPrice > price && originalPrice > 0;
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // SEO Boosting Default Descriptions
  const defaultDescriptionEn = `Upgrade your swimming experience with our premium ${product.name}. Sourced for durability, comfort, and top-tier performance, this is essential gear for both professional athletes and leisure swimmers in Rwanda. Order today from KigaliSwimShop and enjoy 2-hour fast delivery anywhere in Kigali, complete with secure Mobile Money (MoMo) payments. Dive in with the best!`;
  const defaultDescriptionRw = `Gura ${product.nameRw || product.name} nziza cyane muri KigaliSwimShop. Ibikoresho byizewe byo koga mu Rwanda, bikozwe kubw'ihumure n'igihe kirekire. Kwishyura na MoMo, na delivery yihuse mu masaha 2 i Kigali.`;

  const displayDescriptionEn = product.description && product.description.trim() !== '' ? product.description : defaultDescriptionEn;
  const displayDescriptionRw = product.descriptionRw && product.descriptionRw.trim() !== '' ? product.descriptionRw : defaultDescriptionRw;

  return (
    <div className="px-4 pt-6 pb-0 lg:pt-0 lg:px-0">
      <div className="sticky top-28 space-y-6 lg:space-y-8">
        
        {/* Header */}
        <div>
          <p className="text-sky-600 font-bold tracking-widest text-xs uppercase mb-2">
            {product.brand || 'KigaliSwimShop'}
          </p>
          <h1 className="text-2xl lg:text-4xl xl:text-5xl font-black text-slate-900 leading-tight mb-4">
            {language === 'en' ? product.name : product.nameRw}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="text-3xl lg:text-4xl font-black text-slate-900">{formatRWF(price)}</span>
              {hasDiscount && (
                <span className="text-lg text-slate-400 line-through decoration-slate-400/50 font-medium">
                  {formatRWF(originalPrice)}
                </span>
              )}
            </div>
            
            {hasDiscount && (
              <div className="hidden sm:flex bg-gradient-to-r from-red-50 text-red-600 border border-red-100 text-xs font-black px-2 py-1 rounded-md items-center gap-1">
                -{discountPercentage}% OFF
              </div>
            )}
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Selectors */}
        <div className="space-y-6">
          
          {/* Colors */}
          {product.colors?.length > 0 && (
            <div>
              <span className="text-sm font-bold text-slate-900 block mb-3">{language === 'en' ? 'Select Color' : 'Hitamo Ibara'}</span>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2.5 rounded-xl border font-bold text-sm transition-all shadow-sm ${
                       selectedColor === color 
                       ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-100' 
                       : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 bg-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-slate-900">{language === 'en' ? 'Select Size' : 'Hitamo Ingano'}</span>
                <button onClick={onOpenSizeChart} className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1">
                  <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  {language === 'en' ? 'Size Guide' : 'Inyigisho'}
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl border font-bold text-sm flex items-center justify-center transition-all shadow-sm ${
                       selectedSize === size 
                       ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-100' 
                       : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <span className="text-sm font-bold text-slate-900 block mb-3">{language === 'en' ? 'Quantity' : 'Ingano'}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-300 rounded-xl bg-white h-12 w-32 shadow-sm">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-l-xl text-xl transition-colors">-</button>
                <span className="w-10 text-center font-bold text-slate-900 border-x border-slate-100 h-full flex items-center justify-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))} className="flex-1 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-r-xl text-xl transition-colors">+</button>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-md border border-green-200">
                {product.stock} {language === 'en' ? 'in stock' : 'ibirimo'}
              </span>
            </div>
          </div>
        </div>

        {/* 🚀 Refactored: Desktop Actions Using Reusable Buttons */}
        <div className="hidden lg:block pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            
            {/* Secondary: Add to Cart */}
            <Button
              variant="secondary"
              size="lg"
              onClick={onAddToCart}
              disabled={!product.inStock}
              className="flex-1 gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {language === 'en' ? 'Add to Cart' : 'Ongera mu gikapu'}
            </Button>

            {/* Primary: Buy Now */}
            <Button
              variant="primary"
              size="lg"
              onClick={onBuyNow}
              disabled={!product.inStock}
              className="flex-[1.5]"
            >
              {product.inStock 
                ? (language === 'en' ? 'Buy It Now' : 'Gura Nonaha')
                : (language === 'en' ? 'Out of Stock' : 'Ntibyabonetse')
              }
            </Button>
            
          </div>

          <div className="flex justify-center gap-6 mt-6 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              2h Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Official Warranty
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Secure Pay
            </span>
          </div>
        </div>

        {/* Accordions */}
        <div className="border-t border-slate-100 pt-8 space-y-3">
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:border-slate-300 transition-colors">
            <button 
              onClick={() => setOpenSection(openSection === 'description' ? '' : 'description')}
              className="w-full flex justify-between items-center p-4 lg:p-5"
            >
              <span className="font-bold text-slate-900">{language === 'en' ? 'Description' : 'Ibisobanuro'}</span>
              <svg className={`w-5 h-5 transform transition-transform text-slate-400 ${openSection === 'description' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {openSection === 'description' && (
              <div className="p-4 lg:p-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 bg-slate-50/50 animate-fade-in whitespace-pre-line">
                {language === 'en' ? displayDescriptionEn : displayDescriptionRw}
              </div>
            )}
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:border-slate-300 transition-colors">
            <button 
              onClick={() => setOpenSection(openSection === 'shipping' ? '' : 'shipping')}
              className="w-full flex justify-between items-center p-4 lg:p-5"
            >
              <span className="font-bold text-slate-900">{language === 'en' ? 'Shipping & Returns' : 'Kubikugezaho no Gusubiza'}</span>
              <svg className={`w-5 h-5 transform transition-transform text-slate-400 ${openSection === 'shipping' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {openSection === 'shipping' && (
              <div className="p-4 lg:p-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 bg-slate-50/50 animate-fade-in">
                <p className="mb-2"><strong>Kigali:</strong> Delivery within 2 hours (2,000 RWF).</p>
                <p><strong>Upcountry:</strong> Delivery within 10 hours.</p>
                <p className="mt-3 p-3 bg-blue-50 text-blue-800 rounded-lg text-xs font-medium border border-blue-100">
                  Free returns within 7 days if product is unused and in original packaging.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}