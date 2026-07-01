// src/pages/Profile/Profile.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

import useAuthStore from '../../stores/authStore'
import useLanguageStore from '../../stores/languageStore'
import useOrderStore from '../../stores/orderStore'

import ProfileCard from './components/ProfileCard'
import OrderHistory from './components/OrderHistory'

export default function Profile() {
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()
  const { language } = useLanguageStore()
  const { userOrders, fetchUserOrders, isLoading } = useOrderStore()
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => { if (!user) navigate('/login') }, [user, navigate])
  useEffect(() => { if (user) fetchUserOrders(user.uid || user.id) }, [user, fetchUserOrders])

  const handleUpdate = async (data) => {
    setIsUpdating(true)
    try {
      await setDoc(doc(db, 'users', user.uid || user.id), { ...data, updatedAt: new Date().toISOString() }, { merge: true })
      useAuthStore.setState({ user: { ...user, ...data } })
      toast.success('Profile updated!')
    } catch (e) { toast.error('Failed to update') }
    finally { setIsUpdating(false) }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black">Hello, {user.name}!</h1>
          <button onClick={async () => { await signOut(); navigate('/'); }} className="text-rose-500 font-black">Sign Out</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProfileCard user={user} onUpdate={handleUpdate} isUpdating={isUpdating} />
          <div className="lg:col-span-2">
            <OrderHistory orders={userOrders} isLoading={isLoading} onShop={() => navigate('/products')} language={language} />
          </div>
        </div>
      </div>
    </div>
  )
}