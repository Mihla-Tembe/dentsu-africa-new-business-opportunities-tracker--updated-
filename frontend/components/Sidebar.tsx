
import React from 'react';
import { LayoutDashboard, Target, TrendingUp, Map, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'pitch-tracker', label: 'Pitch Tracker', icon: Target },
    { id: 'financials', label: 'Financial Forecasts', icon: TrendingUp },
    { id: 'regional', label: 'Regional Insights', icon: Map },
  ];

  return (
    <aside className="w-64 h-screen bg-black text-white flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <h1 className="text-2xl font-black tracking-tighter uppercase">dentsu Africa</h1>
        <p className="text-[10px] tracking-[0.2em] text-gray-400 mt-1 uppercase">Opportunities Tracker</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-[#E82429] text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
