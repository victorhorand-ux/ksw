import React from 'react'

export function SkeletonBlock({ className = '', rounded = 'rounded-full' }) {
  return <div className={`animate-pulse bg-slate-200 ${rounded} ${className}`} />
}

export function PageSkeleton({ title = 'Loading...' }) {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <div className="space-y-3">
          <SkeletonBlock className="h-8 w-48" />
          <SkeletonBlock className="h-4 w-72" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-[1.5rem] border border-slate-200 p-4">
            <SkeletonBlock className="h-64 w-full rounded-[1.25rem]" />
            <SkeletonBlock className="h-5 w-3/4" />
            <SkeletonBlock className="h-4 w-1/2" />
          </div>
          <div className="space-y-3 rounded-[1.5rem] border border-slate-200 p-4">
            <SkeletonBlock className="h-64 w-full rounded-[1.25rem]" />
            <SkeletonBlock className="h-5 w-3/4" />
            <SkeletonBlock className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-[70vh] bg-white px-4 py-8 lg:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <SkeletonBlock className="h-80 w-full rounded-[2rem]" />
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-20 w-full rounded-[1rem]" />
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-[2rem] border border-slate-200 p-6 shadow-sm">
            <SkeletonBlock className="h-8 w-2/3" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-4/5" />
            <SkeletonBlock className="h-12 w-1/3 rounded-[1rem]" />
            <SkeletonBlock className="h-12 w-full rounded-[1rem]" />
            <SkeletonBlock className="h-12 w-full rounded-[1rem]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ArticleSkeleton() {
  return (
    <div className="min-h-[70vh] bg-white px-4 py-10 lg:px-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <SkeletonBlock className="h-72 w-full rounded-[2rem]" />
        <div className="space-y-3">
          <SkeletonBlock className="h-6 w-1/3" />
          <SkeletonBlock className="h-10 w-2/3" />
          <SkeletonBlock className="h-4 w-1/2" />
        </div>
        <div className="space-y-3 rounded-[1.5rem] border border-slate-200 p-6">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-4/5" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}

export function ListSkeleton({ count = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-1/3" />
              <SkeletonBlock className="h-4 w-2/3" />
            </div>
            <SkeletonBlock className="h-8 w-20 rounded-[999px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
