// server/server.js
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import batchRoutes from './routes/batch.js'; // <-- TAMBAHKAN INI

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Definisi Rute
app.get('/', (req, res) => {
  res.send('StoreEase API is running...');
});

// Gunakan Rute Autentikasi
app.use('/api/auth', authRoutes);

// Gunakan Rute Batch
app.use('/api/batch', batchRoutes); // <-- TAMBAHKAN INI

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});