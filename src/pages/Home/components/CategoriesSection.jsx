import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

export default function CategoriesSection({ language, categories }) {
  const navigate = useNavigate();

  return (
    // 🚀 Reduced vertical padding to keep the section compact
    <section className="relative bg-slate-50 pt-16  md:pt-20">
      
      {/* === RESTORED SVG WAVE === */}
      <div className="absolute top-0 left-0 right-0 -mt-1 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-900"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Tighter margin on the title to save space */}
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-800">
          {language === 'en' ? 'Find Your Gear' : 'Hitamo Ibikoresho'}
        </h2>
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 w-full max-w-6xl mx-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              onClick={() => navigate(`/products?category=${category.id}`)}
              className="!rounded-xl flex-1 w-[calc(50%-6px)] sm:w-auto border-slate-200 hover:border-sky-500 hover:text-sky-600 hover:bg-sky-50 bg-white shadow-sm transition-all px-3 py-2.5 md:py-3 text-sm md:text-base font-bold text-slate-700 whitespace-nowrap"
            >
              {language === 'en' ? category.name : category.nameRw}
            </Button>
          ))}
        </div>
        
      </div>
    </section>
  );
}