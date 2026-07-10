// src/pages/Checkout/components/ContactStep.jsx
import React from 'react'

export default function ContactStep({ register, user, language }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8">
      <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md">1</span>
        {language === 'en' ? 'Contact Information' : "Amakuru y'Umukiriya"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input 
          {...register('fullName', { required: true })} 
          defaultValue={user?.name || ''} 
          placeholder={language === 'en' ? "Full Name" : "Amazina"} 
          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all" 
        />
        <input 
          {...register('phone', { required: true })} 
          defaultValue={user?.phone || ''} 
          placeholder={language === 'en' ? "Phone Number" : "Nimero ya Telefone"} 
          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all" 
        />
        <input 
          {...register('email')} 
          type="email" 
          defaultValue={user?.email || ''} 
          placeholder={language === 'en' ? "Email (Optional)" : "Imeli (Si ngombwa)"} 
          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all" 
        />
        <input 
          {...register('address', { required: true })} 
          placeholder={language === 'en' ? "Delivery Address" : "Aho Kugeza Ibintu"} 
          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all" 
        />
      </div>
    </div>
  )
}