import React, { useState } from 'react';
import LazyImage from '../../../components/LazyImage';

export default function ProductGallery({ product }) {
  const [activeImage, setActiveImage] = useState(0);
  const allImages = product ? [product.image, ...(product.images || [])].filter(Boolean) : [];

  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  const hasDiscount = originalPrice > price && originalPrice > 0;
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Mobile Gallery */}
      <div className="lg:hidden relative w-full bg-slate-50 aspect-square overflow-hidden group">
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full h-full" 
          onScroll={(e) => setActiveImage(Math.round(e.currentTarget.scrollLeft / e.currentTarget.offsetWidth))}
        >
          {allImages.map((img, idx) => (
            <div key={idx} className="w-full flex-shrink-0 snap-center h-full">
              <LazyImage src={img} alt={product.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <span>🔥</span><span>-{discountPercentage}%</span>
          </div>
        )}
      </div>

      {/* Desktop Gallery */}
      <div className="hidden lg:grid grid-cols-1 gap-4">
        <div className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 relative shadow-sm">
          <LazyImage 
            src={allImages[activeImage]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
          />
        </div>
        
        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
            {allImages.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-sky-500 ring-2 ring-sky-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
              >
                <LazyImage src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}