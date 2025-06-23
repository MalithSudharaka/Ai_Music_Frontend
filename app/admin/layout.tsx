import React from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminNavbar from './components/AdminNavbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#081028]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
} 