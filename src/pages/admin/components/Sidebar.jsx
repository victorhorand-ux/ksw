import React from 'react';
import { useNavigate } from 'react-router-dom';
import useProductStore from '../../../stores/productStore';
import { toast } from 'react-hot-toast';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { seedProducts } = useProductStore();

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'products', label: 'Products', icon: '🏷️' },
    { id: 'categories', label: 'Categories', icon: '📂' },
    { id: 'subscribers', label: 'Subscribers', icon: '📬' },
    // 🚀 Added Posts/Articles Tab here
    { id: 'posts', label: 'Articles', icon: '📝' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-[50] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:block`}>
        <div className="p-6 h-full overflow-y-auto flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8 px-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-black text-xl text-slate-900 tracking-tighter">Admin</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 text-xl">✕</button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => { setActiveTab(item.id); setIsOpen(false); }} 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === item.id 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{item.icon}</span>{item.label}
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="mt-8 px-4 flex flex-col gap-3 pb-8">
            <button 
              onClick={() => {
                navigate('/admin/create-post');
                setIsOpen(false);
              }} 
              className="w-full py-3 bg-sky-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-sky-700 shadow-lg shadow-sky-200 transition flex items-center justify-center gap-2"
            >
              <span className="text-sm">✍️</span> Write Article
            </button>

            <button 
              onClick={async () => {
                await seedProducts();
                toast.success('Mock data uploaded');
              }} 
              className="w-full py-3 bg-green-50 text-green-700 font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-green-100 border border-green-200 transition flex justify-center items-center gap-2"
            >
              <span>🚀</span> Seed Data
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}