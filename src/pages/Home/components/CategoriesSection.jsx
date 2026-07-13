import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../../../components/LazyImage';

export default function CategoriesSection({ language, categories }) {
  return (
    <section className="relative py-8 lg:py-12 bg-slate-50">
      <div className="absolute top-0 left-0 right-0 -mt-1 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-900"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 lg:mb-8 text-gray-800">
          {language === 'en' ? 'Find Your Gear' : 'Hitamo Ibikoresho'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative bg-white rounded-2xl md:rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300 hover:-translate-y-1 border border-slate-100 overflow-hidden flex flex-col items-center justify-center text-center h-28 md:h-40"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 mb-2 md:mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {category.image ? (
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full p-0.5 bg-gradient-to-br from-sky-300 to-primary-500">
                    <LazyImage src={category.image} alt={category.name} className="w-full h-full rounded-full object-cover border-2 border-white" />
                  </div>
                ) : (
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-2xl md:text-3xl shadow-inner">{category.icon}</div>
                )}
              </div>
              <h3 className="relative z-10 font-bold text-slate-700 text-xs md:text-sm group-hover:text-primary-600 transition-colors">
                {language === 'en' ? category.name : category.nameRw}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}