// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import BatchManagement from './pages/BatchManagement';

function App() {
  return (
    <Routes>
      {/* Rute Login & Register */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rute Induk untuk Admin dengan Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Halaman anak akan dirender di dalam <Outlet /> */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="batch-management" element={<BatchManagement />} />
        {/* Tambahkan rute admin lainnya di sini, contoh: */}
        {/* <Route path="barang-masuk" element={<BarangMasukPage />} /> */}
      </Route>

      {/* Redirect dari halaman utama ke login */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;