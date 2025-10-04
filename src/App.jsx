// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import BatchManagement from './pages/BatchManagement';

// 1. PASTIKAN IMPORT INI SUDAH ADA DAN BENAR
import BarangMasuk from './pages/BarangMasuk';
import BarangKeluar from './pages/BarangKeluar';

function App() {
  return (
    <Routes>
      {/* Rute Login & Register */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rute Induk untuk Admin dengan Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Halaman anak akan dirender di dalam <Outlet /> */}
        <Route index element={<Navigate to="dashboard" />} /> {/* Arahkan /admin ke /admin/dashboard */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="batch-management" element={<BatchManagement />} />
        
        {/* 2. PASTIKAN RUTE INI SUDAH ADA */}
        <Route path="barang-masuk" element={<BarangMasuk />} />
        <Route path="barang-keluar" element={<BarangKeluar />} />
      </Route>

      {/* Redirect dari halaman utama ke login */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;