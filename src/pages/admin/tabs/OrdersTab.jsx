import React from 'react';
import { formatRWF } from '../../../utils/currency';

export default function OrdersTab({ orders, onUpdateStatus }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-12 text-center">
        <p className="text-slate-400 font-medium">No order logs available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="divide-y divide-slate-50">
        {orders.map((order) => (
          <div key={order.id} className="p-4 lg:p-6 hover:bg-slate-50 transition">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Order Info */}
              <div>
                <h3 className="font-black text-slate-900 tracking-tight">
                  Order #{order.id.slice(-6).toUpperCase()}
                </h3>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                  {order.customer?.fullName} • {order.customer?.phone}
                </p>
                <p className="text-[10px] text-slate-400 font-medium mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Price & Status Actions */}
              <div className="flex flex-col md:items-end gap-3">
                <span className="font-black text-sky-600 text-lg">
                  {formatRWF(order.total)}
                </span>
                
                <select 
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                  className={`w-full md:w-auto bg-white border border-slate-200 text-xs font-black uppercase tracking-widest py-2 px-4 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-sky-500/10 cursor-pointer ${
                    order.status === 'completed' ? 'text-green-600' : 
                    order.status === 'cancelled' ? 'text-rose-500' : 
                    'text-orange-500'
                  }`}
                >
                  <option value="pending">🟡 Pending</option>
                  <option value="shipped">🚚 Shipped</option>
                  <option value="completed">✅ Completed</option>
                  <option value="cancelled">❌ Cancelled</option>
                </select>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}