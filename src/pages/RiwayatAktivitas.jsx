// src/pages/RiwayatAktivitas.jsx

import React from 'react';
import { motion } from 'framer-motion';
// PERBAIKAN DI BARIS INI: Menambahkan FaArrowCircleDown
import { FaSearch, FaUserCircle, FaPlusCircle, FaArrowCircleUp, FaArrowCircleDown, FaEdit, FaTrash } from 'react-icons/fa';

// Data dummy untuk riwayat aktivitas
const activityLog = [
  { id: 1, user: 'nana', action: 'menambahkan batch baru', item: 'B006 - Nivea Sun Protect', time: '2 jam yang lalu', icon: <FaPlusCircle />, color: 'green' },
  { id: 2, user: 'gudang_admin', action: 'mencatat barang keluar', item: '20 pcs - Scarlett Whitening Acne Serum (Batch B005)', time: '5 jam yang lalu', icon: <FaArrowCircleUp />, color: 'red' },
  { id: 3, user: 'nana', action: 'mengubah data pengguna', item: 'aisyah', time: '1 hari yang lalu', icon: <FaEdit />, color: 'blue' },
  { id: 4, user: 'pengguna_baru', action: 'mencatat barang masuk', item: '100 pcs - Hanasui Serum Vitamin C (Batch L009)', time: '2 hari yang lalu', icon: <FaArrowCircleDown />, color: 'green' },
  { id: 5, user: 'nana', action: 'menghapus batch', item: 'B002 - Produk Lama', time: '3 hari yang lalu', icon: <FaTrash />, color: 'gray' },
  { id: 6, user: 'gudang_admin', action: 'mencatat barang keluar', item: '50 pcs - Azarine Sunscreen (Batch B003)', time: '4 hari yang lalu', icon: <FaArrowCircleUp />, color: 'red' },
];

const RiwayatAktivitas = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getIconColor = (color) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'red': return 'bg-red-500';
      case 'blue': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Riwayat Aktivitas</h1>

      {/* Filter dan Pencarian */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Cari berdasarkan pengguna atau aktivitas..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Timeline Aktivitas */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="relative border-l-2 border-gray-200 ml-3">
          {activityLog.map((log, index) => (
            <motion.div
              key={log.id}
              className="mb-8 ml-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className={`absolute -left-4 flex items-center justify-center w-8 h-8 ${getIconColor(log.color)} rounded-full text-white`}>
                {log.icon}
              </span>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-800">
                    <FaUserCircle className="inline mr-2" />
                    {log.user}
                  </p>
                  <time className="text-xs font-normal text-gray-500">{log.time}</time>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">{log.action}</span>: {log.item}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RiwayatAktivitas;