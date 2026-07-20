// src/components/LoadingFallback.jsx
import React from 'react'
import { PageSkeleton } from './SkeletonLoader'

export default function LoadingFallback() {
  return <PageSkeleton title="Loading" />
}