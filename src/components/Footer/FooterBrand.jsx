import React from 'react';
import { FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';

export default function FooterBrand({ language, t }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          KigaliSwimShop
        </h3>
      </div>
      <p className="text-slate-400 leading-relaxed text-sm">
        {language === 'en' 
          ? 'Your trusted swimming equipment store in Kigali, Rwanda. Professional gear for every swimmer.'
          : "Turizewe muby'amazi bw'turizewe muby'amazi mu Kigali, u Rwanda. Ibikoresho by'abanyamwuga."
        }
      </p>
      
      <div className="space-y-3 text-sm text-slate-400">
        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors shrink-0">
            <FaLocationDot size={14} />
          </div>
          <span className="font-medium group-hover:text-slate-200 transition-colors">{t.address}</span>
        </div>
        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors shrink-0">
            <FaPhone size={14} />
          </div>
          <span className="font-medium group-hover:text-slate-200 transition-colors">{t.phone}</span>
        </div>
        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors shrink-0">
            <FaEnvelope size={14} />
          </div>
          <span className="font-medium break-all group-hover:text-slate-200 transition-colors">{t.email}</span>
        </div>
      </div>
    </div>
  );
}