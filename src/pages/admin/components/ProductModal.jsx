import BaseModal from './BaseModal';
import { useAdminModal } from '../../../hooks/admin/useAdminModal';

export default function ProductModal({ product, onClose, onSave, categories }) {
  // 🚀 ADDED: nameRw and originalPrice to the initial state fallback
  const { formData, setFormData, isUploading, isSaving, handleImageUpload } = useAdminModal(product || {
    name: '', nameRw: '', price: '', originalPrice: '', category: '', stock: 0, image: ''
  });

  return (
    <BaseModal title={product ? 'Edit Product' : 'New Gear'} onClose={onClose}>
      <div className="space-y-6">
        
        {/* 🚀 Row 1: English & Kinyarwanda Names */}
        <div className="grid grid-cols-2 gap-4">
          <input 
            value={formData.name || ''} 
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500" 
            placeholder="Name (English)"
          />
          <input 
            value={formData.nameRw || ''} 
            onChange={e => setFormData({...formData, nameRw: e.target.value})}
            className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500" 
            placeholder="Name (Kinyarwanda)"
          />
        </div>

        {/* 🚀 Row 2: Pricing (Sale Price & Original Price for Discounts) */}
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="number"
            value={formData.price || ''} 
            onChange={e => setFormData({...formData, price: e.target.value})}
            className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500" 
            placeholder="Sale Price (e.g. 8000)"
          />
          <input 
            type="number"
            value={formData.originalPrice || ''} 
            onChange={e => setFormData({...formData, originalPrice: e.target.value})}
            className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500" 
            placeholder="Original Price (e.g. 10000)"
          />
        </div>

        {/* Row 3: Category & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <select 
            value={formData.category || ''}
            onChange={e => setFormData({...formData, category: e.target.value})}
            className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Select Category</option>
            {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <input 
            type="number"
            value={formData.stock || ''} 
            onChange={e => setFormData({...formData, stock: e.target.value})}
            className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500" 
            placeholder="Stock Quantity"
          />
        </div>

        {/* Improved Media Upload Area */}
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-sky-500 transition-colors">
          <input 
            type="file" 
            id="file-upload"
            className="hidden"
            onChange={e => handleImageUpload(e.target.files[0])} 
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            {isUploading ? (
              <p className="font-bold text-sky-600 animate-pulse">Uploading...</p>
            ) : formData.image ? (
              <img src={formData.image} alt="Preview" className="h-20 mx-auto rounded-lg" />
            ) : (
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Click to Upload Image</p>
            )}
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button 
            onClick={onClose} 
            className="flex-1 py-4 text-slate-400 font-black uppercase text-xs hover:text-slate-900 transition-colors"
          >
            Abort
          </button>
          <button 
            onClick={() => onSave(formData)} 
            disabled={isSaving || isUploading} 
            className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs shadow-xl disabled:opacity-50 hover:bg-slate-800 transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}