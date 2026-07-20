// src/pages/Cart/Cart.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../../stores/cartStore'
import useLanguageStore from '../../stores/languageStore'
import useHydration from '../../hooks/useHydration'
import { formatRWF } from '../../utils/currency'
import Button from '../../components/ui/Button' // 🚀 Import Button

import CartItem from './components/CartItem'
import OrderSummary from './components/OrderSummary'

export default function Cart() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const getTotal = useCartStore((state) => state.getTotal)
  const language = useLanguageStore((state) => state.language)
  const isHydrated = useHydration()
  const isEnglish = !isHydrated || language === 'en'

  const total = getTotal()
  const freeShippingThreshold = 50000
  const progress = Math.min((total / freeShippingThreshold) * 100, 100)

  // Empty State
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm text-center sm:p-12">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-sky-50 text-4xl shadow-inner">
            <span aria-hidden="true">🛒</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">
            {isEnglish ? 'Your cart is empty' : 'Igikapu cyawe ntakintu kirimo'}
          </h2>
          <p className="mx-auto max-w-xl text-base text-slate-600 mb-8">
            {isEnglish
              ? 'Pick your preferred swim gear, add it to your bag, and continue with confidence when you are ready.'
              : 'Hitamo ibikoresho byawe byo koga, ubishyire mu gikapu, maze ukomeze igihe wishimiye.'}
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/products')}
            >
              {isEnglish ? 'Start Shopping' : 'Tangira Gucuruza'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/about')}
            >
              {isEnglish ? 'Learn About Us' : 'Menya Ibyacu'}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight">
          {isEnglish ? 'Your Bag' : 'Igikapu cyawe'} 
          <span className="text-lg font-medium text-slate-400 ml-3">
            ({items.length} {items.length === 1 ? 'item' : 'items'})
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: CART ITEMS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Free Shipping Progress Bar */}
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-3">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${progress === 100 ? 'bg-green-100 text-green-600' : 'bg-sky-100 text-sky-600'}`}>
                   🚚
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between text-sm font-bold">
                     <span className={progress === 100 ? 'text-green-600' : 'text-slate-700'}>
                       {progress === 100 
                         ? (isEnglish ? 'Free Shipping Unlocked! 🎉' : 'Tubikugezaho k\'ubuntu! 🎉')
                         : (isEnglish ? `Spend ${formatRWF(freeShippingThreshold - total)} for Free Shipping` : `Koresha ${formatRWF(freeShippingThreshold - total)} kugirango ubone transport k'ubuntu`)
                       }
                     </span>
                     <span className="text-slate-400 font-medium hidden sm:block">{Math.round(progress)}%</span>
                   </div>
                 </div>
               </div>
               <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                 <div className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-sky-400 to-blue-500'}`} style={{ width: `${progress}%` }}></div>
               </div>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              {items.map((item) => (
                <CartItem 
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} 
                  item={item}
                  language={language}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="lg:col-span-4">
            <OrderSummary 
              language={language} 
              total={total} 
              freeShippingThreshold={freeShippingThreshold} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}