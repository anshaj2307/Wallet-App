import { useState, useEffect } from 'react';
import { getWallet, setWallet } from '../utils/localStorage';
import { Wallet, Currency } from '../types';

export default function useWallet() {
  const [wallet, setLocalWallet] = useState<Wallet>(getWallet());

  useEffect(() => {
    setWallet(wallet);
  }, [wallet]);

  function addFunds(currency: Currency, amount: number) {
    setLocalWallet((prev) => {
      const updated = { ...prev };
      updated.balances[currency] = (updated.balances[currency] || 0) + amount;
      return updated;
    });
  }

  function withdrawFunds(currency: Currency, amount: number) {
    setLocalWallet((prev) => {
      const updated = { ...prev };
      updated.balances[currency] = Math.max((updated.balances[currency] || 0) - amount, 0);
      return updated;
    });
  }

  function exchangeCurrency(from: Currency, to: Currency, amount: number, convertedAmount: number) {
    setLocalWallet((prev) => {
      const updated = { ...prev };
      updated.balances[from] = Math.max((updated.balances[from] || 0) - amount, 0);
      updated.balances[to] = (updated.balances[to] || 0) + convertedAmount;
      return updated;
    });
  }

  return { wallet, addFunds, withdrawFunds, exchangeCurrency, setLocalWallet };
}
