import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLanguageStore from '../../../../stores/languageStore'
import useAuthStore from '../../../../stores/authStore'
import useCategoryStore from '../../../../stores/categoryStore'

export default function MobileMenuSlideout({ isOpen, setIsOpen }) {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  
  const { language } = useLanguageStore()
  const { user, signOut } = useAuthStore()
  const categories = useCategoryStore((state) => state.categories) || []

  const closeMenu = () => setIsOpen(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      closeMenu()
    }
  }

  const handleSignOut = async () => {
    await signOut()
    closeMenu()
    navigate('/')
  }

  return (
    <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMenu}></div>
      <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 overflow-hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <span className="font-black text-xl text-slate-900 tracking-tight">MENU</span>
          <button onClick={closeMenu} className="p-2 text-slate-400 hover:text-red-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-8">
          
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
            />
            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </form>

          {/* 🚀 UPDATED: Mobile Categories (Normal Buttons without Icons) */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {language === 'en' ? 'Categories' : 'Ibyiciro'}
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  to={`/products?category=${cat.id}`}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-sky-500 hover:text-sky-600 hover:bg-sky-50 text-sm font-bold text-slate-700 shadow-sm transition-all"
                  onClick={closeMenu}
                >
                  {language === 'en' ? cat.name : cat.nameRw}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Links */}
          <div className="space-y-1 pt-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {language === 'en' ? 'Quick Links' : 'Amahuza'}
            </p>
            <Link to="/" onClick={closeMenu} className="block px-4 py-3 rounded-xl hover:bg-slate-50 font-bold text-slate-700">Home</Link>
            <Link to="/products" onClick={closeMenu} className="block px-4 py-3 rounded-xl hover:bg-slate-50 font-bold text-slate-700">All Products</Link>
            {user && (
               <Link to="/profile" onClick={closeMenu} className="block px-4 py-3 rounded-xl hover:bg-slate-50 font-bold text-slate-700">My Profile</Link>
            )}
          </div>
        </div>

        {/* Mobile Footer (Auth) */}
        <div className="p-5 border-t border-slate-100 bg-slate-50">
          {!user ? (
            <Link to="/login" onClick={closeMenu} className="block w-full bg-slate-900 text-white font-bold text-center py-4 rounded-xl shadow-lg">
              Login / Register
            </Link>
          ) : (
            <button onClick={handleSignOut} className="block w-full bg-white text-red-500 font-bold text-center py-4 rounded-xl border border-slate-200 hover:bg-red-50">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}