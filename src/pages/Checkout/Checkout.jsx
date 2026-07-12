// src/pages/Checkout/Checkout.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import useCartStore from '../../stores/cartStore'
import useLanguageStore from '../../stores/languageStore'
import useAuthStore from '../../stores/authStore'
import useProductStore from '../../stores/productStore'
import { useCreateOrder } from '../../hooks/mutations/useCreateOrder'
import { getDeliveryFee } from '../../utils/delivery'

import OrderSuccess from './components/OrderSuccess'
import CheckoutSummary from './components/CheckoutSummary'
import ContactStep from './components/ContactStep'
import ZoneStep from './components/ZoneStep'
import PaymentStep from './components/PaymentStep'
import PaymentInstructions from './components/PaymentInstructions'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart, getTotal } = useCartStore()
  const language = useLanguageStore((state) => state.language)
  const user = useAuthStore((state) => state.user)
  
  const { mutateAsync: createOrder } = useCreateOrder()
  const updateStock = useProductStore((state) => state.updateStock)
  
  const [selectedZone, setSelectedZone] = useState('gasabo')
  const [paymentMethod, setPaymentMethod] = useState('mtn')
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastOrder, setLastOrder] = useState(null) 
  
  const [cachedFormData, setCachedFormData] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const subtotal = getTotal()
  const deliveryFee = getDeliveryFee(selectedZone, subtotal)
  const finalTotal = subtotal + deliveryFee

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) navigate('/cart')
  }, [items.length, orderPlaced, navigate])

  if (items.length === 0 && !orderPlaced) return null

  const onSubmit = (data) => {
    setCachedFormData(data)
    setShowPaymentInstructions(true)
    toast(language === 'en' ? 'Almost there! Please follow payment steps.' : 'Hasigaye gato!', { icon: '💳' })
    setTimeout(() => document.getElementById('payment-instructions')?.scrollIntoView({ behavior: 'smooth' }), 100)
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
      transactionId: transactionId || 'pending',
      createdAt: new Date().toISOString()
    }

    try {
      // 1. Save to Firebase
      await createOrder(orderPayload)
      await updateStock(items)
      setLastOrder(orderPayload)
      
      // 🚀 2. BUILD THE WHATSAPP MESSAGE
      let message = `*NEW ORDER - Kigali Swim Shop* 🏊‍♂️\n\n`;
      message += `*Customer:* ${orderPayload.customer.fullName}\n`;
      message += `*Phone:* ${orderPayload.customer.phone}\n`;
      message += `*Address:* ${orderPayload.customer.address} (${selectedZone})\n\n`;
      message += `*Items:*\n`;

      items.forEach(item => {
        message += `▪️ ${item.quantity}x ${item.name}`;
        if (item.selectedSize) message += ` (Size: ${item.selectedSize})`;
        if (item.selectedColor) message += ` (Color: ${item.selectedColor})`;
        message += ` - ${item.price * item.quantity} RWF\n`;
      });

      message += `\n*Delivery Fee:* ${deliveryFee} RWF\n`;
      message += `*Total Paid:* ${finalTotal} RWF\n`;
      message += `*Payment Method:* ${paymentMethod.toUpperCase()}\n`;
      if (transactionId) message += `*Transaction ID:* ${transactionId}\n`;

      // 3. Encode and prep URL
      const encodedMessage = encodeURIComponent(message);
      
      // 🚨 IMPORTANT: Replace this with your actual business WhatsApp number (with country code, no + or spaces)
      const shopWhatsAppNumber = "250784154697"; 
      
      const whatsappUrl = `https://wa.me/${shopWhatsAppNumber}?text=${encodedMessage}`;

      // 4. Clean up UI
      clearCart()
      setOrderPlaced(true) // Keeps the success screen rendering in the background
      toast.success(language === 'en' ? 'Order Secured!' : 'Itegeko ryohererejwe!')

      // 🚀 5. TRIGGER FOOLPROOF REDIRECT
      window.location.href = whatsappUrl;

    } catch (error) {
      console.error(error);
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
          
          <div className="lg:col-span-7">
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <ContactStep 
                register={register} 
                errors={errors} 
                user={user} 
                language={language} 
              />
              
              <ZoneStep 
                selectedZone={selectedZone} 
                setSelectedZone={setSelectedZone} 
                language={language} 
              />
              
              <PaymentStep 
                paymentMethod={paymentMethod} 
                setPaymentMethod={setPaymentMethod} 
                language={language} 
              />

              {!showPaymentInstructions && (
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black py-5 rounded-2xl text-lg shadow-xl active:scale-95 transition-all disabled:opacity-50"
                >
                  {language === 'en' ? 'Continue to Payment' : 'Komeza'}
                </button>
              )}
            </form>

            {showPaymentInstructions && (
              <PaymentInstructions 
                paymentMethod={paymentMethod}
                transactionId={transactionId}
                setTransactionId={setTransactionId}
                onConfirm={() => handleOrderPlacement(cachedFormData)}
                isSubmitting={isSubmitting}
                language={language}
              />
            )}
          </div>

          <CheckoutSummary 
            language={language} 
            items={items} 
            subtotal={subtotal} 
            deliveryFee={deliveryFee} 
            finalTotal={finalTotal} 
            selectedZone={selectedZone} 
          />
        </div>
      </div>
    </div>
  )
}