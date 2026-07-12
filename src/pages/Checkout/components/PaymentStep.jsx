import React from 'react'

export default function PaymentStep({ paymentMethod, setPaymentMethod, language }) {
  const methods = ['mtn', 'airtel', 'bank'];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8">
      <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md">3</span>
        {language === 'en' ? 'Payment Method' : 'Uburyo bwo Kwishyura'}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {methods.map((id) => {
          const isSelected = paymentMethod === id;
          return (
            <label 
              key={id} 
              className={`flex items-center justify-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-sky-500 bg-sky-50/50 shadow-[0_4px_12px_rgba(2,132,199,0.1)] ring-1 ring-sky-500' 
                  : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <input 
                type="radio" 
                name="paymentMethod" 
                value={id} 
                checked={isSelected} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="sr-only" 
              />
              <div className={`font-black text-sm uppercase ${isSelected ? 'text-sky-700' : 'text-slate-900'}`}>
                {id === 'bank' ? (language === 'en' ? 'Bank Transfer' : 'Kwishyura kuri Banki') : id}
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}