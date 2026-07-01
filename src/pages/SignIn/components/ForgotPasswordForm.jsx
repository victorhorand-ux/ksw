// src/pages/SignIn/components/ForgotPasswordForm.jsx
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import useAuthStore from '../../../stores/authStore'

export default function ForgotPasswordForm({ language, setIsForgotMode }) {
  const resetPassword = useAuthStore((state) => state.resetPassword)
  const [resetEmail, setResetEmail] = useState('')
  const [isResetting, setIsResetting] = useState(false)

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!resetEmail) {
      toast.error(language === 'en' ? 'Please enter your email' : 'Andika imeli yawe')
      return
    }
    
    setIsResetting(true)
    
    try {
      if (resetPassword) {
        await resetPassword(resetEmail)
        toast.success(language === 'en' ? 'Password reset email sent! Check your inbox.' : 'Imeli yo guhindura ijambo ryibanga yoherejwe!')
        setIsForgotMode(false) 
        setResetEmail('') 
      } else {
        toast.error('Store error: resetPassword function not found.')
      }
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to send reset email. Verify your address.' : 'Ibyo mwasabye ntibyakunze. Reba imeli yawe.')
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="animate-fade-in w-full space-y-6">
      <div className="text-center md:text-left mb-8">
        <button 
          onClick={() => setIsForgotMode(false)}
          className="text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 flex items-center gap-1 transition-colors justify-center md:justify-start w-full md:w-auto"
        >
          ← {language === 'en' ? 'Back to Sign In' : 'Subira inyuma'}
        </button>
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
          {language === 'en' ? 'Reset Password' : 'Hindura Ijambo ry\'ibanga'}
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          {language === 'en' 
            ? 'Enter your email address and we will send you a link to reset your password.' 
            : 'Andika imeli yawe, tukoherereze ubutumwa bwo guhindura ijambo ry\'ibanga.'}
        </p>
      </div>

      <form onSubmit={handleForgotPassword} className="space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
            {language === 'en' ? 'Email Address' : 'Imeli'}
          </label>
          <input
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
            placeholder="name@example.com"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isResetting}
          className="w-full bg-sky-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-sky-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isResetting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            language === 'en' ? 'Send Reset Link' : 'Ohereza'
          )}
        </button>
      </form>
    </div>
  )
}