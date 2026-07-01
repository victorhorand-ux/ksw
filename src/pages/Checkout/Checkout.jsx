// src/pages/Checkout/Checkout.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import useCartStore from '../../stores/cartStore'
import useLanguageStore from '../../stores/languageStore'
import useAuthStore from '../../stores/authStore'
import useOrderStore from '../../stores/orderStore'
import useProductStore from '../../stores/productStore'

import { formatRWFSimple } from '../../utils/currency'
import { DELIVERY_ZONES, getDeliveryFee } from '../../utils/delivery'

import OrderSuccess from './components/OrderSuccess'
import CheckoutSummary from './components/CheckoutSummary'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart, getTotal } = useCartStore()
  const language = useLanguageStore((state) => state.language)
  const user = useAuthStore((state) => state.user)
  
  const createOrder = useOrderStore((state) => state.createOrder)
  const updateStock = useProductStore((state) => state.updateStock)
  
  const [selectedZone, setSelectedZone] = useState('gasabo')
  const [paymentMethod, setPaymentMethod] = useState('mtn')
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastOrder, setLastOrder] = useState(null) 

  const { register, handleSubmit, formState: { errors } } = useForm()

  const subtotal = getTotal()
  const deliveryFee = getDeliveryFee(selectedZone)
  const finalTotal = subtotal + deliveryFee

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) navigate('/cart')
  }, [items.length, orderPlaced, navigate])

  if (items.length === 0 && !orderPlaced) return null

  const onSubmit = (data) => {
    if (paymentMethod === 'cod') {
      handleOrderPlacement(data)
    } else {
      setShowPaymentInstructions(true)
      toast(language === 'en' ? 'Almost there! Please follow payment steps.' : 'Hasigaye gato!', { icon: '💳' })
      setTimeout(() => document.getElementById('payment-instructions')?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }

  const handleOrderPlacement = async (customerData) => {
    setIsSubmitting(true)
    const orderPayload = {
      userId: user?.uid || user?.id || 'guest',
      customer: {
        fullName: customerData?.fullName || user?.name || 'Guest Customer',
        address: customerData?.address || 'No Address',
        email: customerData?.email || user?.email || 'No Email',
        phone: customerData?.phone || user?.phone || 'No Phone', 
      },
      items: items.map(item => ({ ...item, price: Number(item.price), quantity: Number(item.quantity) })),
      deliveryZone: selectedZone,
      deliveryFee, subtotal, total: finalTotal,
      paymentMethod,
      transactionId: paymentMethod !== 'cod' ? transactionId : 'none',
      createdAt: new Date().toISOString()
    }

    try {
      await createOrder(orderPayload)
      await updateStock(items)
      setLastOrder(orderPayload)
      clearCart()
      setOrderPlaced(true)
      window.scrollTo(0, 0)
      toast.success(language === 'en' ? 'Order Secured!' : 'Itegeko ryohererejwe!')
    } catch (error) {
      toast.error(language === 'en' ? "Failed to save order." : "Habaye ikibazo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderPlaced) return <OrderSuccess language={language} lastOrder={lastOrder} />

  return (
    <div className="bg-slate-50 min-h-screen pt-4 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* LEFT: FORM AREA */}
          <div className="lg:col-span-7 space-y-6">
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* 1. CONTACT INFO */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8">
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md">1</span>
                  {language === 'en' ? 'Contact Information' : "Amakuru y'Umukiriya"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input {...register('fullName', { required: true })} defaultValue={user?.name || ''} placeholder="Full Name" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500" />
                  <input {...register('phone', { required: true })} defaultValue={user?.phone || ''} placeholder="Phone Number" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500" />
                  <input {...register('email')} type="email" defaultValue={user?.email || ''} placeholder="Email (Optional)" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500" />
                  <input {...register('address', { required: true })} placeholder="Delivery Address" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500" />
                </div>
              </div>

              {/* 2. ZONES */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8">
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md">2</span>
                  {language === 'en' ? 'Select Zone' : 'Hitamo Akarere'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(DELIVERY_ZONES).map(([key, zone]) => (
                    <button key={key} type="button" onClick={() => setSelectedZone(key)} className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedZone === key ? 'border-sky-500 bg-sky-50/50 transform -translate-y-1' : 'border-slate-50'}`}>
                      <div className="font-black text-sm">{language === 'en' ? zone.name : zone.nameRw}</div>
                      <div className="text-[10px] font-bold text-slate-400">{formatRWFSimple(zone.fee)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. PAYMENT */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 lg:p-8">
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md">3</span>
                  {language === 'en' ? 'Payment Method' : 'Uburyo bwo Kwishyura'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['mtn', 'airtel', 'cod'].map((id) => (
                    <label key={id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer ${paymentMethod === id ? 'border-sky-500 bg-sky-50/50' : 'border-slate-50'}`}>
                      <input type="radio" name="paymentMethod" value={id} checked={paymentMethod === id} onChange={(e) => setPaymentMethod(e.target.value)} className="sr-only" />
                      <div className="font-black text-sm uppercase">{id === 'cod' ? 'Cash on Delivery' : id}</div>
                    </label>
                  ))}
                </div>
              </div>

              {!showPaymentInstructions && (
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black py-5 rounded-2xl text-lg shadow-xl active:scale-95 transition-all">
                  {language === 'en' ? 'Continue to Payment' : 'Komeza'}
                </button>
              )}
            </form>

            {/* PAYMENT INSTRUCTIONS */}
            {showPaymentInstructions && paymentMethod !== 'cod' && (
              <div id="payment-instructions" className="bg-slate-900 text-white rounded-[2rem] shadow-2xl p-8 border border-slate-800">
                <h2 className="text-xl font-black text-sky-400 mb-6">Complete Payment</h2>
                <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="Transaction ID" className="w-full px-5 py-5 bg-slate-800 border border-slate-700 rounded-2xl focus:border-sky-500 text-white mb-4" />
                <button onClick={() => handleOrderPlacement({})} disabled={isSubmitting} className="w-full bg-sky-500 text-slate-900 font-black py-5 rounded-2xl">Confirm Payment</button>
              </div>
            )}
          </div>

          {/* RIGHT: SUMMARY */}
          <CheckoutSummary language={language} items={items} subtotal={subtotal} deliveryFee={deliveryFee} finalTotal={finalTotal} selectedZone={selectedZone} />
        </div>
      </div>
    </div>
  )
}