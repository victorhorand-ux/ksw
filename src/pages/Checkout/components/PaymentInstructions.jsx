// src/pages/Checkout/components/PaymentInstructions.jsx
import React from 'react'

export default function PaymentInstructions({ transactionId, setTransactionId, onConfirm, isSubmitting, language }) {
  return (
    <div id="payment-instructions" className="bg-slate-900 text-white rounded-[2rem] shadow-2xl p-8 border border-slate-800 animate-fade-in mt-6">
      <h2 className="text-xl font-black text-sky-400 mb-6">
        {language === 'en' ? 'Complete Payment' : 'Emeza Ubwishyu'}
      </h2>
      <p className="text-sm text-slate-400 mb-4 font-medium">
        {language === 'en' 
          ? 'Please complete the transfer on your phone and enter the transaction ID below.' 
          : 'Urasabwa kwishyura kuri telefone yawe, hanyuma ushyiremo nimero yemeza ubwishyu hano hasi.'}
      </p>
      <input 
        type="text" 
        value={transactionId} 
        onChange={(e) => setTransactionId(e.target.value)} 
        placeholder={language === 'en' ? "Transaction ID" : "Nimero y'Ubwishyu"} 
        className="w-full px-5 py-5 bg-slate-800 border border-slate-700 rounded-2xl focus:border-sky-500 outline-none text-white mb-4 transition-all" 
      />
      <button 
        onClick={onConfirm} 
        disabled={isSubmitting || !transactionId} 
        className="w-full bg-sky-500 hover:bg-sky-400 text-slate-900 font-black py-5 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting 
          ? (language === 'en' ? 'Processing...' : 'Biratunganywa...') 
          : (language === 'en' ? 'Confirm Payment' : 'Emeza Kwishyura')}
      </button>
    </div>
  )
}