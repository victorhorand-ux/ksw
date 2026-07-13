import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAnalyticsStore from '../../../stores/analyticsStore';
import useCartStore from '../../../stores/cartStore';
import { formatRWF } from '../../../utils/currency';
import LazyImage from '../../../components/LazyImage';
import Button from '../../../components/ui/Button'; // 🚀 Imported your reusable button

export default function FeaturedProducts({ language, featuredProducts }) {
  const navigate = useNavigate();
  const trackProductClick = useAnalyticsStore((state) => state.trackProductClick);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddWithToast = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <section className="py-10 lg:py-16 bg-slate-50 relative">
      <div className="container mx-auto px-4">
        
        {/* 🚀 Refactored Responsive Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8 gap-4 w-full">
          <div className="text-left flex-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 leading-tight">
              {language === 'en' ? 'Trending Equipment' : 'Ibigezweho'}
            </h2>
          </div>
          
          {/* Desktop View All Button */}
          <div className="hidden sm:block shrink-0">
            <Button variant="outline" onClick={() => navigate('/products')}>
              {language === 'en' ? 'View All Products' : 'Reba Ibicuruzwa Byose'}
            </Button>
          </div>
        </div>

        {/* Mobile View All Button (Full width for better mobile UX) */}
        <div className="sm:hidden mb-8">
          <Button variant="outline" fullWidth onClick={() => navigate('/products')}>
            {language === 'en' ? 'View All Products' : 'Reba Ibicuruzwa Byose'}
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {featuredProducts.map((product) => {
            const price = Number(product.price) || 0;
            const originalPrice = Number(product.originalPrice) || 0;
            const hasDiscount = originalPrice > price && originalPrice > 0;
            const discountPercentage = hasDiscount 
              ? Math.round(((originalPrice - price) / originalPrice) * 100) 
              : 0;

            return (
              <div key={product.id} className="group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-sky-200 transition-all duration-300">
                <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                  
                  <div 
                    onClick={() => {
                      trackProductClick(product.id);
                      navigate(`/products/${product.slug}`);
                    }}
                    className="cursor-pointer w-full h-full"
                  >
                    <LazyImage
                      src={product.image}
                      alt={language === 'en' ? product.name : product.nameRw}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      fallback={<div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300"><span className="text-4xl md:text-6xl">🏊</span></div>}
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {hasDiscount && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] md:text-xs font-black px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1 border border-red-400/30 animate-pulse-slow">
                      <span className="text-[10px] md:text-sm leading-none">🔥</span>
                      <span>-{discountPercentage}%</span>
                    </div>
                  )}

                  {/* 🚀 Mobile Add to Cart Icon Button */}
                  <Button 
                    variant="primary"
                    size="icon"
                    onClick={(e) => handleAddWithToast(e, product)}
                    className="lg:hidden absolute bottom-2 right-2 md:bottom-3 md:right-3 !w-9 !h-9 md:!w-10 md:!h-10 rounded-full shadow-xl z-20 !p-0"
                    aria-label="Add to cart"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </Button>

                  {/* 🚀 Desktop Full Width Add to Cart Button */}
                  <div className="hidden lg:block absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <Button 
                      variant="primary"
                      fullWidth
                      onClick={(e) => handleAddWithToast(e, product)}
                      className="shadow-xl gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                      {language === 'en' ? 'Add to Cart' : 'Ongeraho'}
                    </Button>
                  </div>
                </div>

                <div className="p-3 md:p-4 flex flex-col flex-1 bg-white">
                  {product.brand && (
                     <p className="text-[10px] md:text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider line-clamp-1">
                       {product.brand}
                     </p>
                  )}
                  <h3 
                    onClick={() => navigate(`/products/${product.slug}`)}
                    className="font-bold text-slate-800 text-sm md:text-base leading-tight hover:text-sky-600 cursor-pointer transition-colors line-clamp-2 mb-2 flex-1"
                  >
                    {language === 'en' ? product.name : product.nameRw}
                  </h3>
                  
                  <div className="flex flex-col gap-0.5 mt-auto">
                    <p className="font-black text-sky-600 text-sm md:text-lg">
                      {formatRWF(price)}
                    </p>
                    <div className="min-h-[16px] md:min-h-[20px]">
                      {hasDiscount && (
                        <p className="text-[10px] md:text-xs text-slate-400 line-through font-medium">
                          {formatRWF(originalPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}