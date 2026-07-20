// src/pages/admin/components/BaseModal.jsx
export default function BaseModal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] flex items-end lg:items-center justify-center p-0 lg:p-4 animate-fade-in">
      <div className="bg-white rounded-t-[2.5rem] lg:rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 lg:p-10 border border-slate-100">
        <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tighter">{title}</h2>
        {children}
      </div>
    </div>
  )
}