// src/pages/BarangKeluar.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowCircleUp } from 'react-icons/fa';

const BarangKeluar = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Dummy data untuk dropdown
  const products = [
    'Somethinc Niacinamide Serum',
    'Whitelab Brightening Day Cream',
    'Azarine Hydrasoothe Sunscreen Gel',
  ];

  // Dummy data batch yang tersedia untuk produk yang dipilih
  const availableBatches = [
    { id: 'B005', stock: 250, expiry: '2024-10-15' }, // Akan kadaluarsa duluan
    { id: 'B001', stock: 150, expiry: '2025-10-01' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini logika untuk validasi (jumlah keluar <= stok batch), 
    // mengirim data ke backend, dan mengurangi stok
    alert('Logika penyimpanan data akan diimplementasikan di sini.');
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Catat Barang Keluar</h1>

      <motion.div
        className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Pilih Produk</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>-- Pilih Produk --</option>
              {products.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Pilih Batch/Lot (FEFO - First Expired, First Out)
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>-- Pilih Batch yang Tersedia --</option>
              {/* Sistem merekomendasikan batch dengan tanggal kadaluarsa terdekat */}
              {availableBatches.map(b => (
                <option key={b.id} value={b.id}>
                  {`${b.id} (Sisa: ${b.stock} | Exp: ${b.expiry})`}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">Batch diurutkan berdasarkan tanggal kadaluarsa terdekat.</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Jumlah Keluar</label>
            <input
              type="number"
              placeholder="Masukkan jumlah yang keluar"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Tujuan</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="Penjualan">Penjualan</option>
              <option value="Rusak">Rusak / Dibuang</option>
              <option value="Sampel Promosi">Sampel Promosi</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex items-center justify-center bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300"
            >
              <FaArrowCircleUp className="mr-2" />
              Catat Barang Keluar
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BarangKeluar;