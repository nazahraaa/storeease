import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * Komponen ini melindungi rute berdasarkan status login dan role.
 * @param {Array<string>} allowedRoles 
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // Pengecekan auth.user sangat penting di sini!
  if (!auth.isAuthenticated || !auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Kita sudah yakin auth.user ada dari pengecekan di atas
  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika lolos semua, tampilkan halaman yang dituju
  return children;
};

export default ProtectedRoute;