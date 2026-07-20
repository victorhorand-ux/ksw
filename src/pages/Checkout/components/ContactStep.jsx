import React from 'react'
import Input from '../../../components/ui/Input' // 🚀 Imported the reusable Input

export default function ContactStep({ register, user, language, errors }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8">
      <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md">1</span>
        {language === 'en' ? 'Contact Information' : "Amakuru y'Umukiriya"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name Validation */}
        <Input 
          {...register('fullName', { 
            required: true, 
            pattern: /^[A-Za-z\s]+$/ 
          })} 
          defaultValue={user?.name || ''} 
          placeholder={language === 'en' ? "Full Name" : "Amazina"} 
          error={errors?.fullName ? (language === 'en' ? 'Invalid name' : 'Amazina atemewe') : null}
        />

        {/* Phone Validation */}
        <Input 
          {...register('phone', { 
            required: true, 
            pattern: /^[0-9]{10}$/ 
          })} 
          defaultValue={user?.phone || ''} 
          placeholder={language === 'en' ? "Phone Number (10 digits)" : "Nimero ya Telefone"} 
          error={errors?.phone ? (language === 'en' ? 'Must be 10 digits' : 'Nimero y\'telefone igomba kuba yuzuye') : null}
        />

        <Input 
          {...register('email')} 
          type="email" 
          defaultValue={user?.email || ''} 
          placeholder={language === 'en' ? "Email (Optional)" : "Imeli (Si ngombwa)"} 
        />
        
        <Input 
          {...register('address', { required: true })} 
          placeholder={language === 'en' ? "Delivery Address" : "Aho Kugeza Ibintu"} 
          error={errors?.address ? (language === 'en' ? 'Address is required' : 'Aderesi irakenewe') : null}
        />
      </div>
    </div>
  )
}