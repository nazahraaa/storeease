// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';

// Proteksi Rute
import ProtectedRoute from './components/auth/ProtectedRoute';

// Halaman Admin
import AdminDashboard from './pages/AdminDashboard';
import BatchManagement from './pages/BatchManagement';
import BarangMasuk from './pages/BarangMasuk';
import BarangKeluar from './pages/BarangKeluar';

// Halaman User (Placeholder - Ganti dengan komponen Anda)
const UserBeranda = () => <h1 className="text-2xl">Halaman Beranda User</h1>;
const UserStok = () => <h1 className="text-2xl">Halaman Stok User</h1>;
// ... (Tambahkan halaman user lainnya)

// Halaman Profile Admin (Placeholder - Ganti dengan komponen Anda)
const AdminProfile = () => <h1 className="text-3xl font-bold">Halaman Profile Admin</h1>;
// ... (Tambahkan halaman admin lainnya seperti Laporan, Pengguna, dll.)

function App() {
  return (
    <Routes>
      {/* Rute Publik (Login & Register) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Redirect dari / ke /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rute Admin (Dilindungi) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Halaman anak akan dirender di dalam <Outlet /> AdminLayout */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="batch-management" element={<BatchManagement />} />
        <Route path="barang-masuk" element={<BarangMasuk />} />
        <Route path="barang-keluar" element={<BarangKeluar />} />
        
        {/* Rute untuk Profile */}
        <Route path="profile" element={<AdminProfile />} />
        
        {/* Placeholder untuk rute admin lainnya dari sidebar */}
        {/* <Route path="laporan" element={<h1>Halaman Laporan Stok</h1>} /> */}
        {/* <Route path="pengguna" element={<h1>Halaman Manajemen Pengguna</h1>} /> */}
        {/* <Route path="riwayat" element={<h1>Halaman Riwayat Aktivitas</h1>} /> */}
        {/* <Route path="bantuan" element={<h1>Halaman Bantuan Admin</h1>} /> */}
      </Route>

      {/* Rute User (Dilindungi) */}
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        {/* Halaman anak akan dirender di dalam <Outlet /> UserLayout */}
        <Route index element={<Navigate to="beranda" replace />} />
        <Route path="beranda" element={<UserBeranda />} />
        <Route path="stok" element={<UserStok />} />
        
        {/* Placeholder untuk rute user lainnya dari Navbar.jsx */}
        {/* <Route path="barang-masuk" element={<h1>Catat Barang Masuk (User)</h1>} /> */}
        {/* <Route path="barang-keluar" element={<h1>Catat Barang Keluar (User)</h1>} /> */}
        {/* <Route path="riwayat" element={<h1>Halaman Riwayat (User)</h1>} /> */}
        {/* <Route path="bantuan" element={<h1>Halaman Bantuan (User)</h1>} /> */}
      </Route>

      {/* Rute 404 (Opsional - mengarahkan ke halaman utama jika tidak ditemukan) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;