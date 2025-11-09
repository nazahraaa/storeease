import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaShieldAlt } from 'react-icons/fa';
import InputField from '../InputField';
import AuthServices from '../../services/AuthServices';
import useAuth from '../../hooks/useAuth';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    email: '',
    password: '',
    konfirmasiPassword: '',
  });
  const [code, setCode] = useState('');
  const [step, setStep] = useState('register'); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); 
  
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const { nama, username, email, password, konfirmasiPassword } = formData;

  const handleChange = (e) => {
    const fieldNameMap = {
      "Nama Lengkap": "nama",
      "Username": "username",
      "Email": "email",
      "Password": "password",
      "Konfirmasi Password": "konfirmasiPassword"
    };
    const fieldName = fieldNameMap[e.target.placeholder];
    if (fieldName) {
       setFormData({ ...formData, [fieldName]: e.target.value });
    }
  };

  // --- Handle Submit Registrasi ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== konfirmasiPassword) {
      setError('Konfirmasi password tidak cocok');
      return;
    }

    setIsLoading(true);

    try {
      const data = await AuthServices.register({ nama, username, email, password, konfirmasiPassword });
      setMessage(data.msg);
      setStep('verify');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handle Submit Verifikasi ---
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await AuthServices.verify(email, code);
      login(data);
      
      // Cek 'data.user' sebelum cek 'data.user.role'
      if (data?.user?.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/user/beranda', { replace: true }); 
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handle Kirim Ulang Kode ---
  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    try {
      const data = await AuthServices.resend(email);
      setMessage(data.msg);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Alert ---
  const renderAlert = () => {
    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      );
    }
    if (message) {
      return (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{message}</span>
        </div>
      );
    }
    return null;
  };

  // --- Tampilan Form Registrasi ---
  if (step === 'register') {
    return (
      <form onSubmit={handleRegisterSubmit}>
        {renderAlert()}
        <InputField
          icon={<FaUser />}
          type="text"
          placeholder="Nama Lengkap"
          value={nama}
          onChange={handleChange}
        />
        <InputField
          icon={<FaUser />}
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleChange}
        />
        <InputField
          icon={<FaEnvelope />}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <InputField
          icon={<FaLock />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <InputField
          icon={<FaLock />}
          type="password"
          placeholder="Konfirmasi Password"
          value={konfirmasiPassword}
          onChange={handleChange}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-4 bg-primary text-light font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-300 transform disabled:opacity-50"
        >
          {isLoading ? 'Mendaftar...' : 'Register'}
        </motion.button>
      </form>
    );
  }

  // --- Tampilan Form Verifikasi ---
  return (
    <form onSubmit={handleVerifySubmit}>
      {renderAlert()}
      <p className="text-center text-gray-600 mb-4">
        Silakan cek email di <strong>{email}</strong> untuk kode verifikasi 6 digit.
      </p>
      <InputField
        icon={<FaShieldAlt />}
        type="text"
        placeholder="Kode Verifikasi (6 digit)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-3 mt-4 bg-primary text-light font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-300 transform disabled:opacity-50"
      >
        {isLoading ? 'Memverifikasi...' : 'Verifikasi & Lanjutkan'}
      </motion.button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isLoading}
          className="text-sm text-primary font-semibold hover:underline disabled:opacity-50"
        >
          {isLoading ? 'Mengirim...' : 'Kirim Ulang Kode'}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;