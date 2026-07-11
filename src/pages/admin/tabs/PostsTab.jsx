import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostsTab({ posts, onDelete, onToggleStatus }) {
  const navigate = useNavigate();

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
        <p className="text-slate-400 font-medium">No articles published yet.</p>
        <button 
          onClick={() => navigate('/admin/create-post')} 
          className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black uppercase"
        >
          ✍️ Write Article
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 lg:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
        <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest">
          Published Content ({posts.length})
        </h2>
        <button 
          onClick={() => navigate('/admin/create-post')}
          className="bg-sky-500 text-white hover:bg-sky-600 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-sky-100 transition"
        >
          + New Post
        </button>
      </div>
      
      <div className="divide-y divide-slate-50">
        {posts.map((post) => (
          <div key={post.id} className="p-4 lg:p-6 hover:bg-slate-50 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex-1">
              <h3 className="font-black text-slate-900 text-lg mb-1">{post.title}</h3>
              <p className="text-xs font-medium text-slate-500 line-clamp-1 mb-2">
                {post.excerpt || 'No excerpt provided...'}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                  post.status === 'published' 
                    ? 'bg-green-50 text-green-600 border-green-100' 
                    : 'bg-orange-50 text-orange-500 border-orange-100'
                }`}>
                  {post.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => onToggleStatus(post.id, post.status === 'published' ? 'draft' : 'published')}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
              >
                {post.status === 'published' ? 'Unpublish' : 'Publish'}
              </button>
              <button 
                onClick={() => onDelete(post.id)}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl transition-colors text-sm"
                title="Delete Post"
              >
                🗑️
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}