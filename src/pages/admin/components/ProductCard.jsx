import React from 'react';
import { formatRWF } from '../../../utils/currency';
import LazyImage from '../../../components/LazyImage'; 

export default function ProductCard({ product, onEdit, onDelete }) {
  // Ensure numerical values for comparison
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  
  // A product is on sale only if originalPrice is strictly greater than selling price
  const isOnSale = originalPrice > price && price > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
      
      {/* 🚀 FIXED HEIGHT & DEEP CHILD TARGETING */}
      <div className="relative w-full h-48 md:h-56 bg-white p-4 flex items-center justify-center overflow-hidden">
        
        {/* 
          Notice the [&_img]: classes! 
          This forces any img tag buried inside LazyImage to strictly obey the rules.
        */}
        <div className="w-full h-full flex items-center justify-center [&_img]:!object-contain [&_img]:!max-w-full [&_img]:!max-h-full [&_img]:!h-auto [&_img]:!w-auto">
          <LazyImage 
            src={product.image} 
            alt={product.nameRw || product.name || 'Product'} 
            className="group-hover:scale-105 transition-transform duration-700 w-full h-full" 
          />
        </div>
        
        {/* 🏷️ SALE Badge */}
        {isOnSale && (
          <div className="absolute top-3 right-3 z-10 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-lg">
            SALE
          </div>
        )}
      </div>
      
      <div className="p-3 md:p-5 flex flex-col flex-1">
        
        {/* Displays Kinyarwanda name, falls back to English if missing */}
        <h3 className="font-black text-slate-900 mb-1 text-sm md:text-base line-clamp-2 leading-tight flex-1 uppercase tracking-tight">
          {product.nameRw || product.name || 'Unnamed Product'}
        </h3>
        
        <div className="flex flex-col mb-4">
          {/* Main Price */}
          <p className="text-sky-600 font-black text-sm md:text-lg">
            {formatRWF(price)}
          </p>
          
          {/* Strike-through Original Price (Only shown on sale) */}
          {isOnSale && (
            <p className="text-[10px] text-slate-400 line-through font-bold tracking-tighter">
              {formatRWF(originalPrice)}
            </p>
          )}
        </div>
        
        <div className="flex gap-2 mt-auto">
          <button 
            onClick={() => onEdit(product)} 
            className="flex-1 bg-slate-900 text-white font-black py-2.5 rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(product.id)} 
            className="px-4 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl transition-colors"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}