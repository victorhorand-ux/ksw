// src/pages/Checkout/Checkout.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import useCartStore from '../../stores/cartStore'
import useLanguageStore from '../../stores/languageStore'
import useHydration from '../../hooks/useHydration'
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

// 🚀 Imported the reusable Button
import Button from '../../components/ui/Button' 

export default function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart, getTotal } = useCartStore()
  const language = useLanguageStore((state) => state.language)
  const isHydrated = useHydration()
  const isEnglish = !isHydrated || language === 'en'
  const user = useAuthStore((state) => state.user)
  
  const { mutateAsync: createOrder } = useCreateOrder()
  const updateStock = useProductStore((state) => state.updateStock)
  
  const [selectedZone, setSelectedZone] = useState('gasabo')
  const [paymentMethod, setPaymentMethod] = useState('mtn')
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
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
    toast(isEnglish ? 'Almost there! Please follow payment steps.' : 'Hasigaye gato!', { icon: '💳' })
    setTimeout(() => document.getElementById('payment-instructions')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const handleOrderPlacement = async (customerData) => {
    setIsSubmitting(true)
    setSubmitError('')
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
      
      // 2. BUILD THE WHATSAPP MESSAGE
      let message = `*NEW ORDER - KigaliSwimShop* 🏊‍♂️\n\n`;
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
      const shopWhatsAppNumber = "250784154697"; 
      
      const whatsappUrl = `https://wa.me/${shopWhatsAppNumber}?text=${encodedMessage}`;

      // 4. Clean up UI
      clearCart()
      setOrderPlaced(true)
      toast.success(isEnglish ? 'Order Secured!' : 'Itegeko ryohererejwe!')

      // 5. Open WhatsApp in a new tab for the user to continue the conversation
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    } catch (error) {
      console.error(error)
      setSubmitError(isEnglish ? 'We could not place your order right now. Please try again.' : 'Itegeko ryanyu ntirishobora gushyirwaho ubu. Ongera mugerageze.')
      toast.error(isEnglish ? 'Failed to save order.' : 'Habaye ikibazo.')
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
                <Button 
                  type="submit" 
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting} 
                >
                  {isEnglish ? 'Continue to Payment' : 'Komeza'}
                </Button>
              )}
            </form>

            {showPaymentInstructions && (
              <>
                {submitError && (
                  <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700" role="alert">
                    {submitError}
                  </div>
                )}
                <PaymentInstructions 
                  paymentMethod={paymentMethod}
                  transactionId={transactionId}
                  setTransactionId={setTransactionId}
                  onConfirm={() => handleOrderPlacement(cachedFormData)}
                  isSubmitting={isSubmitting}
                  language={language}
                />
              </>
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