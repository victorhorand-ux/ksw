// src/pages/Products/Products.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import useProductStore from '../../stores/productStore'
import useCategoryStore from '../../stores/categoryStore'
import useCartStore from '../../stores/cartStore'
import useLanguageStore from '../../stores/languageStore'

import CategoryScroll from './components/CategoryScroll'
import ProductToolbar from './components/ProductToolbar'
import ProductCard from './components/ProductCard'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlSearchQuery = searchParams.get('search') || ''
  const urlCategory = searchParams.get('category')

  const products = useProductStore((state) => state.products)
  const categories = useCategoryStore((state) => state.categories)
  const addItem = useCartStore((state) => state.addItem)
  const language = useLanguageStore((state) => state.language)

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
                            product.description.toLowerCase().includes(urlSearchQuery.toLowerCase())
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

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      
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
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="text-4xl md:text-6xl mb-4 opacity-50">🔍</div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
            {language === 'en' ? 'No products found' : 'Nta bicuruzwa byabonetse'}
          </h3>
          <button 
            onClick={() => {
              setSearchParams({})
              setSelectedCategory('all')
              setPriceRange([0, 1000000])
            }}
            className="mt-4 bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800 transition"
          >
            {language === 'en' ? 'Clear Filters' : 'Siba Byose'}
          </button>
        </div>
      )}
    </div>
  )
}