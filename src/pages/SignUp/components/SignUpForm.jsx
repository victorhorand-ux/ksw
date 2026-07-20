// src/pages/SignUp/components/SignUpForm.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Button from '../../../components/ui/Button' // 🚀 Imported reusable button

export default function SignUpForm({ language, onSubmit, isLoading, authError }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: 'onBlur' })
  const [showPassword, setShowPassword] = useState(false)
  const password = watch('password')

  return (
    <div className="animate-fade-in w-full">
      {/* 🚀 Reduced mb-8 to mb-6 for a tighter header */}
      <div className="text-center md:text-left mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1.5 tracking-tight">
          {language === 'en' ? 'Create Account' : 'Fungura Konti'}
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          {language === 'en' ? 'Already a member?' : 'Ufite konti?'} 
          <Link to="/login" className="text-sky-600 font-bold ml-1 hover:text-sky-700 transition-colors">
            {language === 'en' ? 'Log In' : 'Injira'}
          </Link>
        </p>
      </div>

      {authError && (
        // 🚀 Reduced margin and padding for the error banner
        <div className="mb-4 p-3 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold flex items-center gap-2">
          <span>⚠️</span> {authError}
        </div>
      )}

      {/* 🚀 Kept space-y-4 for compact vertical rhythm */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <input 
            {...register('fullName', { required: true, minLength: 3 })} 
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm" 
            placeholder={language === 'en' ? "Full Name" : "Amazina"} 
          />
          {errors.fullName && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase">Required (Min 3 chars)</p>}
        </div>

        {/* Email */}
        <div>
          <input 
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
            type="email" 
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm" 
            placeholder="you@example.com" 
          />
          {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase">Valid email required</p>}
        </div>

        {/* Phone Number - Strict Validation */}
        <div>
          <input
            {...register('phone', { 
              required: true, 
              pattern: { value: /^(\+250|0)[7][2389]\d{7}$/, message: 'Invalid Rwandan number' }
            })}
            type="tel"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm"
            placeholder="+250 788 000 000"
          />
          {errors.phone && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase">{errors.phone.message}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <input 
            {...register('password', { required: true, minLength: 8, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} 
            type={showPassword ? "text" : "password"} 
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm" 
            placeholder={language === 'en' ? "Password" : "Ijambo ry'ibanga"} 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-4 top-3 text-slate-400 hover:text-sky-600 transition-colors"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase">Min 8 chars, letters & numbers</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <input 
            {...register('confirmPassword', { validate: value => value === password })} 
            type={showPassword ? "text" : "password"} 
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm" 
            placeholder={language === 'en' ? "Confirm Password" : "Emeza Ijambo ry'ibanga"} 
          />
          {errors.confirmPassword && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase">Passwords do not match</p>}
        </div>

        {/* 🚀 Replaced HTML button with Button component. */}
        <Button 
          type="submit" 
          fullWidth
          disabled={isLoading} 
          className="!bg-slate-900 hover:!bg-slate-800 text-white shadow-xl !py-3.5 mt-2"
        >
          {isLoading ? (
            <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto" />
          ) : (
            language === 'en' ? 'Get Started' : 'Tangira'
          )}
        </Button>
      </form>
    </div>
  )
}