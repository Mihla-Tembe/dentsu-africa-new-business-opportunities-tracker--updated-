import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LookerEmbedProps {
  url: string;
  title: string;
}

const LookerEmbed: React.FC<LookerEmbedProps> = ({ url, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing Intelligence');

  useEffect(() => {
    const timers = [
      setTimeout(() => setLoadingText('Securing the connection...'), 1500),
      setTimeout(() => setLoadingText('Synchronizing regional data...'), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full bg-white dark:bg-black overflow-hidden relative transition-colors duration-300">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-30 bg-white dark:bg-black flex flex-col items-center justify-center"
          >
            {/* Geometric Loading Triangle */}
            <div className="relative mb-12">
              <motion.svg 
                width="80" 
                height="80" 
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <motion.path
                  d="M 50 15 L 85 85 L 15 85 Z"
                  fill="none"
                  stroke="#E82429"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.svg>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
              </motion.div>
            </div>

            <div className="text-center space-y-3">
              <motion.p 
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-black uppercase tracking-[0.6em] text-black dark:text-white"
              >
                {loadingText}
              </motion.p>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600">
                New Business Opportunities Tracker
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <iframe
        src={url}
        title={title}
        onLoad={() => setIsLoading(false)}
        className="w-full h-full border-none"
        style={{ display: 'block' }}
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
};

export default LookerEmbed;
