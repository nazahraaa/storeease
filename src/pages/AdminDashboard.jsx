import React from 'react';
import { motion } from 'framer-motion';
import { FaBoxOpen, FaUsers, FaDollarSign, FaShoppingCart, FaPlus, FaFileAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data dummy untuk grafik
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

// Data dummy untuk produk terlaris
const topProducts = [
  { name: 'Serum Wajah', sold: 120 },
  { name: 'Krim Pelembab', sold: 98 },
  { name: 'Sunscreen SPF 50', sold: 85 },
  { name: 'Toner Pencerah', sold: 72 },
];

const AdminDashboard = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Metrik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard icon={<FaBoxOpen />} title="Total Produk" value="1,250" variant={cardVariants} />
        <MetricCard icon={<FaUsers />} title="Total Pengguna" value="850" variant={cardVariants} />
        <MetricCard icon={<FaDollarSign />} title="Pendapatan (Bulan Ini)" value="$12,345" variant={cardVariants} />
        <MetricCard icon={<FaShoppingCart />} title="Pesanan Baru" value="75" variant={cardVariants} />
      </div>

      {/* Tombol Aksi Cepat */}
      <div className="flex space-x-4 mb-8">
          <QuickActionButton icon={<FaPlus />} text="Tambah Produk"/>
          <QuickActionButton icon={<FaFileAlt />} text="Lihat Laporan"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Grafik Penjualan */}
        <motion.div variants={cardVariants} className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Tren Penjualan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#FF69B4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Produk Terlaris */}
        <motion.div variants={cardVariants} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Produk Terlaris</h2>
          <ul>
            {topProducts.map((product, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span className="text-gray-600">{product.name}</span>
                <span className="font-semibold text-primary">{product.sold} Terjual</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Komponen Kartu Metrik
const MetricCard = ({ icon, title, value, variant }) => (
  <motion.div
    variants={variant}
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"
  >
    <div className="bg-pink-100 text-primary p-4 rounded-full text-2xl">
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </motion.div>
);

// Komponen Tombol Aksi Cepat
const QuickActionButton = ({ icon, text }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300"
    >
      <span className="mr-2">{icon}</span>
      {text}
    </motion.button>
  );

export default AdminDashboard;