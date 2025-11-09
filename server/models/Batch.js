// server/models/Batch.js
import mongoose from 'mongoose';

const BatchSchema = new mongoose.Schema({
  // --- Info Utama ---
  batchId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  productName: {
    type: String,
    required: [true, 'Nama Produk wajib diisi'],
  },
  productSKU: {
    type: String,
    required: [true, 'SKU Produk wajib diisi'],
  },
  // --- Info Tambahan Produk (BARU) ---
  category: {
    type: String,
    default: 'Lainnya',
  },
  unit: {
    type: String, // 'pcs', 'botol', 'gram', 'tube'
    default: 'pcs',
  },

  // --- Info Stok & Tanggal ---
  quantity: {
    type: Number,
    required: [true, 'Jumlah wajib diisi'],
    min: [0, 'Jumlah tidak boleh negatif'],
    default: 0,
  },
  productionDate: { // (BARU)
    type: Date,
  },
  entryDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: [true, 'Tanggal kadaluarsa wajib diisi'],
  },

  // --- Info Gudang & Lain-lain (BARU) ---
  location: { // (BARU)
    type: String, // 'Rak A1', 'Gudang 2'
    trim: true,
  },
  supplier: {
    type: String,
    trim: true,
  },
  notes: { // (BARU)
    type: String,
    trim: true,
  },
  
  // --- Info Status ---
  manualStatus: {
    type: String,
    enum: ['Tersedia', 'Karantina', 'Rusak', 'Ditarik'],
    default: 'Tersedia',
  },
  systemStatus: {
    type: String,
    enum: ['Aktif', 'Stok Menipis', 'Segera Kadaluarsa', 'Kadaluarsa', 'Habis'],
    default: 'Aktif',
  },

  // --- Info Audit (BARU) ---
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true, // Anda bisa membuatnya wajib jika mau
  },

}, { timestamps: true }); // 'timestamps: true' otomatis menambahkan 'createdAt' (Tanggal Input)

// Hook ini (sudah ada) menangani 'Status Otomatis Berdasarkan Kadaluarsa'
BatchSchema.pre('save', function (next) {
  // 'this' merujuk ke dokumen batch yang akan disimpan
  
  // 1. Cek Kuantitas
  if (this.quantity === 0) {
    this.systemStatus = 'Habis';
  } 
  // 2. Cek Tanggal Kadaluarsa
  else if (new Date(this.expiryDate) < new Date()) {
    this.systemStatus = 'Kadaluarsa';
  } 
  // 3. Cek Jarak Kadaluarsa & Kuantitas
  else {
    const today = new Date();
    const expDate = new Date(this.expiryDate);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 180) { // 6 bulan
      this.systemStatus = 'Segera Kadaluarsa';
    } else if (this.quantity < 20) { // Anggapan stok menipis < 20
      this.systemStatus = 'Stok Menipis';
    } else {
      this.systemStatus = 'Aktif';
    }
  }
  
  // 4. Set Status Manual default
  if (this.isNew) { // Hanya saat dokumen baru
    if (this.systemStatus === 'Kadaluarsa' || this.systemStatus === 'Habis') {
      this.manualStatus = 'Rusak'; // atau status lain yang sesuai
    } else {
      this.manualStatus = 'Tersedia'; // Status Awal Otomatis
    }
  }
  
  next();
});

export default mongoose.model('Batch', BatchSchema);