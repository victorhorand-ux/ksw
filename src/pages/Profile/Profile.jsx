// src/pages/Profile/Profile.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebaseFirestore'

import useAuthStore from '../../stores/authStore'
import useLanguageStore from '../../stores/languageStore'
// 🚀 1. Swap Zustand for React Query
import { useUserOrders } from '../../hooks/queries/useUserOrders'

import ProfileCard from './components/ProfileCard'
import OrderHistory from './components/OrderHistory'

export default function Profile() {
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()
  const { language } = useLanguageStore()
  
  // 🚀 2. React Query automatically fetches when userId is available and handles loading states
  const userId = user?.uid || user?.id
  const { data: userOrders = [], isLoading } = useUserOrders(userId)
  
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => { 
    if (!user) navigate('/login') 
  }, [user, navigate])

  const handleUpdate = async (data) => {
    setIsUpdating(true)
    try {
      await setDoc(doc(db, 'users', userId), { ...data, updatedAt: new Date().toISOString() }, { merge: true })
      useAuthStore.setState({ user: { ...user, ...data } })
      toast.success(language === 'en' ? 'Profile updated!' : 'Bihinduwe neza!')
    } catch (e) { 
      toast.error(language === 'en' ? 'Failed to update' : 'Habaye ikibazo') 
    } finally { 
      setIsUpdating(false) 
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black">
            {language === 'en' ? `Hello, ${user.name}!` : `Muraho, ${user.name}!`}
          </h1>
          <button 
            onClick={async () => { await signOut(); navigate('/'); }} 
            className="text-rose-500 font-black hover:text-rose-600 transition-colors"
          >
            {language === 'en' ? 'Sign Out' : 'Sohoka'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProfileCard user={user} onUpdate={handleUpdate} isUpdating={isUpdating} />
          <div className="lg:col-span-2">
            <OrderHistory 
              orders={userOrders} 
              isLoading={isLoading} 
              onShop={() => navigate('/products')} 
              language={language} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}