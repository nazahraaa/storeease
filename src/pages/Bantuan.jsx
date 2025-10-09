// src/pages/Bantuan.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaEnvelope, FaPhone } from 'react-icons/fa';

// Data untuk FAQ
const faqData = [
  {
    question: 'Apa itu Manajemen Batch/Lot Number?',
    answer: 'Manajemen Batch/Lot Number adalah fitur untuk melacak kelompok produk yang masuk bersamaan. Setiap batch memiliki ID unik, jumlah stok, tanggal masuk, dan yang terpenting, tanggal kadaluarsa. Ini membantu Anda mengontrol kualitas dan menerapkan sistem FEFO (First Expired, First Out).',
  },
  {
    question: 'Bagaimana cara menambahkan produk baru?',
    answer: 'Untuk menambahkan produk baru, Anda harus masuk sebagai Admin, kemudian pergi ke menu "Manajemen Produk" (fitur yang akan datang) dan klik tombol "Tambah Produk". Isi semua detail yang diperlukan seperti nama, SKU, kategori, dan deskripsi.',
  },
  {
    question: 'Apa yang dimaksud dengan FEFO (First Expired, First Out)?',
    answer: 'FEFO adalah singkatan dari First Expired, First Out. Ini adalah prinsip manajemen inventaris di mana barang dengan tanggal kadaluarsa terdekat harus dijual atau digunakan terlebih dahulu. Halaman "Barang Keluar" kami secara otomatis merekomendasikan batch berdasarkan prinsip ini.',
  },
  {
    question: 'Bagaimana cara mengubah role seorang pengguna?',
    answer: 'Hanya Admin yang dapat mengubah role pengguna. Pergi ke halaman "Manajemen Pengguna", cari pengguna yang ingin diubah, klik ikon "Edit", lalu ubah rolenya dari dropdown yang tersedia dan simpan perubahan.',
  },
];

// Komponen Accordion Item
const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-gray-500" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Bantuan = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Pusat Bantuan</h1>
      <p className="text-center text-gray-500 mb-10">
        Temukan jawaban untuk pertanyaan yang sering diajukan di bawah ini.
      </p>

      {/* Accordion FAQ */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        {faqData.map((faq, index) => (
          <AccordionItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      {/* Hubungi Kami */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tidak menemukan jawaban?</h2>
        <p className="text-gray-600 mb-6">
          Tim kami siap membantu Anda. Hubungi kami melalui salah satu cara di bawah ini.
        </p>
        <div className="flex justify-center items-center space-x-8">
          <motion.a 
            href="mailto:support@storeease.com" 
            className="flex items-center text-primary hover:underline"
            whileHover={{ scale: 1.05 }}
          >
            <FaEnvelope className="mr-2" /> support@storeease.com
          </motion.a>
          <motion.div 
            className="flex items-center text-primary"
            whileHover={{ scale: 1.05 }}
          >
            <FaPhone className="mr-2" /> (021) 123-4567
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Bantuan;