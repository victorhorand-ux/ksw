// src/pages/SignIn/SignIn.jsx
import React, { useState } from 'react'
import useLanguageStore from '../../stores/languageStore'

import AuthHero from './components/AuthHero'
import SignInForm from './components/SignInForm'
import ForgotPasswordForm from './components/ForgotPasswordForm'

export default function SignIn() {
  const language = useLanguageStore((state) => state.language)
  const [isForgotMode, setIsForgotMode] = useState(false)

  return (
    // 🚀 Removed min-h-screen and replaced it with sensible padding (py-10)
    <div className="py-10 md:py-16 flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* LEFT COLUMN: STATIC HERO IMAGE */}
        <AuthHero language={language} />

        {/* RIGHT COLUMN: DYNAMIC FORMS */}
        {/* 🚀 Shrunk top/bottom padding and completely removed min-h-[500px] */}
        <div className="w-full md:w-1/2 px-6 py-6 md:px-12 md:py-8 flex flex-col justify-center">
          {isForgotMode ? (
            <ForgotPasswordForm 
              language={language} 
              setIsForgotMode={setIsForgotMode} 
            />
          ) : (
            <SignInForm 
              language={language} 
              setIsForgotMode={setIsForgotMode} 
            />
          )}
        </div>
        
      </div>
    </div>
  )
}