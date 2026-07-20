// src/components/AppProvider.jsx
import React, { useEffect } from 'react'
import useAnalyticsStore from '../stores/analyticsStore'
import useAuthStore from '../stores/authStore'
import useProductStore from '../stores/productStore'
import useCategoryStore from '../stores/categoryStore'
import { getSessionId } from '../utils/analytics'

export default function AppProvider({ children }) {
  const startSession = useAnalyticsStore((state) => state.startSession)
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const fetchCategories = useCategoryStore((state) => state.fetchCategories)
  const initializeAuth = useAuthStore((state) => state.initializeAuth)
  const sessionId = getSessionId()

  useEffect(() => {
    // 1. Fire up local logging context
    startSession(sessionId)
    
    // 2. Fetch remote collections from Firestore
    fetchProducts()
    fetchCategories()

    // 3. Mount secure auth observer subscription
    const unsubscribe = initializeAuth()
    
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [startSession, sessionId, fetchProducts, fetchCategories, initializeAuth])

  return <>{children}</>
}