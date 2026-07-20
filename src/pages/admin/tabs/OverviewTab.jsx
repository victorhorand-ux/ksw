// src/pages/admin/tabs/OverviewTab.jsx
import React from 'react';
import { formatRWF } from '../../../utils/currency';

export default function OverviewTab({ data }) {
  // Safely extract data in case it's still loading
  const { products = [], orders = [] } = data || {};

  // 1. Calculate top-level business metrics
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  // 2. 🚀 LOW STOCK LOGIC: Filter products with 5 or fewer items left
  const STOCK_WARNING_THRESHOLD = 5;
  const lowStockProducts = products
    .filter(product => product.stock <= STOCK_WARNING_THRESHOLD)
    .sort((a, b) => a.stock - b.stock); // Sort so the absolute lowest stock is at the top

  return (
    <div className="space-y-6">
      
      {/* --- TOP METRICS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Revenue</p>
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
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Pending Fulfillment</p>
          <p className={`text-2xl font-black ${pendingOrders > 0 ? 'text-orange-500 animate-pulse' : 'text-slate-300'}`}>
            {pendingOrders}
          </p>
        </div>

        {/* Total Inventory Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Catalog Size</p>
          <p className="text-2xl font-black text-purple-600">
            {products.length} Items
          </p>
        </div>
      </div>

      {/* --- 🚀 LOW STOCK ALERTS SECTION --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
            <span className="text-orange-500">⚠️</span> Low Stock Alerts
          </h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200">
            Threshold: {STOCK_WARNING_THRESHOLD} units
          </span>
        </div>

        {lowStockProducts.length === 0 ? (
          // All Good State
          <div className="p-12 text-center">
            <span className="text-4xl mb-4 block">✅</span>
            <p className="text-slate-500 font-bold">Inventory is looking healthy.</p>
            <p className="text-slate-400 text-sm font-medium mt-1">No products are currently running low.</p>
          </div>
        ) : (
          // Alert List State
          <div className="divide-y divide-slate-50">
            {lowStockProducts.map(product => (
              <div key={product.id} className="p-4 lg:p-6 hover:bg-slate-50 transition flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-slate-300">📦</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm uppercase tracking-tight">{product.name}</h3>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">{formatRWF(product.price)}</p>
                  </div>
                </div>
                
                <div className="text-right flex-shrink-0">
                  <p className={`font-black text-lg ${product.stock === 0 ? 'text-rose-600 animate-pulse' : 'text-orange-500'}`}>
                    {product.stock} left
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    {product.stock === 0 ? 'Out of Stock' : 'Needs Restock'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}