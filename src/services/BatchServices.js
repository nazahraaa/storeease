// src/services/BatchServices.js

// Alamat API backend Anda
const API_URL = 'http://localhost:5001/api/batch';

// Fungsi helper untuk mendapatkan token dari localStorage
const getToken = () => {
  return localStorage.getItem('userToken');
};

/**
 * Mendapatkan semua data batch, dengan filter.
 * @param {string} search - Kata kunci pencarian
 * @param {string} status - Filter status
 */
const getAll = async (search = '', status = 'Semua') => {
  const token = getToken();
  
  // Membangun query string
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (status !== 'Semua') params.append('status', status);
  
  const response = await fetch(`${API_URL}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || 'Gagal mengambil data batch');
  }
  return response.json();
};

/**
 * Membuat batch baru
 * @param {Object} batchData - Data dari form modal
 */
const create = async (batchData) => {
  const token = getToken();
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(batchData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || data.errors?.[0]?.msg || 'Gagal membuat batch');
  }
  return response.json();
};

/**
 * Mengupdate data batch
 * @param {string} id - ID batch (dari MongoDB)
 * @param {Object} batchData - Data dari form modal
 */
const update = async (id, batchData) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(batchData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || data.errors?.[0]?.msg || 'Gagal mengupdate batch');
  }
  return response.json();
};

/**
 * Menghapus batch
 * @param {string} id - ID batch (dari MongoDB)
 */
const remove = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.msg || 'Gagal menghapus batch');
  }
  return response.json();
};

const BatchServices = {
  getAll,
  create,
  update,
  remove, // 'delete' adalah reserved keyword
};

export default BatchServices;