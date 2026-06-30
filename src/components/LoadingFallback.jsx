// src/components/LoadingFallback.jsx
import React from 'react'

export default function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
        <p className="text-slate-600 font-bold">Loading...</p>
      </div>
    </div>
  )
}