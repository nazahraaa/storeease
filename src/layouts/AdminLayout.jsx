import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  return (
    // 1. Ubah min-h-screen menjadi h-screen dan tambahkan overflow-hidden
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
      <Sidebar />
      {/* 2. Tambahkan overflow-y-auto agar area ini bisa di-scroll */}
      <main className="flex-1 w-full p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;