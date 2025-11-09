// server/controllers/authController.js
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import 'dotenv/config';
import sendVerificationEmail from '../utils/sendEmail.js';

// Fungsi untuk membuat token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Fungsi untuk membuat kode OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit
};

/**
 * @desc    Mendaftarkan user baru (langkah 1: kirim OTP)
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nama, username, email, password } = req.body;

  try {
    let userExists = await User.findOne({ 
      $or: [{ email }, { username }], 
      isVerified: true 
    });

    if (userExists) {
      return res.status(400).json({ msg: 'Email atau Username sudah terdaftar' });
    }

    const code = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 menit

    const user = await User.findOneAndUpdate(
      { $or: [{ email }, { username }], isVerified: false },
      {
        nama,
        username,
        email,
        password,
        verificationCode: code,
        verificationCodeExpires: expires,
        isVerified: false,
      },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );

    await sendVerificationEmail(email, code);

    res.status(201).json({
      msg: `Registrasi berhasil. Kode verifikasi telah dikirim ke ${email}.`,
      email: user.email,
    });
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Email atau Username sudah terdaftar' });
    }
    res.status(500).send('Server error');
  }
};

/**
 * @desc    Verifikasi user (langkah 2 Registrasi)
 * @route   POST /api/auth/verify
 * @access  Public
 */
export const verifyUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, code } = req.body;

  try {
    const user = await User.findOne({ 
      email, 
      verificationCode: code,
      verificationCodeExpires: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(400).json({ msg: 'Kode verifikasi tidak valid atau telah kedaluwarsa' });
    }

    // Hanya untuk verifikasi registrasi
    if(user.isVerified) {
        return res.status(400).json({ msg: 'Akun sudah terverifikasi. Silakan login.' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    // Langsung berikan token setelah registrasi berhasil
    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        nama: user.nama,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * @desc    Kirim ulang kode verifikasi (untuk registrasi)
 * @route   POST /api/auth/resend-code
 * @access  Public
 */
export const resendCode = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'Email tidak terdaftar' });
    }
    if (user.isVerified) {
      return res.status(400).json({ msg: 'Akun ini sudah terverifikasi. Silakan login.' });
    }

    const code = generateOTP();
    user.verificationCode = code;
    user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 menit
    await user.save();

    await sendVerificationEmail(email, code);
    res.status(200).json({ msg: `Kode verifikasi baru telah dikirim ke ${email}` });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


/**
 * @desc    Login user (Langkah 1: Cek Password & Kirim OTP)
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { login, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email: login }, { username: login }] });

    if (!user) {
      return res.status(400).json({ msg: 'Kredensial tidak valid' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Kredensial tidak valid' });
    }

    // Cek jika akun belum teraktivasi (pertama kali)
    if (!user.isVerified) {
      return res.status(401).json({ 
        msg: 'Akun Anda belum terverifikasi. Silakan cek email Anda.',
        notVerified: true, // Flag untuk frontend
        email: user.email
      });
    }

    // --- ALUR 2SV ---
    // Jika user SUDAH terverifikasi, jangan kirim token.
    // Kirim OTP baru untuk login.
    const code = generateOTP();
    user.verificationCode = code;
    user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 menit
    await user.save();

    // Kirim email
    await sendVerificationEmail(user.email, code);

    // Kirim respons ke frontend untuk minta kode
    res.status(200).json({
      msg: 'Verifikasi 2 langkah diperlukan.',
      step: 'verifyLogin', // Flag baru untuk frontend
      email: user.email,
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * @desc    Verifikasi Login (Langkah 2: Cek OTP Login)
 * @route   POST /api/auth/verify-login
 * @access  Public
 */
export const verifyLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, code } = req.body;

  try {
    const user = await User.findOne({ 
      email, 
      verificationCode: code,
      verificationCodeExpires: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(400).json({ msg: 'Kode verifikasi tidak valid atau telah kedaluwarsa' });
    }

    // Kode sudah dipakai, hapus
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    // --- SUKSES ---
    // Buat token dan kirim ke client
    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        nama: user.nama,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};