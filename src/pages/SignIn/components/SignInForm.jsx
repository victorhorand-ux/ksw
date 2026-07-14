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
        // 🚀 Reduced mb-6 to mb-4 and p-4 to p-3
        <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-bold flex items-center gap-2 animate-shake">
          <span>⚠️</span> {authError}
        </div>
      )}

      {/* 🚀 Reduced space-y-6 to space-y-4 */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
            {language === 'en' ? 'Email or Phone' : 'Imeli cyangwa Terefoni'}
          </label>
          <input
            {...register('emailOrPhone', { required: true })}
            // 🚀 Reduced py-3.5 to py-3
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm"
            placeholder="name@example.com"
          />
          {errors.emailOrPhone && <span className="text-[10px] font-bold text-rose-500 mt-1 ml-1 uppercase">Required</span>}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5 ml-1">
            <label className="block text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">
              {language === 'en' ? 'Password' : "Ijambo ry'ibanga"}
            </label>
            <button 
              type="button" 
              onClick={() => setIsForgotMode(true)} 
              className="text-xs text-sky-600 font-bold hover:text-sky-700 transition-colors"
            >
              {language === 'en' ? 'Forgot?' : 'Waryibagiwe?'}
            </button>
          </div>
          <input
            {...register('password', { required: true })}
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm"
            placeholder="••••••••"
          />
          {errors.password && <span className="text-[10px] font-bold text-rose-500 mt-1 ml-1 uppercase">Required</span>}
        </div>
        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
          className="!bg-slate-900 hover:!bg-slate-800 text-white shadow-xl !py-3.5 mt-2"
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