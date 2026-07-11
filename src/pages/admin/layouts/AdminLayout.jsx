import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function AdminLayout({ children, activeTab, setActiveTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setIsMobileMenuOpen} 
      />
      <div className="flex-1 lg:pl-64">
        <header className="lg:hidden p-4">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-2xl">☰</button>
        </header>
        <main className="p-4 lg:p-8 pt-4 lg:pt-8">{children}</main>
      </div>
    </div>
  );
}