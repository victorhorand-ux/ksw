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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-32 pb-12">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* LEFT COLUMN: STATIC HERO IMAGE */}
        <AuthHero language={language} />

        {/* RIGHT COLUMN: DYNAMIC FORMS */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center min-h-[500px]">
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