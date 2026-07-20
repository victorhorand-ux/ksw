import React from 'react'
import { FaBuildingColumns } from 'react-icons/fa6'

export default function PaymentStep({ paymentMethod, setPaymentMethod, language }) {
  const methods = [
    {
      id: 'mtn',
      label: 'MTN MoMo',
      // Exact path from your public folder
      image: '/momo_mtna.png', 
      activeBorder: 'border-[#ffcc00]',
      activeRing: 'ring-[#ffcc00]',
    },
    {
      id: 'airtel',
      label: 'Airtel Money',
      // Exact path from your public folder
      image: '/airtel_money_logo.jpg', 
      activeBorder: 'border-[#ff0000]',
      activeRing: 'ring-[#ff0000]',
    },
    {
      id: 'bank',
      label: language === 'en' ? 'Bank Transfer' : 'Kwishyura kuri Banki',
      // Using an icon since no bank image is in the public folder
      icon: <FaBuildingColumns className="text-4xl text-slate-700" />, 
      activeBorder: 'border-slate-800',
      activeRing: 'ring-slate-800',
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8">
      <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md">3</span>
        {language === 'en' ? 'Payment Method' : 'Uburyo bwo Kwishyura'}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {methods.map((method) => {
          const isSelected = paymentMethod === method.id;
          
          return (
            <label 
              key={method.id} 
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 min-h-[120px] bg-white ${
                isSelected 
                  ? `${method.activeBorder} shadow-md ring-1 ${method.activeRing} transform scale-[1.02]` 
                  : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <input 
                type="radio" 
                name="paymentMethod" 
                value={method.id} 
                checked={isSelected} 
                onChange={(e) => setPaymentMethod(e.target.value)} 
                className="sr-only" 
              />
              
              {/* Dynamic Image or Icon Container - Always fully visible and colored */}
              <div className="h-12 w-full flex items-center justify-center mb-3">
                {method.image ? (
                  <img 
                    src={method.image} 
                    alt={`${method.label} logo`} 
                    className="max-h-full max-w-[100px] object-contain"
                  />
                ) : (
                  <div className={`${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                    {method.icon}
                  </div>
                )}
              </div>
              
              <div className={`font-bold text-xs uppercase tracking-wider transition-colors ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                {method.label}
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}