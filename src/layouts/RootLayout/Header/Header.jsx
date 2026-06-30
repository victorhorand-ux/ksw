// src/layouts/RootLayout/Header/Header.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import useCartStore from '../../../stores/cartStore'
import useLanguageStore from '../../../stores/languageStore'
import useAuthStore from '../../../stores/authStore'

import DesktopSearch from './components/DesktopSearch'
import UserProfileDropdown from './components/UserProfileDropdown'
import MobileMenuSlideout from './components/MobileMenuSlideout'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const cartItems = useCartStore((state) => state.items)
  const { language, setLanguage } = useLanguageStore()
  const { user, signOut } = useAuthStore()
  
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setIsMobileMenuOpen(false), [location])

  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled || !isHome ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-5'
  }`
  const textClass = isScrolled || !isHome ? 'text-slate-600 hover:text-sky-600' : 'text-white/90 hover:text-white'

  return (
    <>
      <header className={navClass}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* 1. BRAND LOGO */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
              <div className={`font-black text-xl leading-none ${isScrolled || !isHome ? 'text-slate-900' : 'text-white'}`}>
                KIGALI<br /><span className={isScrolled || !isHome ? 'text-sky-600' : 'text-sky-300'}>SWIM</span>
              </div>
            </Link>

            {/* 2. DESKTOP LINKS */}
            <div className="hidden lg:flex items-center gap-8">
               <Link to="/products" className={`font-bold text-sm uppercase ${textClass}`}>
                {language === 'en' ? 'Shop' : 'Gura'}
              </Link>
            </div>

            {/* 3. EXTRACTED SEARCH BAR */}
            <DesktopSearch isScrolled={isScrolled} isHome={isHome} />

            {/* 4. UTILITY ICONS & AUTH */}
            <div className="flex items-center gap-4 shrink-0">
              <button 
                onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
                className={`w-8 h-8 rounded-full font-bold text-xs ${isScrolled || !isHome ? 'bg-slate-100 text-slate-700' : 'bg-white/20 text-white'}`}
              >
                {language === 'en' ? 'RW' : 'EN'}
              </button>

              <Link to="/cart" className={`p-2 rounded-full relative ${textClass}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-sky-500 text-white text-xs flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {user ? (
                <UserProfileDropdown user={user} signOut={signOut} />
              ) : (
                <Link to="/login" className="hidden sm:block px-6 py-2 rounded-full font-bold text-sm bg-sky-600 text-white hover:bg-sky-700">
                  {language === 'en' ? 'Login' : 'Injira'}
                </Link>
              )}

              {/* MOBILE HAMBURGER BUTTON */}
              <button 
                className={`lg:hidden p-1 ${isScrolled || !isHome ? 'text-slate-900' : 'text-white'}`}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 5. MOBILE SLIDEOUT MENU */}
      <MobileMenuSlideout 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen} 
      />    
    </>
  )
}