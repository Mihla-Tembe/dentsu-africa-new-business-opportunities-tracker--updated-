import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, ShieldCheck, HelpCircle } from 'lucide-react';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

interface LoginPageProps {
  onSupport: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSupport }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [authErrorCode, setAuthErrorCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthErrorCode('');
    setResetMessage('');
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const code = error?.code || 'auth/unknown';
      setAuthErrorCode(code);
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setAuthError('Invalid email or password.');
      } else if (code === 'auth/invalid-email') {
        setAuthError('Invalid email format.');
      } else if (code === 'auth/operation-not-allowed') {
        setAuthError('Email/password sign-in is not enabled for this Firebase project.');
      } else if (code === 'auth/user-disabled') {
        setAuthError('This user account is disabled.');
      } else if (code === 'auth/too-many-requests') {
        setAuthError('Too many attempts. Please wait a bit and try again.');
      } else if (code === 'auth/network-request-failed') {
        setAuthError('Network error. Check your connection and try again.');
      } else {
        setAuthError('Authentication failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    setAuthError('');
    setResetMessage('');

    if (!email.trim()) {
      setAuthError('Enter your email to reset your password.');
      return;
    }

    setIsResettingPassword(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage('Password reset email sent. Check your inbox.');
    } catch (error: any) {
      const code = error?.code || 'auth/unknown';
      if (code === 'auth/invalid-email') {
        setAuthError('Invalid email format.');
      } else if (code === 'auth/user-not-found') {
        setAuthError('No account found for this email.');
      } else {
        setAuthError('Could not send reset email. Please try again.');
      }
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row items-stretch justify-center relative overflow-y-auto">
      <div
        className="flex-1 flex flex-col items-center justify-center p-6 pt-0 md:p-10 lg:p-24 relative overflow-hidden bg-black border-r border-white/5"
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#E82429] opacity-10 blur-[120px] rounded-full"></div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
            className="z-10 h-16 flex items-center justify-center"
        >
              <h1
                className="font-black text-white tracking-tighter uppercase"
                style={{ fontSize: 'clamp(1rem, 3.8vw, 2.25rem)' }}
              >
                dentsu Africa
              </h1>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center items-center py-0 text-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="z-10"
          >
            <div className="space-y-0 leading-none">
              <h2
                className="font-black uppercase tracking-tighter text-transparent"
                style={{
                  fontSize: 'clamp(1.4rem, 6vw, 4.5rem)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                }}
              >
                Born in Japan
              </h2>
              <h2
                className="font-black uppercase tracking-tighter text-white"
                style={{ fontSize: 'clamp(1.4rem, 6vw, 4.5rem)' }}
              >
                Raised in Africa
              </h2>
            </div>
            <p className="text-base md:text-2xl text-gray-400 font-light mt-4 tracking-tight max-w-md">
              We shape brands for Africa&apos;s future through precision data and cultural intelligence.
            </p>
          </motion.div>
        </div>

        <div className="z-10 h-16 flex items-center justify-center space-x-6 border-t border-white/10">
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-600">
            Dentsu DAM Platform 2.5
          </p>
          <button
            onClick={onSupport}
            className="flex items-center space-x-2 text-gray-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            <HelpCircle size={14} />
            <span>Support</span>
          </button>
        </div>
      </div>

      <div
        className="lg:w-[600px] bg-white flex flex-col items-center justify-center p-6 pt-0 md:p-10 lg:p-24 z-10"
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <div className="h-16 flex items-center justify-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full">
            <ShieldCheck size={14} className="text-[#E82429]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure Access</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-sm text-center"
          >
            <div className="mb-6">
              <h3 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter leading-tight">
                New Business <br />Opportunities Tracker
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Corporate Email</label>
                <div className="relative group">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-gray-100 py-3 pl-8 focus:border-black outline-none transition-all text-sm font-medium"
                    placeholder="name@dentsu.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Security Key</label>
                <div className="relative group">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-b border-gray-100 py-3 pl-8 focus:border-black outline-none transition-all text-sm font-medium"
                    placeholder="********"
                  />
                </div>
              </div>

              {authError && (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-red-500">{authError}</p>
                  {import.meta.env.DEV && authErrorCode && (
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {authErrorCode}
                    </p>
                  )}
                </div>
              )}
              {resetMessage && (
                <p className="text-xs font-bold text-green-600">{resetMessage}</p>
              )}

              <button
                type="button"
                onClick={handleResetPassword}
                disabled={isResettingPassword}
                className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
              >
                {isResettingPassword ? 'Sending reset email...' : 'Reset password'}
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[#E82429] transition-all duration-500 group shadow-xl shadow-black/5"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Authenticate'}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>

        <div className="h-16 flex items-center justify-center border-t border-gray-50">
          <p className="text-[8px] text-black uppercase tracking-[0.2em] font-black leading-relaxed text-center">
            Created by Dentsu DAM [Data, Analytics and Measurement]
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
