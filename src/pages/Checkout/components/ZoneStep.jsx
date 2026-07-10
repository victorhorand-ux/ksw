// src/pages/Checkout/components/ZoneStep.jsx
import React from 'react'
import { DELIVERY_ZONES } from '../../../utils/delivery'
import { formatRWFSimple } from '../../../utils/currency'

export default function ZoneStep({ selectedZone, setSelectedZone, language }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8">
      <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md">2</span>
        {language === 'en' ? 'Select Zone' : 'Hitamo Akarere'}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(DELIVERY_ZONES).map(([key, zone]) => (
          <button 
            key={key} 
            type="button" 
            onClick={() => setSelectedZone(key)} 
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              selectedZone === key 
                ? 'border-sky-500 bg-sky-50/50 transform -translate-y-1' 
                : 'border-slate-50 hover:border-slate-200'
            }`}
          >
            <div className="font-black text-sm">{language === 'en' ? zone.name : zone.nameRw}</div>
            <div className="text-[10px] font-bold text-slate-400">{formatRWFSimple(zone.fee)}</div>
          </button>
        ))}
      </div>
    </div>
  )
}