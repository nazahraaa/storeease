// src/components/auth/ProtectedRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * Komponen ini melindungi rute berdasarkan status login dan role.
 * @param {Array<string>} allowedRoles - Daftar role yang diizinkan (e.g., ['admin', 'user'])
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // 1. Cek apakah sudah login DAN auth.user sudah ada
  // Pengecekan auth.user sangat penting di sini!
  if (!auth.isAuthenticated || !auth.user) {
    // Redirect ke login, simpan lokasi asal agar bisa kembali
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Cek apakah role-nya diizinkan
  // Kita sudah yakin auth.user ada dari pengecekan di atas
  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    // Jika role tidak cocok (misal 'user' coba akses '/admin')
    // Arahkan ke halaman "Unauthorized" (atau kembali ke login)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Jika lolos semua, tampilkan halaman yang dituju
  return children;
};

export default ProtectedRoute;