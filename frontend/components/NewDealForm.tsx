
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Deal, ServiceLine, PitchStage, Region } from '../types';
import { SERVICE_LINES, PITCH_STAGES, REGIONS } from '../constants';

interface NewDealFormProps {
  onClose: () => void;
  onSubmit: (deal: Omit<Deal, 'id' | 'dateAdded'>) => void;
}

const NewDealForm: React.FC<NewDealFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    serviceLine: 'Media' as ServiceLine,
    estimatedRevenue: '',
    pitchStage: 'RFI' as PitchStage,
    probability: 50,
    region: 'SSA' as Region,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      estimatedRevenue: Number(formData.estimatedRevenue),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Register New Deal</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Client Name</label>
            <input
              required
              type="text"
              className="w-full border-b-2 border-[#E0E0E0] focus:border-black outline-none py-2 transition-colors"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Service Line</label>
              <select
                className="w-full border-b-2 border-[#E0E0E0] focus:border-black outline-none py-2 bg-transparent"
                value={formData.serviceLine}
                onChange={(e) => setFormData({ ...formData, serviceLine: e.target.value as ServiceLine })}
              >
                {SERVICE_LINES.map(sl => <option key={sl} value={sl}>{sl}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Region</label>
              <select
                className="w-full border-b-2 border-[#E0E0E0] focus:border-black outline-none py-2 bg-transparent"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value as Region })}
              >
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Est. Revenue (USD)</label>
            <input
              required
              type="number"
              className="w-full border-b-2 border-[#E0E0E0] focus:border-black outline-none py-2 transition-colors"
              value={formData.estimatedRevenue}
              onChange={(e) => setFormData({ ...formData, estimatedRevenue: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Pitch Stage</label>
              <select
                className="w-full border-b-2 border-[#E0E0E0] focus:border-black outline-none py-2 bg-transparent"
                value={formData.pitchStage}
                onChange={(e) => setFormData({ ...formData, pitchStage: e.target.value as PitchStage })}
              >
                {PITCH_STAGES.map(ps => <option key={ps} value={ps}>{ps}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Probability (%)</label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full accent-black mt-4"
                value={formData.probability}
                onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })}
              />
              <div className="text-right text-xs font-bold mt-1">{formData.probability}%</div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-[#E82429] transition-colors"
          >
            Submit Deal
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewDealForm;
