// src/pages/LaporanStok.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaFileCsv, FaFilePdf, FaSearch } from 'react-icons/fa';

// Data dummy untuk laporan stok. Nantinya, data ini akan diambil dari database.
const stockData = [
  { id: 'SKU-001', name: 'Somethinc Niacinamide Serum', category: 'Serum Wajah', stock: 150, status: 'Tersedia' },
  { id: 'SKU-002', name: 'Whitelab Brightening Day Cream', category: 'Pelembab', stock: 200, status: 'Tersedia' },
  { id: 'SKU-003', name: 'Azarine Hydrasoothe Sunscreen Gel', category: 'Sunscreen', stock: 25, status: 'Hampir Habis' },
  { id: 'SKU-004', name: 'Avoskin Miraculous Refining Toner', category: 'Toner', stock: 0, status: 'Habis' },
  { id: 'SKU-005', name: 'Scarlett Whitening Acne Serum', category: 'Serum Wajah', stock: 250, status: 'Tersedia' },
  { id: 'SKU-006', name: 'Garnier Micellar Water Pink', category: 'Pembersih', stock: 210, status: 'Tersedia' },
  { id: 'SKU-007', name: 'Wardah Lightening Day Gel', category: 'Pelembab', stock: 180, status: 'Tersedia' },
  { id: 'SKU-008', name: 'Emina Bright Stuff Face Wash', category: 'Pembersih', stock: 15, status: 'Hampir Habis' },
  { id: 'SKU-009', name: 'MS Glow Whitening Night Cream', category: 'Pelembab', stock: 130, status: 'Tersedia' },
  { id: 'SKU-010', name: 'Ponds Magic Powder BB', category: 'Bedak', stock: 300, status: 'Tersedia' },
];

const LaporanStok = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Tersedia':
        return 'bg-green-100 text-green-800';
      case 'Hampir Habis':
        return 'bg-yellow-100 text-yellow-800';
      case 'Habis':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Laporan Stok Produk</h1>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
          >
            <FaFileCsv className="mr-2" />
            Ekspor CSV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
          >
            <FaFilePdf className="mr-2" />
            Ekspor PDF
          </motion.button>
        </div>
      </div>

      {/* Filter dan Pencarian */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Cari produk berdasarkan nama atau SKU..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">Semua Status</option>
          <option value="Tersedia">Tersedia</option>
          <option value="Hampir Habis">Hampir Habis</option>
          <option value="Habis">Habis</option>
        </select>
      </div>

      {/* Tabel Laporan Stok */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">SKU</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Nama Produk</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Kategori</th>
              <th className="px-4 py-2 text-center text-gray-600 font-semibold">Jumlah Stok</th>
              <th className="px-4 py-2 text-center text-gray-600 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700 font-medium">{item.id}</td>
                <td className="px-4 py-3 text-gray-700">{item.name}</td>
                <td className="px-4 py-3 text-gray-700">{item.category}</td>
                <td className="px-4 py-3 text-gray-700 text-center font-semibold">{item.stock}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default LaporanStok;