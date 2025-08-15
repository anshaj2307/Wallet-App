export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface User {
  mobile: string;
  isAuthenticated: boolean;
}

export interface Wallet {
  balances: Record<Currency, number>; 
}

export type TransactionType = 'Add' | 'Withdraw' | 'Exchange';

export type TransactionStatus = 'Success' | 'Failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: Currency;
  status: TransactionStatus;
  date: string; 
  details?: Record<string, any>;
}
