
export interface Deal {
  id: string;
  clientName: string;
  serviceLine: string;
  estimatedRevenue: number;
  pitchStage: string;
  probability: number;
  region: string;
  dateAdded: string;
}

export const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    clientName: 'Global Tech Corp',
    serviceLine: 'Media',
    estimatedRevenue: 1200000,
    pitchStage: 'Final Pitch',
    probability: 85,
    region: 'South Africa',
    dateAdded: '2024-03-01'
  },
  {
    id: '2',
    clientName: 'Eco Energy Ltd',
    serviceLine: 'Creative',
    estimatedRevenue: 450000,
    pitchStage: 'RFP',
    probability: 40,
    region: 'SSA',
    dateAdded: '2024-03-10'
  },
  {
    id: '3',
    clientName: 'FinBank Africa',
    serviceLine: 'CXM',
    estimatedRevenue: 2100000,
    pitchStage: 'Chemistry',
    probability: 60,
    region: 'North Africa',
    dateAdded: '2024-03-15'
  },
  {
    id: '4',
    clientName: 'Retail Giant',
    serviceLine: 'Media',
    estimatedRevenue: 800000,
    pitchStage: 'RFI',
    probability: 20,
    region: 'SSA',
    dateAdded: '2024-03-20'
  }
];

export const REGIONS = ['SSA', 'North Africa', 'South Africa'] as const;
export const SERVICE_LINES = ['Creative', 'Media', 'CXM'] as const;
export const PITCH_STAGES = ['RFI', 'RFP', 'Chemistry', 'Final Pitch'] as const;

export const COLORS = {
  dentsuRed: '#E82429',
  black: '#000000',
  white: '#FFFFFF',
  grey: '#F5F5F5',
  border: '#E0E0E0'
};
