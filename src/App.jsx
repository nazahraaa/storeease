// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import BatchManagement from './pages/BatchManagement';
import BarangMasuk from './pages/BarangMasuk';
import BarangKeluar from './pages/BarangKeluar';
import LaporanStok from './pages/LaporanStok';
import ManajemenPengguna from './pages/ManajemenPengguna';
import RiwayatAktivitas from './pages/RiwayatAktivitas';
import Bantuan from './pages/Bantuan'; // <-- 1. IMPORT HALAMAN BARU

function App() {
  return (
    <Routes>
      {/* Rute Login & Register */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rute Induk untuk Admin dengan Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="batch-management" element={<BatchManagement />} />
        <Route path="barang-masuk" element={<BarangMasuk />} />
        <Route path="barang-keluar" element={<BarangKeluar />} />
        <Route path="laporan" element={<LaporanStok />} />
        <Route path="pengguna" element={<ManajemenPengguna />} />
        <Route path="riwayat" element={<RiwayatAktivitas />} />
        
        {/* 2. TAMBAHKAN RUTE INI */}
        <Route path="bantuan" element={<Bantuan />} />

      </Route>

      {/* Redirect dari halaman utama ke login */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;