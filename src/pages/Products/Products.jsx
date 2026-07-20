// src/pages/Products/Products.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

// 🚀 1. Import our new React Query hooks
import { useProducts } from '../../hooks/queries/useProducts'
import { useCategories } from '../../hooks/queries/useCategories'

import useCartStore from '../../stores/cartStore'
import useLanguageStore from '../../stores/languageStore'
import useHydration from '../../hooks/useHydration'

import CategoryScroll from './components/CategoryScroll'
import ProductToolbar from './components/ProductToolbar'
import ProductCard from './components/ProductCard'

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-3 aspect-[4/5] rounded-[1rem] bg-slate-200" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-4 w-1/2 rounded bg-slate-200" />
        <div className="h-5 w-1/3 rounded bg-slate-200" />
      </div>
    </div>
  )
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlSearchQuery = searchParams.get('search') || ''
  const urlCategory = searchParams.get('category')

  // 🚀 2. Replace Zustand with React Query (includes automatic loading states!)
  const { data: products = [], isLoading: isProductsLoading } = useProducts()
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories()
  
  const addItem = useCartStore((state) => state.addItem)
  const language = useLanguageStore((state) => state.language)
  const isHydrated = useHydration()
  const isEnglish = !isHydrated || language === 'en'

  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'all')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [sortBy, setSortBy] = useState('newest')
  const [showPriceFilter, setShowPriceFilter] = useState(false)
  const filterRef = useRef(null)

  useEffect(() => {
    if (urlCategory) setSelectedCategory(urlCategory)
  }, [urlCategory])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowPriceFilter(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(urlSearchQuery.toLowerCase()) ||
                            (product.description && product.description.toLowerCase().includes(urlSearchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return b.id - a.id
    })
  }, [products, urlSearchQuery, selectedCategory, priceRange, sortBy])

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId)
    setSearchParams(prev => {
      if (catId === 'all') prev.delete('category')
      else prev.set('category', catId)
      return prev
    })
  }

  // 🚀 3. Add a graceful loading UI while React Query fetches the initial data
  if (isProductsLoading || isCategoriesLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="mb-4 space-y-2">
          <div className="h-8 w-48 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-72 animate-pulse rounded-full bg-slate-200" />
        </div>
        <div className="mb-6 grid grid-cols-4 gap-2 md:gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-10 animate-pulse rounded-full bg-slate-200" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {isEnglish ? 'Shop the collection' : 'Gura ibikoresho'}
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            {isEnglish
              ? 'Browse premium swim gear by category, price, and style.'
              : 'Reba ibikoresho byiza byo koga ukurikije icyiciro, ibiciro, n’imiterere.'}
          </p>
        </div>
      </div>
      
      <CategoryScroll 
        categories={categories} 
        selectedCategory={selectedCategory} 
        handleCategoryClick={handleCategoryClick} 
        language={language} 
      />

      <ProductToolbar 
        urlSearchQuery={urlSearchQuery}
        filteredCount={filteredProducts.length}
        language={language}
        filterRef={filterRef}
        showPriceFilter={showPriceFilter}
        setShowPriceFilter={setShowPriceFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} language={language} addItem={addItem} />
          ))}
        </div>
      ) : (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-[2rem] border border-dashed border-slate-300">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-4xl shadow-sm">🔍</div>
          <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2">
            {isEnglish ? 'No products match that selection' : 'Nta bicuruzwa bihuye n’ivyo'}
          </h3>
          <p className="max-w-md text-sm md:text-base text-slate-600 mb-6">
            {isEnglish
              ? 'Try widening your filters or browse a different category to discover more gear.'
              : 'Gerageza kongera ibyahiswemo cyangwa ujye mu bindi byiciro byo kubona ibikoresho byinshi.'}
          </p>
          <button 
            onClick={() => {
              setSearchParams({})
              setSelectedCategory('all')
              setPriceRange([0, 1000000])
            }}
            className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800 transition"
          >
            {isEnglish ? 'Clear Filters' : 'Siba Byose'}
          </button>
        </div>
      )}
    </div>
  )
}