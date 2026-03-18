
import React from 'react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border border-[#E0E0E0] p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
};

export default DashboardCard;
