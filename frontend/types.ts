
export interface User {
  name: string;
  role: string;
  email: string;
}

export type AppView = 'LOGIN' | 'WELCOME' | 'DASHBOARD' | 'SUPPORT' | 'MARKET_INPUT';
export type Theme = 'light' | 'dark';

export interface MarketOpportunity {
  id: string;
  country: string;
  agencyLeadBrand: string;
  clientName: string;
  opportunityDetails: string;
  opportunityStage: string;
  opportunityStatus: string;
  expectedRevenueStartDate: string;
  billingsGBP2026: number;
  revenueGBP2026: number;
  likelihood2025: number;
  dateAdded: string;
  syncStatus?: 'pending' | 'synced' | 'error';
}

export interface BigQueryConfig {
  projectId: string;
  datasetId: string;
  tableId: string;
}
