import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowCircleUp } from 'react-icons/fa';
import CustomSelect from '../components/CustomSelect'; 

const BarangKeluar = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Dummy data untuk dropdown
  const productOptions = [
    { value: 'SKU-001', label: 'Somethinc Niacinamide Serum' },
    { value: 'SKU-002', label: 'Whitelab Brightening Day Cream' },
    { value: 'SKU-003', label: 'Azarine Hydrasoothe Sunscreen Gel' },
  ];

  // Dummy data batch yang tersedia (diubah formatnya)
  const batchOptions = [
    { value: 'B005', label: 'B005 (Sisa: 250 | Exp: 2024-10-15)' },
    { value: 'B001', label: 'B001 (Sisa: 150 | Exp: 2025-10-01)' },
  ];
  
  // Opsi untuk tujuan
  const tujuanOptions = [
    { value: 'Penjualan', label: 'Penjualan' },
    { value: 'Rusak', label: 'Rusak / Dibuang' },
    { value: 'Sampel Promosi', label: 'Sampel Promosi' },
    { value: 'Lainnya', label: 'Lainnya' },
  ];

  // Tambahkan state untuk semua select
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedTujuan, setSelectedTujuan] = useState('Penjualan');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produk:", selectedProduct, "Batch:", selectedBatch, "Tujuan:", selectedTujuan);
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
            <CustomSelect
              options={productOptions}
              value={selectedProduct}
              onChange={setSelectedProduct}
              placeholder="Pilih Produk"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Pilih Batch/Lot (FEFO - First Expired, First Out)
            </label>
            <CustomSelect
              options={batchOptions}
              value={selectedBatch}
              onChange={setSelectedBatch}
              placeholder="Pilih Batch yang Tersedia"
            />
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
            <CustomSelect
              options={tujuanOptions}
              value={selectedTujuan}
              onChange={setSelectedTujuan}
            />
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