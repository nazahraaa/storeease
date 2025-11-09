// src/components/auth/LoginForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';
import InputField from '../InputField';
import AuthServices from '../../services/AuthServices';
import useAuth from '../../hooks/useAuth'; // <-- IMPORT HOOK

const LoginForm = () => {
  const [loginInput, setLoginInput] = useState(''); // State untuk username/email
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- GUNAKAN CONTEXT

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await AuthServices.login(loginInput, password);
      
      // 1. Simpan data ke Context (dan localStorage)
      login(data);
      
      // 2. Arahkan berdasarkan role
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        // Asumsi user biasa diarahkan ke beranda user
        navigate('/user/beranda', { replace: true }); 
      }

    } catch (err) {
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
        placeholder="Username atau Email"
        value={loginInput}
        onChange={(e) => setLoginInput(e.target.value)}
      />
      <InputField
        icon={<FaLock />}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-3 mt-4 bg-primary text-light font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-300 transform disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Login'}
      </motion.button>
    </form>
  );
};

export default LoginForm;