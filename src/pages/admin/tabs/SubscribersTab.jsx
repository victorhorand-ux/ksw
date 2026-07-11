import React from 'react';
import { toast } from 'react-hot-toast';

export default function SubscribersTab({ subscribers }) {
  
  const handleCopyAll = () => {
    if (!subscribers || subscribers.length === 0) return;
    const emails = subscribers.map(s => s.email).join(', ');
    navigator.clipboard.writeText(emails);
    toast.success('Emails copied to clipboard!', { icon: '📋' });
  };

  if (!subscribers || subscribers.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
        <p className="text-slate-400 font-medium">No subscribers found in database.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 lg:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
        <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest">
          Mailing List ({subscribers.length})
        </h2>
        <button 
          onClick={handleCopyAll}
          className="bg-sky-500 text-white hover:bg-sky-600 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-sky-100 transition"
        >
          Copy All
        </button>
      </div>
      
      <div className="divide-y divide-slate-50">
        {subscribers.map((sub) => (
          <div key={sub.id} className="p-4 lg:p-6 hover:bg-slate-50 transition flex justify-between items-center">
            <div>
              <p className="font-black text-slate-900 text-sm">{sub.email}</p>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">
                Joined {new Date(sub.subscribedAt).toLocaleDateString()}
              </p>
            </div>
            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100">
              {sub.status || 'Active'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}