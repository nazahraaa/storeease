// src/services/AuthServices.js

// URL backend Anda. Pastikan server backend Anda berjalan di port 5001.
const API_URL = 'http://localhost:5001/api/auth';

/**
 * Mengirim data registrasi ke server
 * @param {object} userData - Data user (nama, username, email, password, konfirmasiPassword)
 */
const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    // Jika ada error dari server (validasi, dll.)
    // Kita ambil pesan error, jika tidak ada, beri pesan default
    const message = data.msg || data.errors?.[0]?.msg || 'Registrasi gagal';
    throw new Error(message);
  }

  // Registrasi berhasil, 'data' berisi token dan info user
  // Kita bisa simpan token di sini jika mau, tapi untuk sekarang kita kembalikan saja
  return data;
};

/**
 * Mengirim data login ke server
 * @param {string} login - Bisa berupa username atau email
 * @param {string} password - Password user
 */
const login = async (login, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data.msg || 'Login gagal. Cek kembali kredensial Anda.';
    throw new Error(message);
  }

  // Login berhasil, 'data' berisi token dan info user
  if (data.token) {
    // Simpan token ke localStorage agar user tetap login
    localStorage.setItem('userToken', data.token);
  }

  return data;
};

// Fungsi untuk logout
const logout = () => {
  localStorage.removeItem('userToken');
  // Anda bisa tambahkan logic lain di sini, seperti redirect ke halaman login
};

const AuthServices = {
  register,
  login,
  logout,
};

export default AuthServices;