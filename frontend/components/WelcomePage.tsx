
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2, LogOut, HelpCircle } from 'lucide-react';

interface WelcomePageProps {
  userName: string;
  onContinue: () => void;
  onSignOut: () => void;
  onSupport: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ userName, onContinue, onSignOut, onSupport }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center relative overflow-hidden"
      style={{ isolation: 'isolate', paddingBottom: '6rem' }}
    >
      {/* Top Navigation */}
      <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-center">
        <button 
          onClick={onSupport}
          className="flex items-center space-x-2 px-4 py-2 border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all text-[10px] font-black uppercase tracking-widest group"
        >
          <HelpCircle size={14} />
          <span>Support</span>
        </button>
        
        <button
          onClick={onSignOut}
          className="flex items-center space-x-2 px-4 py-2 border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all text-[10px] font-black uppercase tracking-widest group"
        >
          <span>Sign Out</span>
          <LogOut size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-40 grayscale">
        <img 
          src="https://picsum.photos/seed/africa-network/1920/1080" 
          alt="Africa Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-5xl z-10 p-8"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex justify-center"
        >
          <div className="w-16 h-16 bg-[#E82429] flex items-center justify-center text-white rounded-full shadow-2xl">
            <Globe2 size={32} className="animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-xs font-black uppercase tracking-[0.6em] text-white/60 mb-2">
            {getGreeting()}
          </p>
          <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-[#E82429]">
            {userName}
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase">
            We don't just <br />understand Africa. <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>We are Africa.</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 font-light tracking-tight max-w-3xl mx-auto">
            No one knows its people, cultures, and possibilities better.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onContinue}
          className="inline-flex items-center space-x-6 bg-white text-black px-12 py-6 font-bold uppercase tracking-[0.2em] hover:bg-[#E82429] hover:text-white transition-all duration-500 group shadow-2xl"
        >
          <span>Launch Opportunities Tracker</span>
          <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-0 right-0 z-10 flex flex-col items-center space-y-2"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Created by Dentsu DAM [Data, Analytics and Measurement]</span>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
