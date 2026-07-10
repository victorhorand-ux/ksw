// src/pages/NotFound.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import useLanguageStore from '../stores/languageStore'

export default function NotFound() {
  const language = useLanguageStore((state) => state.language)

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="text-8xl mb-6 opacity-50">🧭</div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-4">
        {language === 'en' ? "Looks like you're lost at sea!" : "Wabaye nk'uzimiye mu mazi!"}
      </h2>
      <p className="text-slate-500 font-medium mb-8 max-w-md">
        {language === 'en' 
          ? "We can't seem to find the page you're looking for. Let's get you back to safe waters." 
          : "Ntitwabashije kubona paji washakaga. Reka tugusubize ahabanza."}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/products"
          className="bg-sky-600 hover:bg-sky-700 text-white font-black px-8 py-4 rounded-xl transition-all shadow-lg shadow-sky-200 active:scale-95"
        >
          {language === 'en' ? 'Continue Shopping' : 'Komeza Ugure'}
        </Link>
        <Link 
          to="/"
          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-black px-8 py-4 rounded-xl transition-all active:scale-95"
        >
          {language === 'en' ? 'Go Home' : 'Subira Ahabanza'}
        </Link>
      </div>
    </div>
  )
}