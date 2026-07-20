// src/layouts/RootLayout/Header/components/DesktopCategoriesDropdown.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLanguageStore from '../../../../stores/languageStore'
import useCategoryStore from '../../../../stores/categoryStore'

export default function DesktopCategoriesDropdown({ textClass }) {
  const { language } = useLanguageStore()
  const categories = useCategoryStore((state) => state.categories) || []
  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <div className="relative group" onMouseLeave={() => setActiveCategory(null)}>
      <button className={`font-bold text-sm uppercase tracking-wide py-2 flex items-center gap-1 ${textClass}`}>
        {language === 'en' ? 'Categories' : 'Ibyiciro'} 
        <span className="text-xs">▼</span>
      </button>
      
      {/* 🚀 MEGA MENU CONTAINER (Wider and split-pane) */}
      <div className="absolute top-full left-0 w-[550px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex min-h-[300px]">
          
          {/* LEFT PANE: Category List */}
          <div className="w-1/2 bg-slate-50/50 p-4 border-r border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
              {language === 'en' ? 'Departments' : 'Amashami'}
            </h3>
            <div className="space-y-1">
              {categories.slice(0, 6).map((cat) => (
                <div 
                  key={cat.id} 
                  onMouseEnter={() => setActiveCategory(cat)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    activeCategory?.id === cat.id 
                      ? 'bg-white shadow-sm text-sky-600 font-bold border border-slate-100' 
                      : 'hover:bg-slate-100 text-slate-600 font-medium border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-sm">{language === 'en' ? cat.name : cat.nameRw}</span>
                  </div>
                  <span className={`text-[10px] transition-transform ${activeCategory?.id === cat.id ? 'translate-x-1 text-sky-500' : 'text-slate-300'}`}>
                    ▶
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 px-2">
              <Link to="/products" className="inline-block text-xs font-bold text-slate-500 hover:text-sky-600 hover:underline">
                {language === 'en' ? 'Browse All Products →' : 'Reba Ibikoresho Byose →'}
              </Link>
            </div>
          </div>

          {/* RIGHT PANE: Category Details View */}
          <div className="w-1/2 p-6 bg-white flex flex-col">
            {activeCategory ? (
              <div className="animate-fade-in">
                <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-2xl mb-4 text-sky-500">
                  {activeCategory.icon}
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-2">
                  {language === 'en' ? activeCategory.name : activeCategory.nameRw}
                </h4>
                <p className="text-sm text-slate-500 mb-6 line-clamp-4 leading-relaxed">
                  {activeCategory.description || (language === 'en' 
                    ? `Explore our premium selection of ${activeCategory.name.toLowerCase()} designed for durability and performance.` 
                    : `Reba ibikoresho byiza bya ${activeCategory.nameRw.toLowerCase()} bikomeye.`)}
                </p>
                <Link 
                  to={`/products?category=${activeCategory.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-slate-900 hover:bg-sky-600 px-5 py-2.5 rounded-full transition-colors mt-auto"
                >
                  {language === 'en' ? 'Shop Category' : 'Gura Aha'}
                </Link>
              </div>
            ) : (
              /* Empty State before hovering */
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-50">
                <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                <p className="text-sm text-slate-500 font-medium px-4">
                  {language === 'en' ? 'Hover over a department to view details' : 'Kanda ku cyiciro urebe ibindi'}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}