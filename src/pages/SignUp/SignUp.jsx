// src/pages/SignUp/SignUp.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import useAuthStore from '../../stores/authStore'
import useLanguageStore from '../../stores/languageStore'
import LazyImage from '../../components/LazyImage'
import SignUpForm from './components/SignUpForm'

export default function SignUp() {
  const navigate = useNavigate()
  const signUp = useAuthStore((state) => state.signUp)
  const language = useLanguageStore((state) => state.language)
  
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const onSubmit = async (data) => {
    setIsLoading(true)
    setAuthError('')
    try {
      const user = await signUp({ name: data.fullName, email: data.email, phone: data.phone, password: data.password })
      toast.success(language === 'en' ? 'Account created!' : 'Konti yafunguwe!')
      user.role === 'admin' ? navigate('/admin') : navigate('/')
    } catch (err) {
      setAuthError(err.message)
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-32 pb-12">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse border border-slate-100">
        <div className="hidden md:block w-1/2 bg-slate-900 relative">
          <div className="absolute inset-0 bg-gradient-to-bl from-sky-600/20 to-slate-900/90 z-10" />
          <LazyImage src="https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2070&auto=format&fit=crop" alt="Pool" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <SignUpForm language={language} onSubmit={onSubmit} isLoading={isLoading} authError={authError} />
        </div>
      </div>
    </div>
  )
}