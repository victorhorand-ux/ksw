// src/components/ProtectedRoute.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../stores/authStore'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const user = useAuthStore((state) => state.user)
  const isAdmin = useAuthStore((state) => state.isAdmin)
  const isLoading = useAuthStore((state) => state.isLoading)
  const location = useLocation()

  // 1. WAIT FOR FIREBASE
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-sky-500"></div>
      </div>
    )
  }

  // 2. NOT LOGGED IN? Send to login, but remember where they wanted to go!
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 3. NEEDS ADMIN BUT ISN'T ONE? Send back to home.
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />
  }

  // 4. EVERYTHING IS GOOD! Let them in.              
  return children
}

export default ProtectedRoute