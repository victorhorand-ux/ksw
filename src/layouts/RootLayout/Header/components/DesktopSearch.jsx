// src/layouts/RootLayout/Header/components/DesktopSearch.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLanguageStore from '../../../../stores/languageStore'



export default function DesktopSearch({ isScrolled, isHome }) {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { language } = useLanguageStore()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="hidden md:flex flex-1 max-w-md mx-4">
      <form onSubmit={handleSearch} className="w-full relative group">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === 'en' ? "Search for gear..." : "Shakisha..."}
          className={`w-full pl-10 pr-4 py-2.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all ${
            isScrolled || !isHome 
              ? 'bg-slate-100 border-transparent focus:bg-white' 
              : 'bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400'
          }`}
        />
        <button type="submit" className={`absolute left-3 top-1/2 -translate-y-1/2 ${
          isScrolled || !isHome ? 'text-slate-400' : 'text-white/70 group-focus-within:text-slate-400'
        }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </form>
    </div>
  )
}