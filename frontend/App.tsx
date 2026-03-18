import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import LookerEmbed from './components/LookerEmbed';
import LoginPage from './components/LoginPage';
import WelcomePage from './components/WelcomePage';
import SupportPage from './components/SupportPage';
import MarketInputModule from './components/MarketInputModule';
import { AppView, User, Theme, MarketOpportunity } from './types';
import { syncToBigQuery } from './services/bigQueryService';
import { auth } from './firebase';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('LOGIN');
  const [previousView, setPreviousView] = useState<AppView>('LOGIN');
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [marketData, setMarketData] = useState<MarketOpportunity[]>([]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setView('LOGIN');
        return;
      }

      const derivedName =
        firebaseUser.displayName ||
        firebaseUser.email?.split('@')[0]?.replace(/[._-]+/g, ' ') ||
        'User';

      setUser({
        name: derivedName,
        email: firebaseUser.email || '',
        role: 'User',
      });

      setView('WELCOME');
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setView('LOGIN');
    setUser(null);
  };

  const handleSupport = () => {
    setPreviousView(view);
    setView('SUPPORT');
  };

  const handleBackFromSupport = () => {
    setView(previousView);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleAddOpportunity = async (
    opp: Omit<MarketOpportunity, 'id' | 'syncStatus'>
  ) => {
    const newOpp: MarketOpportunity = {
      ...opp,
      id: uuidv4(),
      syncStatus: 'pending',
    };

    setMarketData((prev) => [newOpp, ...prev]);

    const success = await syncToBigQuery(newOpp);

    setMarketData((prev) =>
      prev.map((item) =>
        item.id === newOpp.id
          ? { ...item, syncStatus: success ? 'synced' : 'error' }
          : item
      )
    );
  };

  const handleUpdateOpportunity = async (updatedOpp: MarketOpportunity) => {
    setMarketData((prev) =>
      prev.map((opp) =>
        opp.id === updatedOpp.id
          ? { ...updatedOpp, syncStatus: 'pending' }
          : opp
      )
    );

    const success = await syncToBigQuery(updatedOpp);

    setMarketData((prev) =>
      prev.map((item) =>
        item.id === updatedOpp.id
          ? { ...item, syncStatus: success ? 'synced' : 'error' }
          : item
      )
    );
  };

  const LOOKER_URL =
    'https://lookerstudio.google.com/embed/reporting/66bba6b6-e3a9-4ecd-9d1b-483a1ab1f622/page/p_h0qsci1gjd';

  return (
    <div className="h-screen overflow-hidden bg-white transition-colors duration-300 selection:bg-[#E82429] selection:text-white dark:bg-black">
      <AnimatePresence mode="wait">
        {view === 'LOGIN' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <LoginPage onSupport={handleSupport} />
          </motion.div>
        )}

        {view === 'WELCOME' && user && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <WelcomePage
              userName={user.name}
              onContinue={() => setView('DASHBOARD')}
              onSignOut={handleSignOut}
              onSupport={handleSupport}
            />
          </motion.div>
        )}

        {view === 'SUPPORT' && (
          <motion.div
            key="support"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <SupportPage onBack={handleBackFromSupport} />
          </motion.div>
        )}

        {(view === 'DASHBOARD' || view === 'MARKET_INPUT') && user && (
          <motion.div
            key="platform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex h-full min-h-0 w-full flex-col overflow-hidden"
          >
            <Header
              userName={user.name}
              onSignOut={handleSignOut}
              onSupport={handleSupport}
              theme={theme}
              toggleTheme={toggleTheme}
              currentView={view}
              setView={setView}
            />

            <main className="flex-1 min-h-0 w-full overflow-hidden">
              {view === 'DASHBOARD' ? (
                <div className="h-full w-full overflow-hidden">
                  <LookerEmbed
                    url={LOOKER_URL}
                    title="dentsu Africa New Business Opportunities Tracker"
                  />
                </div>
              ) : (
                <div className="h-full overflow-y-auto bg-[#F5F5F5] p-6 dark:bg-black md:p-10">
                  <div className="mx-auto max-w-[1600px]">
                    <MarketInputModule
                      onAddOpportunity={handleAddOpportunity}
                      onUpdateOpportunity={handleUpdateOpportunity}
                      existingData={marketData}
                    />
                  </div>
                </div>
              )}
            </main>

            <div className="pointer-events-none absolute bottom-4 flex flex-col items-center w-full">
              <p className="text-[8px] font-black uppercase tracking-[0.5em] text-black dark:text-white/50">
                {/* Created by Dentsu DAM [Data, Analytics and Measurement] */}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;