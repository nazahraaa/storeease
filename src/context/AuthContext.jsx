// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Buat Context
const AuthContext = createContext();

// 2. Buat Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true); // Untuk cek auth saat load
  const navigate = useNavigate();

  useEffect(() => {
    // Cek localStorage saat aplikasi pertama kali dimuat
    try {
      const token = localStorage.getItem('userToken');
      const user = JSON.parse(localStorage.getItem('userData'));
      
      if (token && user) {
        setAuth({
          token,
          user,
          isAuthenticated: true,
        });
      }
    } catch (e) {
      console.error("Gagal mem-parse data auth dari localStorage", e);
      // Jika data korup, hapus
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
    }
    setIsLoading(false);
  }, []);

  // Fungsi untuk login
  const login = (data) => {
    const { token, user } = data;
    localStorage.setItem('userToken', token);
    localStorage.setItem('userData', JSON.stringify(user));
    setAuth({
      token,
      user,
      isAuthenticated: true,
    });
  };

  // Fungsi untuk logout
  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setAuth({
      token: null,
      user: null,
      isAuthenticated: false,
    });
    // Arahkan paksa ke login
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isLoading }}>
      {!isLoading && children} {/* Hanya render anak jika loading selesai */}
    </AuthContext.Provider>
  );
};

export default AuthContext;