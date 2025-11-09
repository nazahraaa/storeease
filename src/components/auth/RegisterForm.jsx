// src/components/auth/RegisterForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import InputField from '../InputField';
import AuthServices from '../../services/AuthServices';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    email: '',
    password: '',
    konfirmasiPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { nama, username, email, password, konfirmasiPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.placeholder.toLowerCase().replace(' ', '')]: e.target.value });
    
    // Perbaikan: Ganti cara Anda mengambil key
    const fieldNameMap = {
      "Nama Lengkap": "nama",
      "Username": "username",
      "Email": "email",
      "Password": "password",
      "Konfirmasi Password": "konfirmasiPassword"
    };
    const fieldName = fieldNameMap[e.target.placeholder];
    if (fieldName) {
       setFormData({ ...formData, [fieldName]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== konfirmasiPassword) {
      setError('Konfirmasi password tidak cocok');
      setIsLoading(false);
      return;
    }

    try {
      await AuthServices.register({ nama, username, email, password, konfirmasiPassword });
      
      // Jika berhasil, arahkan ke halaman login
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');

    } catch (err) {
      // Menampilkan error dari server
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <InputField
        icon={<FaUser />}
        type="text"
        placeholder="Nama Lengkap"
        value={nama}
        onChange={handleChange}
      />
      <InputField
        icon={<FaUser />}
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleChange}
      />
      <InputField
        icon={<FaEnvelope />}
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
      />
      <InputField
        icon={<FaLock />}
        type="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
      />
      <InputField
        icon={<FaLock />}
        type="password"
        placeholder="Konfirmasi Password"
        value={konfirmasiPassword}
        onChange={handleChange}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-3 mt-4 bg-primary text-light font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-300 transform disabled:opacity-50"
      >
        {isLoading ? 'Mendaftar...' : 'Register'}
      </motion.button>
    </form>
  );
};

export default RegisterForm;