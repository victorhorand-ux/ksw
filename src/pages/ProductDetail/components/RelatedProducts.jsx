import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../../../components/LazyImage';
import { formatRWF } from '../../../utils/currency';

export default function RelatedProducts({ currentProductId, allProducts, language }) {
  const relatedProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
    
    // Get all products EXCEPT the one we are currently looking at
    const otherProducts = allProducts.filter(p => p.id !== currentProductId);
    
    // Shuffle them randomly to mix categories
    const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
    
    // Return exactly 4
    return shuffled.slice(0, 4);
  }, [allProducts, currentProductId]);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16 lg:mt-24 pt-12 border-t border-slate-100 px-4 lg:px-4">
      <h2 className="text-2xl font-black mb-8 text-slate-900">
        {language === 'en' ? 'You Might Also Like' : 'Ushobora Gukunda'}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {relatedProducts.map(p => {
          const relPrice = Number(p.price) || 0;
          const relOrig = Number(p.originalPrice) || 0;
          return (
            <Link key={p.id} to={`/products/${p.slug}`} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                <LazyImage src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {relOrig > relPrice && relOrig > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    SALE
                  </div>
                )}
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1 mb-1 group-hover:text-sky-600 transition">{language === 'en' ? p.name : p.nameRw}</h3>
                <p className="font-black text-sky-600 text-sm">{formatRWF(relPrice)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}