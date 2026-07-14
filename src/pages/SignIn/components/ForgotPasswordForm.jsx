// src/pages/SignIn/components/ForgotPasswordForm.jsx
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import useAuthStore from '../../../stores/authStore'
import Button from '../../../components/ui/Button' // 🚀 Imported your reusable button

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
    // 🚀 Changed space-y-6 to space-y-4 to make it more compact
    <div className="animate-fade-in w-full space-y-4">
      
      <div className="text-center md:text-left mb-2">
        <button 
          onClick={() => setIsForgotMode(false)}
          className="text-sm font-bold text-slate-500 hover:text-slate-900 mb-4 flex items-center gap-1 transition-colors justify-center md:justify-start w-full md:w-auto"
        >
          ← {language === 'en' ? 'Back to Sign In' : 'Subira inyuma'}
        </button>
        
        {/* 🚀 Reduced bottom margins here */}
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1.5 tracking-tight">
          {language === 'en' ? 'Reset Password' : 'Hindura Ijambo ry\'ibanga'}
        </h1>
        <p className="text-slate-500 font-medium text-sm leading-snug">
          {language === 'en' 
            ? 'Enter your email address and we will send you a link to reset your password.' 
            : 'Andika imeli yawe, tukoherereze ubutumwa bwo guhindura ijambo ry\'ibanga.'}
        </p>
      </div>

      {/* 🚀 Changed form gap from space-y-6 to space-y-4 */}
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div>
          <label className="block text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
            {language === 'en' ? 'Email Address' : 'Imeli'}
          </label>
          <input
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            // 🚀 Slightly reduced input vertical padding (py-3 instead of py-3.5)
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium text-sm"
            placeholder="name@example.com"
            required
          />
        </div>
        
        {/* 🚀 Replaced HTML button with your reusable Button component */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isResetting}
          className="shadow-lg !py-3.5 mt-2"
        >
          {isResetting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            language === 'en' ? 'Send Reset Link' : 'Ohereza'
          )}
        </Button>
      </form>
    </div>
  )
}