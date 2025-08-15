import { User, Wallet, Transaction } from '../types';

const USER_KEY = 'user';
const WALLET_KEY = 'wallet';
const TRANSACTIONS_KEY = 'transactions';

export function getUser(): User | null {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) as User : null;
}

export function setUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getWallet(): Wallet {
  const data = localStorage.getItem(WALLET_KEY);
  return data ? JSON.parse(data) as Wallet : { balances: { INR: 1000, USD: 0, EUR: 0, GBP: 0 } };
}

export function setWallet(wallet: Wallet): void {
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
}

export function getTransactions(): Transaction[] {
  const data = localStorage.getItem(TRANSACTIONS_KEY);
  return data ? JSON.parse(data) as Transaction[] : [];
}

export function setTransactions(transactions: Transaction[]): void {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
}
