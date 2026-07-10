// src/pages/Checkout/components/PaymentStep.jsx
import React from 'react'

export default function PaymentStep({ paymentMethod, setPaymentMethod, language }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8">
      <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md">3</span>
        {language === 'en' ? 'Payment Method' : 'Uburyo bwo Kwishyura'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {['mtn', 'airtel', 'cod'].map((id) => (
          <label 
            key={id} 
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              paymentMethod === id ? 'border-sky-500 bg-sky-50/50' : 'border-slate-50 hover:border-slate-200'
            }`}
          >
            <input 
              type="radio" 
              name="paymentMethod" 
              value={id} 
              checked={paymentMethod === id} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              className="sr-only" 
            />
            <div className="font-black text-sm uppercase">
              {id === 'cod' ? (language === 'en' ? 'Cash on Delivery' : 'Kwishyura Mugejejweho') : id}
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}