// src/pages/Checkout/components/OrderSuccess.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { CALL_PHONE } from '../../../utils/constants'
import { sendOrderToWhatsApp } from '../../../utils/whatsapp'

export default function OrderSuccess({ language, lastOrder }) {
  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center px-4 text-slate-900">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-8 text-center border border-slate-100">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner animate-bounce-short">
          ✓
        </div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">
          {language === 'en' ? 'Order Received!' : 'Itegeko Ryakiriwe!'}
        </h2>
        <p className="text-slate-500 mb-8 leading-relaxed font-medium">
          {language === 'en'
            ? "We've saved your order. You can speed up delivery by calling us or using WhatsApp below."
            : "Twageze ku itegeko ryawe. Hamagara cyangwa utwandikire kuri WhatsApp hano munsi dusoze vuba."
          }
        </p>

        <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-dashed border-slate-200">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Receipt Reference</p>
          <p className="text-lg font-mono font-bold text-slate-700">#KS-{Math.floor(1000 + Math.random() * 9000)}</p>
        </div>

        <div className="space-y-3">
          <a
            href={`tel:${CALL_PHONE}`}
            className="block w-full bg-sky-600 hover:bg-sky-700 text-white font-black py-4 rounded-xl transition shadow-lg shadow-sky-100 flex items-center justify-center gap-2 active:scale-95"
          >
            <span className="text-xl">📞</span> 
            {language === 'en' ? 'Call to Confirm' : 'Hamagara ubu'}
          </a>

          <button
            onClick={() => sendOrderToWhatsApp(lastOrder)}
            className="block w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-4 rounded-xl transition shadow-lg shadow-green-100 flex items-center justify-center gap-2 active:scale-95"
          >
            <span className="text-xl">💬</span> 
            {language === 'en' ? 'Chat on WhatsApp' : 'Tuvugishe kuri WhatsApp'}
          </button>

          <div className="pt-4 flex flex-col gap-2">
            <Link to="/profile" className="text-slate-900 font-black text-sm underline decoration-slate-200 underline-offset-4 hover:decoration-sky-500 transition-all">
              {language === 'en' ? 'View My Orders' : 'Reba Ibyo Watumije'}
            </Link>
            <Link to="/" className="text-slate-400 font-bold text-xs hover:text-sky-600 transition-colors">
              {language === 'en' ? 'Back to Home' : 'Subira Ahabanza'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}