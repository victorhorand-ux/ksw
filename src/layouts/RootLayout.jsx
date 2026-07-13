// src/layouts/RootLayout.jsx
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './RootLayout/Header/Header'
import Footer from '../components/Footer/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import useAnalyticsStore from '../stores/analyticsStore'
import useAuthStore from '../stores/authStore'
import { getSessionId } from '../utils/analytics'

export default function RootLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  
  // 1. Unified Scroll Execution
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  // 2. Extracted Analytics Tracking Lifecycle
  const trackPageView = useAnalyticsStore((state) => state.trackPageView)
  const addPageToSession = useAnalyticsStore((state) => state.addPageToSession)
  const user = useAuthStore((state) => state.user)
  const sessionId = getSessionId()

  useEffect(() => {
    const page = location.pathname
    trackPageView(page, user?.id || null)
    addPageToSession(sessionId, page)
  }, [location.pathname, trackPageView, addPageToSession, user, sessionId])

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      {/* Replaces the old inline MainLayout completely */}
      <main 
        className={`flex-grow ${isHome ? '' : 'pt-16 lg:pt-20'}`} 
        role="main"
      >
        <Outlet /> 
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  )
}