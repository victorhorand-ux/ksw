// src/components/ProtectedRoute.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../stores/authStore'
import { PageSkeleton } from './SkeletonLoader'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const user = useAuthStore((state) => state.user)
  const isAdmin = useAuthStore((state) => state.isAdmin)
  const isLoading = useAuthStore((state) => state.isLoading)
  const location = useLocation()

  // 1. WAIT FOR FIREBASE
  if (isLoading) {
    return <PageSkeleton title="Checking access" />
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