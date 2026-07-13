import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button'; 

export default function AdminNavbar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add authStore logout logic here later
    navigate('/');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* LEFT: Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onMenuClick}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Admin Brand */}
            <Link to="/admin" className="flex items-center gap-3 group">
              <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-sky-500/20 transition-all">
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white font-black text-sm lg:text-lg leading-tight tracking-wide">KIGALI SWIM</h1>
                <p className="text-sky-400 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest">Admin Workspace</p>
              </div>
            </Link>
          </div>

          {/* RIGHT: Escape Hatches */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="!border-slate-700 !text-slate-300 hover:!text-white hover:!bg-slate-800 hover:!border-slate-600 !bg-transparent gap-2 py-2 px-3 lg:px-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                <span className="hidden sm:inline">Live Storefront</span>
              </Button>
            </Link>
            
            <div className="hidden sm:block w-px h-6 bg-slate-800 mx-1"></div>
            
            <button onClick={handleLogout} className="text-slate-400 hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-slate-800" title="Log out">
              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}