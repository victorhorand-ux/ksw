// src/layouts/RootLayout/Header/components/UserProfileDropdown.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLanguageStore from '../../../../stores/languageStore'
export default function UserProfileDropdown({ user, signOut }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { language } = useLanguageStore()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
    navigate('/')
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-sky-400 to-slate-900 p-0.5 shadow-md hover:scale-105 transition-transform"
      >
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50">
            <p className="font-bold text-slate-900 truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
          <div className="p-2">
            <Link onClick={() => setIsOpen(false)} to="/profile" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
              {language === 'en' ? 'My Profile' : 'Profayili Yanjye'}
            </Link>
            {user?.role === 'admin' && (
              <Link onClick={() => setIsOpen(false)} to="/admin" className="block px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg font-bold">
                ⚡ Admin Dashboard
              </Link>
            )}
            <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg font-medium">
              {language === 'en' ? 'Logout' : 'Sohoka'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}