// src/pages/admin/CreatePost.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseFirestore';
import { uploadToCloudinary } from '../../utils/uploadService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 🚀 Essential for Quill styling

export default function CreatePost() {
  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    status: 'draft', 
  });

  // Quill Toolbar Configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [2, 3, false] }], // Starts at H2 for SEO best practices
      ['bold', 'italic', 'underline', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean'] // Removes formatting
    ],
  };

  useEffect(() => {
    if (formData.title && !formData.slug.includes('-manually-edited')) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData(prev => ({ ...prev, image: url }));
      toast.success('Cover image attached');
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (publishStatus) => {
    // ReactQuill often leaves '<p><br></p>' when empty, so we check length
    if (!formData.title || !formData.content || formData.content === '<p><br></p>') {
      return toast.error('Title and Content are required');
    }

    setIsPublishing(true);
    try {
      const postData = {
        ...formData,
        status: publishStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'posts'), postData);
      
      toast.success(`Article ${publishStatus === 'published' ? 'Published' : 'Saved as Draft'}!`);
      navigate('/admin'); 
    } catch (error) {
      toast.error('Failed to save article');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header (Unchanged) */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 hover:bg-slate-100 transition-colors">←</button>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Write Article</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => handleSave('draft')} disabled={isPublishing || isUploading} className="px-6 py-2.5 bg-white text-slate-600 font-black text-xs uppercase tracking-widest rounded-xl border border-slate-200 hover:bg-slate-50 transition-all disabled:opacity-50">Save Draft</button>
            <button onClick={() => handleSave('published')} disabled={isPublishing || isUploading} className="px-6 py-2.5 bg-sky-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-sky-700 transition-all disabled:opacity-50">{isPublishing ? 'Publishing...' : 'Publish'}</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <input
              type="text"
              placeholder="Article Title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-transparent text-4xl font-black text-slate-900 placeholder:text-slate-300 outline-none border-none focus:ring-0 px-0"
            />
            
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">URL Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value + '-manually-edited' })}
                className="w-full p-4 bg-white rounded-2xl border border-slate-200 font-mono text-sm outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* 🚀 NEW: ReactQuill Implementation */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <ReactQuill 
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                modules={quillModules}
                placeholder="Write your article content here..."
                className="min-h-[400px]"
              />
            </div>
            {/* Custom CSS to fix Quill's default height behavior within Tailwind */}
            <style>{`
              .ql-container { min-height: 400px; font-size: 16px; border-bottom: none !important; border-left: none !important; border-right: none !important; }
              .ql-toolbar { border-top: none !important; border-left: none !important; border-right: none !important; border-bottom: 1px solid #e2e8f0 !important; background-color: #f8fafc; }
              .ql-editor { min-height: 400px; padding: 1.5rem; }
            `}</style>
          </div>

          {/* Sidebar Settings (Unchanged) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-widest mb-4">Featured Image</h3>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-sky-500 transition-colors">
                <input type="file" id="post-image" className="hidden" accept="image/*" onChange={handleImageUpload} />
                <label htmlFor="post-image" className="cursor-pointer block w-full">
                  {isUploading ? (
                    <p className="font-bold text-sky-600 animate-pulse py-8">Uploading...</p>
                  ) : formData.image ? (
                    <img src={formData.image} alt="Preview" className="w-full h-auto rounded-lg" />
                  ) : (
                    <div className="py-8"><span className="text-3xl mb-2 block">📸</span><p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Upload Cover</p></div>
                  )}
                </label>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-widest mb-4">Short Excerpt</h3>
              <textarea
                placeholder="A brief summary for the blog index..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 h-24 outline-none focus:ring-2 focus:ring-sky-500 text-sm font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}