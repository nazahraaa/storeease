// src/components/auth/LoginForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaShieldAlt } from 'react-icons/fa';
import InputField from '../ui/InputField';
import AuthServices from '../../services/AuthServices';
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [emailForVerify, setEmailForVerify] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [step, setStep] = useState('login'); 
  
  const navigate = useNavigate();
  const { login: authContextLogin } = useAuth();

  // --- Handle Submit Login (Langkah 1) ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await AuthServices.login(loginInput, password);
      
      if (data.step === 'verifyLogin') {
        setMessage(data.msg || 'Kode verifikasi telah dikirim.');
        setEmailForVerify(data.email);
        setStep('verifyLogin');
      }

    } catch (err) {
      if (err.notVerified) {
        setError(err.message);
        setEmailForVerify(err.email);
        setStep('verifyRegister');
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Kita buat fungsi ini untuk menghindari duplikasi kode
  const navigateUser = (data) => {
    if (data?.user?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    } else {
      navigate('/user/beranda', { replace: true }); 
    }
  };

  // --- Handle Submit Verifikasi Login (Langkah 2 Login) ---
  const handleVerifyLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await AuthServices.verifyLogin(emailForVerify, code);
      authContextLogin(data);
      
      navigateUser(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handle Submit Verifikasi Registrasi (Langkah 2 Registrasi) ---
  const handleVerifyRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const data = await AuthServices.verify(emailForVerify, code);
      authContextLogin(data);
      
      navigateUser(data);

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
      let data;
      if (step === 'verifyRegister') {
        data = await AuthServices.resend(emailForVerify);
      } else if (step === 'verifyLogin') {
        data = await AuthServices.login(emailForVerify, password);
      }
      setMessage(data.msg || "Kode baru telah dikirim.");
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


  // --- Tampilan Form Login (Step 1) ---
  if (step === 'login') {
    return (
      <form onSubmit={handleLoginSubmit}>
        {renderAlert()}
        <InputField
          icon={<FaUser />}
          type="text"
          placeholder="Username atau Email"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
        />
        <InputField
          icon={<FaLock />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-4 bg-primary text-light font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-300 transform disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </motion.button>
      </form>
    );
  }

  // --- Tampilan Form Verifikasi (Step 2) ---
  const isVerifyLogin = step === 'verifyLogin';
  const formTitle = isVerifyLogin ? "Verifikasi Login" : "Aktivasi Akun";
  const formSubtitle = `Silakan masukkan kode 6 digit yang dikirim ke ${emailForVerify}.`;
  const handleSubmit = isVerifyLogin ? handleVerifyLoginSubmit : handleVerifyRegisterSubmit;

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold text-center mb-2 text-gray-700">{formTitle}</h3>
      {renderAlert()}
      <p className="text-center text-gray-600 mb-4">{formSubtitle}</p>
      
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

      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isLoading}
          className="text-sm text-primary font-semibold hover:underline disabled:opacity-50"
        >
          {isLoading ? 'Mengirim...' : 'Kirim Ulang Kode'}
        </button>
        <button
          type="button"
          onClick={() => { 
            setStep('login'); 
            setError(null); 
            setMessage(null); 
            setCode(''); 
          }}
          disabled={isLoading}
          className="text-sm text-gray-500 hover:underline disabled:opacity-50"
        >
          Kembali ke Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;  