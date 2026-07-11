// src/pages/admin/tabs/CategoriesTab.jsx
import React from 'react';

export default function CategoriesTab({ categories, onAdd, onEdit, onDelete }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
        <p className="text-slate-400 font-medium">No categories available. Create one to get started.</p>
        <button onClick={onAdd} className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase">
          + Add Category
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black">Manage Categories</h2>
        <button onClick={onAdd} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase">
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl mb-4 overflow-hidden border border-slate-100 group-hover:scale-110 transition-transform">
              {cat.image ? <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" /> : cat.icon}
            </div>
            <h3 className="font-black text-sm text-slate-900 uppercase tracking-widest mb-4">{cat.name}</h3>
            <div className="flex gap-2 w-full">
               <button onClick={() => onEdit(cat)} className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Edit</button>
               <button onClick={() => onDelete(cat.id)} className="px-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-all">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}