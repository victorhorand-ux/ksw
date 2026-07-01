// src/pages/Profile/components/ProfileCard.jsx
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ProfileCard({ user, onUpdate, isUpdating }) {
  const [editing, setEditing] = useState(false)
  const { register, handleSubmit } = useForm({ defaultValues: user })

  if (editing) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-fit">
        <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
            <input {...register('name')} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/20 outline-none transition-all font-medium" />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
            <input {...register('phone')} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sky-500/20 outline-none transition-all font-medium" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setEditing(false)} className="flex-1 py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Cancel</button>
            <button type="submit" disabled={isUpdating} className="flex-1 py-3 bg-sky-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all active:scale-95">
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-fit text-center space-y-5">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto border-4 border-white shadow-md text-slate-400">
        {user.name?.charAt(0).toUpperCase() || '👤'}
      </div>
      <div>
        <h2 className="text-xl font-black text-slate-900">{user.name || 'Guest User'}</h2>
        <p className="text-sm text-slate-500 font-medium">{user.email || 'No Email'}</p>
        <p className="text-sm text-slate-500 font-medium">{user.phone || 'No Phone'}</p>
      </div>
      <button onClick={() => setEditing(true)} className="w-full py-3 border border-slate-200 rounded-xl text-slate-600 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
        Edit Profile
      </button>
    </div>
  )
}