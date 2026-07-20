import { create } from 'zustand'

const MAX_STORED_EVENTS = 500; // 🚀 Prevent localStorage QuotaExceededError

const loadAnalytics = () => {
  try {
    const stored = localStorage.getItem('analytics-data')
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.error('Failed to load analytics:', e)
  }
  return {
    pageViews: [],
    sessions: [],
    productViews: {},
    productClicks: {}
  }
}

const saveAnalytics = (data) => {
  try {
    localStorage.setItem('analytics-data', JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save analytics (Quota likely exceeded):', e)
  }
}

const useAnalyticsStore = create((set, get) => ({
  analytics: loadAnalytics(),
  
  trackPageView: (page, userId = null) => {
    const state = get()
    const pageView = { page, timestamp: Date.now(), userId }
    
    // 🚀 Keep only the most recent events to prevent crashing localStorage
    const updatedPageViews = [...state.analytics.pageViews, pageView].slice(-MAX_STORED_EVENTS)

    const updatedAnalytics = {
      ...state.analytics,
      pageViews: updatedPageViews
    }
    
    set({ analytics: updatedAnalytics })
    saveAnalytics(updatedAnalytics)

    // 🚀 TODO: Send to Firebase/Google Analytics here so the Admin can actually see it!
    // logEvent(analytics, 'page_view', { page_path: page }); 
  },
  
trackProductView: (productId, productName) => {
    const state = get()
    
    // 1. Save locally for the user's personal "Recently Viewed" UI
    const updatedViews = {
      ...state.analytics.productViews,
      [productId]: (state.analytics.productViews[productId] || 0) + 1
    }
    const updatedAnalytics = { ...state.analytics, productViews: updatedViews }
    
    set({ analytics: updatedAnalytics })
    saveAnalytics(updatedAnalytics)

    // 2. 🚀 Send to Google Analytics for your Admin Dashboard
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'RWF',
        items: [{
          item_id: productId,
          item_name: productName
        }]
      });
    }
  },
  
  trackProductClick: (productId) => {
    const state = get()
    const updatedClicks = {
      ...state.analytics.productClicks,
      [productId]: (state.analytics.productClicks[productId] || 0) + 1
    }
    const updatedAnalytics = { ...state.analytics, productClicks: updatedClicks }
    
    set({ analytics: updatedAnalytics })
    saveAnalytics(updatedAnalytics)
  },
  
  startSession: (sessionId) => {
    const state = get()
    const session = { sessionId, startTime: Date.now(), pages: [] }
    
    // 🚀 Truncate sessions to prevent memory leaks
    const updatedSessions = [...state.analytics.sessions, session].slice(-50)
    
    const updatedAnalytics = { ...state.analytics, sessions: updatedSessions }
    set({ analytics: updatedAnalytics })
    saveAnalytics(updatedAnalytics)
  },
  
  endSession: (sessionId) => {
    const state = get()
    const updatedSessions = state.analytics.sessions.map(s =>
      s.sessionId === sessionId ? { ...s, endTime: Date.now() } : s
    )
    const updatedAnalytics = { ...state.analytics, sessions: updatedSessions }
    set({ analytics: updatedAnalytics })
    saveAnalytics(updatedAnalytics)
  },
  
  addPageToSession: (sessionId, page) => {
    const state = get()
    const updatedSessions = state.analytics.sessions.map(s =>
      s.sessionId === sessionId ? { ...s, pages: [...(s.pages || []), page] } : s
    )
    const updatedAnalytics = { ...state.analytics, sessions: updatedSessions }
    set({ analytics: updatedAnalytics })
    saveAnalytics(updatedAnalytics)
  },
  
  getSummary: () => {
    const state = get()
    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000
    const oneWeek = 7 * oneDay
    
    const pageViews = state.analytics.pageViews || []
    const todayViews = pageViews.filter(pv => now - pv.timestamp < oneDay).length
    const weekViews = pageViews.filter(pv => now - pv.timestamp < oneWeek).length
    const totalViews = pageViews.length
    
    const sessions = state.analytics.sessions || []
    const activeSessions = sessions.filter(s => !s.endTime || (now - s.endTime < oneDay)).length
    
    const pageCounts = {}
    pageViews.forEach(pv => {
      pageCounts[pv.page] = (pageCounts[pv.page] || 0) + 1
    })
    const mostViewedPages = Object.entries(pageCounts)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
    
    const productViews = state.analytics.productViews || {}
    const productClicks = state.analytics.productClicks || {}
    const popularProducts = Object.keys({ ...productViews, ...productClicks })
      .map(productId => ({
        productId: productId, // Removed parseInt in case IDs are strings (like Firebase UUIDs)
        views: productViews[productId] || 0,
        clicks: productClicks[productId] || 0,
        total: (productViews[productId] || 0) + (productClicks[productId] || 0)
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10)
    
    return {
      todayViews,
      weekViews,
      totalViews,
      activeSessions,
      mostViewedPages,
      popularProducts
    }
  }
}))

export default useAnalyticsStore