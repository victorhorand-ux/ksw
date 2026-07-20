import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../../../components/admin/AdminNavbar'; // Adjust path if needed

export default function AdminLayout({ children, activeTab, setActiveTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* 🚀 Top Dark Navbar with Escape Hatches */}
      <AdminNavbar onMenuClick={() => setIsMobileMenuOpen(true)} />

      <div className="flex-1 flex relative">
        {/* Left Sidebar (Handles admin navigation) */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOpen={isMobileMenuOpen} 
          setIsOpen={setIsMobileMenuOpen} 
        />
        
        {/* Main Content Area */}
        <div className="flex-1 lg:pl-64 w-full">
          <main className="p-4 lg:p-8 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
      
    </div>
  );
}