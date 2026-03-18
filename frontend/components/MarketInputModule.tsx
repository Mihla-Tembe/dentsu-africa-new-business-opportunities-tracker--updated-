
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, CheckCircle2, Edit2, XCircle, Cloud, Database, AlertCircle } from 'lucide-react';
import { MarketOpportunity } from '../types';

interface MarketInputModuleProps {
  onAddOpportunity: (opp: MarketOpportunity) => void;
  onUpdateOpportunity: (opp: MarketOpportunity) => void;
  existingData: MarketOpportunity[];
}

const MarketInputModule: React.FC<MarketInputModuleProps> = ({ onAddOpportunity, onUpdateOpportunity, existingData }) => {
  const initialFormState = {
    country: '',
    agencyLeadBrand: '',
    clientName: '',
    opportunityDetails: '',
    opportunityStage: 'Proposal',
    opportunityStatus: 'Open',
    expectedRevenueStartDate: '',
    billingsGBP2026: 0,
    revenueGBP2026: 0,
    likelihood2025: 0.5,
  };

  const [formData, setFormData] = useState<Omit<MarketOpportunity, 'id' | 'dateAdded'>>(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    
    if (editingId) {
      const existingOpp = existingData.find(o => o.id === editingId);
      if (existingOpp) {
        await onUpdateOpportunity({
          ...formData,
          id: editingId,
          dateAdded: existingOpp.dateAdded
        });
      }
    } else {
      const newOpp: MarketOpportunity = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        dateAdded: new Date().toISOString(),
      };
      await onAddOpportunity(newOpp);
    }

    setIsSyncing(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
    handleCancel();
  };

  const handleEdit = (opp: MarketOpportunity) => {
    setEditingId(opp.id);
    setFormData({
      country: opp.country,
      agencyLeadBrand: opp.agencyLeadBrand,
      clientName: opp.clientName,
      opportunityDetails: opp.opportunityDetails,
      opportunityStage: opp.opportunityStage,
      opportunityStatus: opp.opportunityStatus,
      expectedRevenueStartDate: opp.expectedRevenueStartDate,
      billingsGBP2026: opp.billingsGBP2026,
      revenueGBP2026: opp.revenueGBP2026,
      likelihood2025: opp.likelihood2025,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black dark:text-white">Market Intelligence Input</h2>
          <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest font-bold">Capture and Synchronize opportunities with Google BigQuery</p>
        </div>
        <div className="flex items-center space-x-4">
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 text-green-600 font-black uppercase text-[10px] tracking-widest"
            >
              <CheckCircle2 size={16} />
              <span>Opportunity Synchronized</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-8 space-y-6 shadow-2xl shadow-black/5 sticky top-24">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E82429]">
                  {editingId ? 'Edit Opportunity' : 'Opportunity Details'}
                </p>
                {editingId && (
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black dark:hover:text-white flex items-center space-x-1"
                  >
                    <XCircle size={12} />
                    <span>Cancel Edit</span>
                  </button>
                )}
              </div>
              
              <div className="space-y-1">
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Country</label>
                <input 
                  required
                  type="text" 
                  value={formData.country}
                  onChange={e => setFormData({...formData, country: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-black border-none py-3 px-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  placeholder="e.g. Cameroon"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Agency Lead Brand</label>
                <input 
                  required
                  type="text" 
                  value={formData.agencyLeadBrand}
                  onChange={e => setFormData({...formData, agencyLeadBrand: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-black border-none py-3 px-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  placeholder="e.g. CAM001 DAN Cameroon"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Client Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.clientName}
                  onChange={e => setFormData({...formData, clientName: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-black border-none py-3 px-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  placeholder="e.g. Doualair"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Opportunity Details</label>
                <textarea 
                  required
                  value={formData.opportunityDetails}
                  onChange={e => setFormData({...formData, opportunityDetails: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-black border-none py-3 px-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white transition-all min-h-[80px]"
                  placeholder="e.g. Creative, Media Buying..."
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50 dark:border-white/5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E82429]">Status & Financials</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Stage</label>
                  <select 
                    value={formData.opportunityStage}
                    onChange={e => setFormData({...formData, opportunityStage: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-black border-none py-3 px-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  >
                    <option>Proposal</option>
                    <option>Pitch</option>
                    <option>Chemistry</option>
                    <option>RFI/RFP</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Status</label>
                  <select 
                    value={formData.opportunityStatus}
                    onChange={e => setFormData({...formData, opportunityStatus: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-black border-none py-3 px-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  >
                    <option>Open</option>
                    <option>Closed Won</option>
                    <option>Closed Lost</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Expected Start Date</label>
                <input 
                  type="date" 
                  value={formData.expectedRevenueStartDate}
                  onChange={e => setFormData({...formData, expectedRevenueStartDate: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-black border-none py-3 px-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Billings (GBP 2026)</label>
                  <input 
                    type="number" 
                    value={formData.billingsGBP2026}
                    onChange={e => setFormData({...formData, billingsGBP2026: Number(e.target.value)})}
                    className="w-full bg-gray-50 dark:bg-black border-none py-3 px-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Revenue (GBP 2026)</label>
                  <input 
                    type="number" 
                    value={formData.revenueGBP2026}
                    onChange={e => setFormData({...formData, revenueGBP2026: Number(e.target.value)})}
                    className="w-full bg-gray-50 dark:bg-black border-none py-3 px-4 text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-400">Likelihood 2025 ({formData.likelihood2025})</label>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05"
                  value={formData.likelihood2025}
                  onChange={e => setFormData({...formData, likelihood2025: Number(e.target.value)})}
                  className="w-full accent-[#E82429]"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSyncing}
              className={`w-full py-4 font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center space-x-2 ${
                isSyncing 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-black dark:bg-white text-white dark:text-black hover:bg-[#E82429] dark:hover:bg-[#E82429] dark:hover:text-white'
              }`}
            >
              {isSyncing ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-[#E82429] rounded-full animate-spin"></div>
                  <span>Synchronizing...</span>
                </>
              ) : (
                <>
                  <Cloud size={16} />
                  <span>{editingId ? 'Update & Sync' : 'Sync to BigQuery'}</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 overflow-x-auto">
          <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl shadow-black/5 min-w-[1000px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-black border-b border-gray-100 dark:border-white/10">
                  <th className="px-4 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Sync</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Country</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Agency Lead</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Client</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Stage</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Billings (2026)</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Likelihood</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {existingData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-20 text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">No market data synchronized yet</p>
                    </td>
                  </tr>
                ) : (
                  existingData.map((opp) => (
                    <tr key={opp.id} className={`border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${editingId === opp.id ? 'bg-red-50/30 dark:bg-red-900/10' : ''}`}>
                      <td className="px-4 py-4">
                        {opp.syncStatus === 'synced' ? (
                          <Database size={16} className="text-green-500" title="Synced to BigQuery" />
                        ) : opp.syncStatus === 'error' ? (
                          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }}>
                            <AlertCircle size={16} className="text-red-500" title="Sync Error" />
                          </motion.div>
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-200 border-t-[#E82429] rounded-full animate-spin"></div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-xs font-bold dark:text-white">{opp.country}</td>
                      <td className="px-4 py-4 text-[10px] text-gray-500 dark:text-gray-400">{opp.agencyLeadBrand}</td>
                      <td className="px-4 py-4 text-xs font-black dark:text-white">{opp.clientName}</td>
                      <td className="px-4 py-4">
                        <span className="text-[9px] font-black uppercase px-2 py-1 bg-gray-100 dark:bg-white/10 dark:text-white">{opp.opportunityStage}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-[9px] font-black uppercase px-2 py-1 ${opp.opportunityStatus === 'Open' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-green-600 bg-green-50 dark:bg-green-900/20'}`}>
                          {opp.opportunityStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs font-bold dark:text-white">£{opp.billingsGBP2026.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-1 bg-gray-100 dark:bg-white/10 w-12">
                            <div className="h-full bg-[#E82429]" style={{ width: `${opp.likelihood2025 * 100}%` }}></div>
                          </div>
                          <span className="text-[10px] font-black dark:text-white">{opp.likelihood2025}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button 
                          onClick={() => handleEdit(opp)}
                          className="p-2 text-gray-400 hover:text-[#E82429] transition-colors"
                          title="Edit Opportunity"
                        >
                          <Edit2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInputModule;
