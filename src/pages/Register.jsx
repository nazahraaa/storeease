// src/pages/Register.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm'; // Import form baru

const Register = () => {
  return (
    <AuthLayout title="Buat Akun Baru Anda">
      {/* Panggil komponen form di sini */}
      <RegisterForm />
      
      <p className="text-center text-gray-500 mt-6">
        Sudah punya akun?{' '}
        <Link to="/" className="text-primary font-semibold hover:underline">
          Login di sini
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;