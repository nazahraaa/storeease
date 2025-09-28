import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Konten dari setiap halaman admin akan ditampilkan di sini */}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;