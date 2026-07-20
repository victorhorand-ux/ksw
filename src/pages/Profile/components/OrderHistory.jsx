// src/pages/Profile/components/OrderHistory.jsx
import React from 'react'
import { formatRWF } from '../../../utils/currency'
import { ListSkeleton } from '../../../components/SkeletonLoader'

export default function OrderHistory({ orders, isLoading, onShop, language }) {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-orange-100 text-orange-600 border-orange-200',
      processing: 'bg-blue-100 text-blue-600 border-blue-200',
      shipped: 'bg-purple-100 text-purple-600 border-purple-200',
      completed: 'bg-green-100 text-green-600 border-green-200',
      cancelled: 'bg-red-100 text-red-600 border-red-200'
    }
    return colors[status] || 'bg-slate-100 text-slate-600 border-slate-200'
  }

  if (isLoading) return <ListSkeleton count={4} />

  if (orders.length === 0) return (
    <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
      <h3 className="font-black text-slate-900">No orders yet</h3>
      <button onClick={onShop} className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-xl font-black">Start Shopping</button>
    </div>
  )

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="font-black text-slate-900">Order #{order.id.slice(-6).toUpperCase()}</span>
              <span className={`ml-3 px-2 py-1 rounded text-[10px] font-black uppercase border ${getStatusColor(order.status)}`}>{order.status}</span>
            </div>
            <p className="text-xl font-black text-sky-600">{formatRWF(order.total)}</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="font-bold text-slate-700">{item.quantity}x {item.nameRw || item.name}</span>
                <span className="text-slate-500 font-black">{formatRWF(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}