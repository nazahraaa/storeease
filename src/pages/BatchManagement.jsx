// src/pages/BatchManagement.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

// Data dummy (tidak perlu diubah)
const batchData = [
  { id: 'B001', productName: 'Somethinc Niacinamide Serum', quantity: 150, entryDate: '2023-10-01', expiryDate: '2025-10-01' },
  { id: 'L002', productName: 'Whitelab Brightening Day Cream', quantity: 200, entryDate: '2023-10-05', expiryDate: '2025-10-05' },
  { id: 'B003', productName: 'Azarine Hydrasoothe Sunscreen Gel', quantity: 300, entryDate: '2023-10-10', expiryDate: '2026-04-10' },
  { id: 'L004', productName: 'Avoskin Miraculous Refining Toner', quantity: 120, entryDate: '2023-10-12', expiryDate: '2025-11-12' },
  { id: 'B005', productName: 'Scarlett Whitening Acne Serum', quantity: 250, entryDate: '2023-10-15', expiryDate: '2024-10-15' },
];

const BatchManagement = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    // --- PERUBAHAN DI SINI ---
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full" // Hapus class lain, cukup w-full
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manajemen Batch/Lot Number</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300"
        >
          <FaPlus className="mr-2" />
          Tambah Batch Baru
        </motion.button>
      </div>

      {/* Fitur Pencarian */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Cari berdasarkan ID Batch atau Nama Produk..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Tabel Data Batch */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">ID Batch/Lot</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Nama Produk</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Jumlah</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Tanggal Masuk</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Tanggal Kadaluarsa</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {batchData.map((batch, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{batch.id}</td>
                <td className="px-4 py-3 text-gray-700">{batch.productName}</td>
                <td className="px-4 py-3 text-gray-700">{batch.quantity}</td>
                <td className="px-4 py-3 text-gray-700">{batch.entryDate}</td>
                <td className="px-4 py-3 text-red-500 font-medium">{batch.expiryDate}</td>
                <td className="px-4 py-3 flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default BatchManagement;