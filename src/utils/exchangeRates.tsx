import { Currency } from '../types';

export const EXCHANGE_RATES: Record<Currency, Record<Currency, number>> = {
  INR: { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.009 },
  USD: { INR: 83.33, USD: 1, EUR: 0.92, GBP: 0.75 },
  EUR: { INR: 90.9, USD: 1.09, EUR: 1, GBP: 0.82 },
  GBP: { INR: 111.11, USD: 1.33, EUR: 1.22, GBP: 1 },
};

export function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency
): number {
  if (from === to) return amount;
  return parseFloat((amount * EXCHANGE_RATES[from][to]).toFixed(2));
}
