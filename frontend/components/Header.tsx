
import React, { useState, useRef, useEffect } from 'react';
import { Bell, LogOut, Sun, Moon, HelpCircle, LayoutDashboard, FileInput } from 'lucide-react';
import { Theme, AppView } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  userName: string;
  onSignOut: () => void;
  onSupport: () => void;
  theme: Theme;
  toggleTheme: () => void;
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onSignOut, onSupport, theme, toggleTheme, currentView, setView }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const notifications = [
    {
      id: 'n1',
      title: 'Action Required',
      detail: 'Update all opportunity trackers before the regional opportunities session.',
      priority: 'High',
      time: 'Now',
    },
    {
      id: 'n2',
      title: 'Sync Reminder',
      detail: '2 records are pending BigQuery synchronization in Market Input.',
      priority: 'Medium',
      time: '5m ago',
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="h-20 bg-white dark:bg-black border-b border-gray-100 dark:border-white/10 flex items-center justify-between px-8 sticky top-0 z-40 w-full shadow-sm transition-all duration-300">
      <div className="flex items-center space-x-10">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter uppercase leading-none text-black dark:text-white">dentsu Africa</h1>
        </div>
        
        <div className="h-8 w-[1px] bg-gray-100 dark:bg-white/10 hidden md:block"></div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => setView('DASHBOARD')}
            className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest transition-colors ${currentView === 'DASHBOARD' ? 'text-[#E82429]' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
          >
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setView('MARKET_INPUT')}
            className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest transition-colors ${currentView === 'MARKET_INPUT' ? 'text-[#E82429]' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
          >
            <FileInput size={14} />
            <span>Market Input</span>
          </button>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={onSupport}
          className="p-2.5 text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-white/5"
          title="Support"
        >
          <HelpCircle size={20} />
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2.5 text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-white/5"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Open inbox"
            className="relative p-2.5 text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-white/5"
          >
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#E82429] rounded-full"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-black border border-gray-100 dark:border-white/10 shadow-2xl p-6 z-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E82429]">Inbox</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-[9px] text-gray-400 uppercase font-bold">{notifications.length} new</p>
                    <div className="w-1.5 h-1.5 bg-[#E82429] rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  {notifications.map((item) => (
                    <div key={item.id} className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">{item.title}</p>
                        <p className="text-[9px] font-bold uppercase text-gray-400">{item.time}</p>
                      </div>
                      <p className="text-xs font-bold text-black dark:text-white leading-relaxed">{item.detail}</p>
                      <div className="mt-2">
                        <p className="text-[9px] text-gray-400 uppercase font-bold">Priority: {item.priority}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 dark:border-white/5">
                  <button
                    type="button"
                    className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#E82429] transition-colors"
                    onClick={() => setShowNotifications(false)}
                  >
                    Close Inbox
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-6 w-[1px] bg-gray-100 dark:bg-white/10 mx-2"></div>

        <div className="flex items-center space-x-4 pl-2">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-xs font-black rounded-sm">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] font-black text-black dark:text-white uppercase leading-none">{userName}</p>
              <p className="text-[8px] text-gray-400 dark:text-gray-500 uppercase font-bold mt-1">Regional Director</p>
            </div>
          </div>
          
          <button 
            onClick={onSignOut}
            className="flex items-center space-x-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#E82429] dark:hover:bg-[#E82429] dark:hover:text-white transition-all group"
          >
            <span>Sign Out</span>
            <LogOut size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
