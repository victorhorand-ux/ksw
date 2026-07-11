import React from 'react';
import { formatRWF } from '../../../utils/currency';
// Adjust this import path if your LazyImage component is located elsewhere
import LazyImage from '../../../components/LazyImage'; 

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
        <LazyImage 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        {product.originalPrice > product.price && (
          <div className="absolute top-2 right-2 bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg">
            SALE
          </div>
        )}
      </div>
      
      <div className="p-3 md:p-5 flex flex-col flex-1">
        <h3 className="font-black text-slate-900 mb-1 text-sm md:text-base line-clamp-2 leading-tight flex-1 uppercase tracking-tight">
          {product.name}
        </h3>
        
        <div className="flex flex-col mb-4">
          <p className="text-sky-600 font-black text-sm md:text-lg">{formatRWF(product.price)}</p>
          {product.originalPrice > 0 && (
            <p className="text-[10px] text-slate-400 line-through font-bold tracking-tighter">
              {formatRWF(product.originalPrice)}
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