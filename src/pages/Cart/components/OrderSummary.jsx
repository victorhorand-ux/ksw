import React from 'react'
import { useNavigate } from 'react-router-dom' // 🚀 Changed to useNavigate for button compatibility
import { formatRWF } from '../../../utils/currency'
import Button from '../../../components/ui/Button' // 🚀 Imported Button

export default function OrderSummary({ language, total, freeShippingThreshold }) {
  const navigate = useNavigate()
  const deliveryFee = total >= freeShippingThreshold ? 0 : 2000
  const finalTotal = total + deliveryFee

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8 sticky top-24">
      <h2 className="text-xl font-black mb-6 text-slate-900 border-b border-slate-100 pb-4">
        {language === 'en' ? 'Order Summary' : 'Incamake'}
      </h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-slate-600">
          <span>{language === 'en' ? 'Subtotal' : 'Incamake'}</span>
          <span className="font-bold text-slate-900">{formatRWF(total)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>{language === 'en' ? 'Delivery' : 'Kubikugezaho'}</span>
          {deliveryFee === 0 ? (
            <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-sm">{language === 'en' ? 'Free' : 'Ubuntu'}</span>
          ) : (
            <span className="font-bold text-slate-900">{formatRWF(deliveryFee)}</span>
          )}
        </div>
      </div>

      <div className="border-t border-dashed border-slate-200 pt-6 mb-8 bg-slate-50 -mx-6 px-6 pb-6 rounded-b-2xl md:rounded-b-3xl">
        <div className="flex justify-between items-end mb-1">
          <span className="font-bold text-slate-900 uppercase tracking-wider text-sm">{language === 'en' ? 'Total' : 'Byose'}</span>
          <span className="text-3xl font-black text-sky-600 tracking-tight">{formatRWF(finalTotal)}</span>
        </div>
        <p className="text-xs text-slate-500 font-medium text-right mb-6">
          {language === 'en' ? 'Including taxes' : 'Harimo imisoro'}
        </p>

        {/* 🚀 Refactored to use the reusable Button component */}
        <Button 
          variant="primary" 
          size="lg" 
          fullWidth 
          onClick={() => navigate('/checkout')}
        >
          {language === 'en' ? 'Proceed to Checkout' : 'Kwishyura'}
        </Button>

        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <span>{language === 'en' ? 'Secure encrypted checkout' : 'Kwishyura Bwite'}</span>
          </div>
          
          <div className="flex items-center gap-2 opacity-60">
            <div className="w-8 h-5 bg-slate-300 rounded"></div>
            <div className="w-8 h-5 bg-slate-300 rounded"></div>
            <div className="w-8 h-5 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}