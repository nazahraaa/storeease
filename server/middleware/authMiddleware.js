// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import 'dotenv/config';

export const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Dapatkan token from header
      token = req.headers.authorization.split(' ')[1];

      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Dapatkan user dari token
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
         return res.status(401).json({ msg: 'Tidak ada user, token gagal' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ msg: 'Tidak terotorisasi, token gagal' });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'Tidak terotorisasi, tidak ada token' });
  }
};

// Middleware untuk membatasi akses hanya ke admin
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Akses ditolak, khusus admin' });
  }
};