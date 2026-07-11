// src/pages/admin/components/CategoryModal.jsx
import React from 'react';
import BaseModal from './BaseModal';
import { useAdminModal } from '../../../hooks/admin/useAdminModal';
import { toast } from 'react-hot-toast';

export default function CategoryModal({ category, onClose, onSave }) {
  const { formData, setFormData, isUploading, isSaving, handleImageUpload } = useAdminModal(category || {
    name: '', nameRw: '', icon: '', image: ''
  });

  const handleCommit = () => {
    if (!formData.name) return toast.error('Category Name required');
    onSave(formData);
  };

  return (
    <BaseModal title={category ? 'Modify Category' : 'New Department'} onClose={onClose}>
      <div className="space-y-6">
        {/* Naming Row */}
        <div className="grid grid-cols-2 gap-4">
          <input 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500" 
            placeholder="Name (EN)"
          />
          <input 
            value={formData.nameRw} 
            onChange={e => setFormData({...formData, nameRw: e.target.value})}
            className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-sky-500" 
            placeholder="Name (RW)"
          />
        </div>

        {/* Identity Row (Upload vs Icon) */}
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
            Category Identity (Upload OR Icon)
          </label>
          <div className="flex gap-4 items-center">
            <div className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-sky-500 transition-colors">
              <input 
                type="file" 
                id="cat-file-upload"
                className="hidden"
                onChange={e => handleImageUpload(e.target.files[0])} 
              />
              <label htmlFor="cat-file-upload" className="cursor-pointer block w-full h-full">
                {isUploading ? (
                  <p className="font-bold text-sky-600 animate-pulse mt-2">Linking...</p>
                ) : formData.image ? (
                  <img src={formData.image} alt="Preview" className="h-10 mx-auto rounded-lg" />
                ) : (
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Media Upload</p>
                )}
              </label>
            </div>
            <span className="text-slate-300 font-bold">OR</span>
            <input 
              value={formData.icon} 
              onChange={e => setFormData({...formData, icon: e.target.value, image: ''})} 
              className="w-20 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xl outline-none" 
              placeholder="🔥" 
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button 
            onClick={onClose} 
            className="flex-1 py-4 text-slate-400 font-black uppercase text-xs hover:text-slate-900"
          >
            Discard
          </button>
          <button 
            onClick={handleCommit} 
            disabled={isSaving || isUploading} 
            className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs shadow-xl disabled:opacity-50"
          >
            {isSaving ? 'Updating...' : 'Commit'}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}