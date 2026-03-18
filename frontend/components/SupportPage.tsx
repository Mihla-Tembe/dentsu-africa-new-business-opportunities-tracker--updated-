
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';

interface SupportPageProps {
  onBack: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#E82429] opacity-5 blur-[120px] rounded-full"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl z-10"
      >
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Platform</span>
        </button>

        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
            {/* Optimized Image Frame */}
            <div className="w-40 h-40 bg-gray-100 dark:bg-white/5 flex-shrink-0 overflow-hidden border border-gray-100 dark:border-white/10 shadow-inner">
              <img 
                src="https://i.ibb.co/Z1kDPzW5/Microsoft-Teams-image-1-1.jpg" 
                alt="Wayne Tigere" 
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div>
              <h2 className="text-4xl font-black text-black dark:text-white uppercase tracking-tighter mb-2">Wayne Tigere</h2>
              <p className="text-sm font-bold text-[#E82429] uppercase tracking-widest">Director</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">Dentsu Data Analytics and Measurement</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Section */}
              <div className="p-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Contact Support</p>
                <a 
                  href="mailto:wayne.tigere@dentsu.com" 
                  className="flex items-center space-x-3 text-black dark:text-white hover:text-[#E82429] transition-colors"
                >
                  <Mail size={18} />
                  <span className="text-sm font-bold">wayne.tigere@dentsu.com</span>
                </a>
              </div>
              {/* Office Location Section */}
              <div className="p-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Office Location</p>
                <div className="flex items-center space-x-3 text-black dark:text-white">
                  <MapPin size={18} className="text-[#E82429]" />
                  <span className="text-sm font-bold">Cape Town, South Africa</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100 dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                For technical inquiries, data synchronization issues, or access requests regarding the New Business Opportunities Tracker, please reach out to the Data, Analytics and Measurement (DAM) team.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-black dark:text-white uppercase tracking-[0.5em] font-black">
            Created by Dentsu DAM [Data, Analytics and Measurement]
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SupportPage;
