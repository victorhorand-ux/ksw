import React from 'react';

export default function SizeGuideModal({ language, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-slate-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
        >
          ✕
        </button>
        <h3 className="text-2xl font-black mb-6 text-slate-900 flex items-center gap-2">
          <span>📏</span> {language === 'en' ? 'Size Guide' : 'Inyigisho y\'Ingano'}
        </h3>
        <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-slate-900">Size</th>
                <th className="px-4 py-3 text-left font-bold text-slate-900">Chest</th>
                <th className="px-4 py-3 text-left font-bold text-slate-900">Waist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr className="hover:bg-slate-50 transition"><td className="px-4 py-3 font-bold text-slate-900">S</td><td className="px-4 py-3 text-slate-600">88-96cm</td><td className="px-4 py-3 text-slate-600">73-81cm</td></tr>
              <tr className="hover:bg-slate-50 transition"><td className="px-4 py-3 font-bold text-slate-900">M</td><td className="px-4 py-3 text-slate-600">96-104cm</td><td className="px-4 py-3 text-slate-600">81-89cm</td></tr>
              <tr className="hover:bg-slate-50 transition"><td className="px-4 py-3 font-bold text-slate-900">L</td><td className="px-4 py-3 text-slate-600">104-112cm</td><td className="px-4 py-3 text-slate-600">89-97cm</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}