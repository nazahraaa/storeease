// src/services/AuthServices.js

const API_URL = 'http://localhost:5001/api/auth';

/**
 * (Registrasi Langkah 1)
 */
const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    const message = data.msg || data.errors?.[0]?.msg || 'Registrasi gagal';
    throw new Error(message);
  }
  return data;
};

/**
 * (Registrasi Langkah 2) Verifikasi akun baru
 */
const verify = async (email, code) => {
  const response = await fetch(`${API_URL}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });
  const data = await response.json();
  if (!response.ok) {
    const message = data.msg || data.errors?.[0]?.msg || 'Verifikasi gagal';
    throw new Error(message);
  }
  if (data.token) {
    localStorage.setItem('userToken', data.token);
  }
  return data;
};

/**
 * (Registrasi) Kirim ulang kode aktivasi
 */
const resend = async (email) => {
  const response = await fetch(`${API_URL}/resend-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (!response.ok) {
    const message = data.msg || data.errors?.[0]?.msg || 'Gagal mengirim ulang kode';
    throw new Error(message);
  }
  return data;
};

/**
 * (Login Langkah 1) Cek password & kirim OTP
 */
const login = async (login, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data.msg || 'Login gagal.';
    const error = new Error(message);
    if (data.notVerified) {
      error.notVerified = true;
      error.email = data.email; 
    }
    throw error;
  }

  // Login (langkah 1) berhasil, 'data' berisi flag { step: 'verifyLogin', email: ... }
  // BUKAN token.
  return data;
};

/**
 * (Login Langkah 2) Verifikasi OTP login
 */
const verifyLogin = async (email, code) => {
  const response = await fetch(`${API_URL}/verify-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data.msg || data.errors?.[0]?.msg || 'Verifikasi login gagal';
    throw new Error(message);
  }

  // Verifikasi login berhasil, 'data' berisi token
  if (data.token) {
    localStorage.setItem('userToken', data.token);
  }
  return data;
};

// Fungsi untuk logout
const logout = () => {
  localStorage.removeItem('userToken');
};

const AuthServices = {
  register,
  verify,
  resend,
  login,
  verifyLogin, // <-- FUNGSI BARU
  logout,
};

export default AuthServices;