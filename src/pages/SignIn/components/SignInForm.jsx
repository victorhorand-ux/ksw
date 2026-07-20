// src/pages/SignIn/components/SignInForm.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import useAuthStore from '../../../stores/authStore'
import Button from '../../../components/ui/Button' // 🚀 Imported reusable button

export default function SignInForm({ language, setIsForgotMode }) {
  const navigate = useNavigate()
  const signIn = useAuthStore((state) => state.signIn)
  
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    setAuthError('')
    
    try {
      await signIn(data.emailOrPhone, data.password)
      const currentUser = useAuthStore.getState().user

      toast.success(
        language === 'en' ? `Welcome back, ${currentUser?.name || 'User'}!` : `Murakaza neza, ${currentUser?.name || 'User'}!`,
        { id: 'auth-success' }
      )

      if (currentUser?.email === 'admin@kigaliswim.com' || currentUser?.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/profile')
      }
    } catch (error) {
      const errorMessage = language === 'en' ? 'Invalid email or password' : "Imeli cyangwa ijambo ry'ibanga sibyo"
      setAuthError(errorMessage)
      toast.error(errorMessage, { id: 'auth-error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-fade-in w-full">
      {/* 🚀 Reduced mb-10 to mb-6 */}
      <div className="text-center md:text-left mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1.5 tracking-tight">
          {language === 'en' ? 'Sign In' : 'Injira'}
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          {language === 'en' ? 'New here?' : 'Uri mushya?'} 
          <Link to="/signup" className="text-sky-600 font-bold ml-1 hover:text-sky-700 transition-colors">
            {language === 'en' ? 'Create an account' : 'Fungura konti'}
          </Link>
        </p>
      </div>

      {authError && (
        <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm font-bold text-rose-600 flex items-center gap-2 animate-shake" role="alert">
          <span aria-hidden="true">⚠️</span> {authError}
        </div>
      )}

      {/* 🚀 Reduced space-y-6 to space-y-4 */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1.5 ml-1 block text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500" htmlFor="emailOrPhone">
            {language === 'en' ? 'Email or Phone' : 'Imeli cyangwa Terefoni'}
          </label>
          <input
            id="emailOrPhone"
            {...register('emailOrPhone', { required: true })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all duration-200 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/10"
            placeholder="name@example.com"
          />
          {errors.emailOrPhone && <span className="mt-1 ml-1 text-[10px] font-bold uppercase text-rose-500">Required</span>}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5 ml-1">
            <label className="block text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest" htmlFor="password">
              {language === 'en' ? 'Password' : "Ijambo ry'ibanga"}
            </label>
            <button 
              type="button" 
              onClick={() => setIsForgotMode(true)} 
              className="text-xs font-bold text-sky-600 transition-colors hover:text-sky-700 focus-visible:outline-none focus-visible:underline"
            >
              {language === 'en' ? 'Forgot?' : 'Waryibagiwe?'}
            </button>
          </div>
          <input
            id="password"
            {...register('password', { required: true })}
            type="password"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all duration-200 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/10"
            placeholder="••••••••"
          />
          {errors.password && <span className="mt-1 ml-1 text-[10px] font-bold uppercase text-rose-500">Required</span>}
        </div>
        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
          className="mt-2 !bg-slate-900 text-white shadow-xl hover:!bg-slate-800 !py-3.5"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            language === 'en' ? 'Sign In' : 'Injira'
          )}
        </Button>
      </form>
    </div>
  )
}