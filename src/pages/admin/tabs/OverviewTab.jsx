// src/pages/admin/tabs/OverviewTab.jsx
import React from 'react';
import { formatRWF } from '../../../utils/currency';

export default function OverviewTab({ data }) {
  // Safely extract data in case it's still loading
  const { products = [], orders = [] } = data || {};

  // Calculate total revenue from all orders
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  
  // Find orders that need action
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Revenue Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Revenue</p>
        <p className="text-2xl font-black text-green-600">
          {formatRWF(totalRevenue)}
        </p>
      </div>

      {/* Orders Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Orders</p>
        <p className="text-2xl font-black text-sky-600">
          {orders.length}
        </p>
      </div>

      {/* Pending Action Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Pending Action</p>
        <p className={`text-2xl font-black ${pendingOrders > 0 ? 'text-orange-500 animate-pulse' : 'text-slate-300'}`}>
          {pendingOrders}
        </p>
      </div>

      {/* Inventory Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Inventory</p>
        <p className="text-2xl font-black text-purple-600">
          {products.length}
        </p>
      </div>
    </div>
  );
}