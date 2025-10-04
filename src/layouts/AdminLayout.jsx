// src/layouts/AdminLayout.jsx

import { Outlet } from 'react-router-dom'; // 1. WAJIB: Import Outlet
import Sidebar from '../components/Sidebar';

const AdminLayout = () => { // Hapus props { children }
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar />
      {/* Ganti 'div' menjadi 'main' untuk best practice.
        'w-full' memastikan konten mengisi sisa ruang.
      */}
      <main className="flex-1 p-8 w-full">
        {/* 2. Ganti {children} menjadi <Outlet /> */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;