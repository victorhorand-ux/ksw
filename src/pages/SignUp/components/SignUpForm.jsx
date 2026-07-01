// src/pages/SignUp/components/SignUpForm.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function SignUpForm({ language, onSubmit, isLoading, authError }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: 'onBlur' })
  const [showPassword, setShowPassword] = useState(false)
  const password = watch('password')

  return (
    <div className="animate-fade-in w-full">
      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
          {language === 'en' ? 'Create Account' : 'Fungura Konti'}
        </h1>
        <p className="text-slate-500 font-medium">
          {language === 'en' ? 'Already a member?' : 'Ufite konti?'} 
          <Link to="/login" className="text-sky-600 font-bold ml-1 hover:text-sky-700">
            {language === 'en' ? 'Log In' : 'Injira'}
          </Link>
        </p>
      </div>

      {authError && (
        <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold flex items-center gap-2">
          <span>⚠️</span> {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <input {...register('fullName', { required: true, minLength: 3 })} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-sky-500/20" placeholder={language === 'en' ? "Full Name" : "Amazina"} />
          {errors.fullName && <p className="text-[10px] text-red-500 font-bold mt-1">Required (Min 3 chars)</p>}
        </div>

        {/* Email */}
        <div>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-sky-500/20" placeholder="you@example.com" />
          {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1">Valid email required</p>}
        </div>

        {/* Phone Number - Strict Validation */}
        <div>
          <input
            {...register('phone', { 
              required: true, 
              pattern: { value: /^(\+250|0)[7][2389]\d{7}$/, message: 'Invalid Rwandan number' }
            })}
            type="tel"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-sky-500/20"
            placeholder="+250 788 000 000"
          />
          {errors.phone && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.phone.message}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <input {...register('password', { required: true, minLength: 8, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ })} type={showPassword ? "text" : "password"} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200" placeholder="Password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-400">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <p className="text-[10px] text-red-500 font-bold mt-1">Min 8 chars, must include letters & numbers</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <input {...register('confirmPassword', { validate: value => value === password })} type="password" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200" placeholder="Confirm Password" />
          {errors.confirmPassword && <p className="text-[10px] text-red-500 font-bold mt-1">Passwords do not match</p>}
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50">
          {isLoading ? <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto" /> : (language === 'en' ? 'Get Started' : 'Tangira')}
        </button>
      </form>
    </div>
  )
}