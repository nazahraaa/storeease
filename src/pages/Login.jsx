// src/pages/Login.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout'; // <-- PATH DIPERBARUI
import LoginForm from '../components/auth/LoginForm'; 

const Login = () => {
  return (
    <AuthLayout title="Selamat Datang Kembali!">
      <LoginForm />
      <p className="text-center text-gray-500 mt-6">
        Belum punya akun?{' '}
        <Link to="/register" className="text-primary font-semibold hover:underline">
          Daftar di sini
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;