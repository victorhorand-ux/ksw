// src/pages/SignIn/components/AuthHero.jsx
import React from 'react'
import LazyImage from '../../../components/LazyImage'

export default function AuthHero({ language }) {
  return (
    <div className="hidden md:block w-1/2 bg-slate-900 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 to-slate-900/90 z-10" />
      <LazyImage 
        src="https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=2070&auto=format&fit=crop" 
        alt="Swimmer" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="relative z-20 h-full flex flex-col justify-end p-12 text-white">
        <h2 className="text-4xl font-black mb-4 tracking-tight">
          {language === 'en' ? 'Welcome Back' : 'Murakaza Neza'}
        </h2>
        <p className="text-lg text-slate-300 font-medium">
          {language === 'en' 
            ? 'Access your orders and wishlist.' 
            : 'Reba ibyo watumije n\'ibyo wakunze.'}
        </p>
      </div>
    </div>
  )
}