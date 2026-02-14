
export interface SocialAccount {
  platform: 'Facebook' | 'Instagram' | 'WhatsApp';
  username: string;
  isConnected: boolean;
}

export interface InventoryItem {
  id: string;
  category: 'Cement' | 'Rod';
  brand: string;
  type: string;
  quantity: number;
  unit: 'Bags' | 'Tons' | 'KG';
  unitPrice: number;
  lastUpdated: string;
}

export interface ExpenseEntry {
  id: string;
  category: 'Rent' | 'Salary' | 'Electricity' | 'Fuel' | 'Others';
  description: string;
  amount: number;
  date: string;
}

export interface LedgerEntry {
  id: string;
  clientName: string;
  contact: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  lastTransactionDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  riskProfile: 'Low' | 'Medium' | 'High';
  invoiceNo?: string;
}

export interface VideoCampaign {
  id: string;
  title: string;
  videoUrl: string;
  date: string;
  status: 'Published' | 'Processing' | 'Draft';
  platform: string;
}

export interface ScheduledPost {
  id: string;
  platform: 'Facebook' | 'Instagram' | 'WhatsApp';
  type: 'Poster' | 'Video' | 'Text';
  prompt: string;
  scheduledTime: string;
  status: 'Scheduled' | 'Posted' | 'Failed';
  generatedContentUrl?: string;
}

export interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  avatar?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface AppSettings {
  socialAccounts: SocialAccount[];
  autoMarketing: boolean;
  dailyStrategyAlerts: boolean;
}
