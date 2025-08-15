import { useState, useEffect } from 'react';
import { getTransactions, setTransactions } from '../utils/localStorage';
import { Transaction, TransactionType, TransactionStatus } from '../types';

export default function useTransactions() {
  const [transactions, setTransactionList] = useState<Transaction[]>(getTransactions());

  useEffect(() => {
    setTransactions(transactions);
  }, [transactions]);

  function addTransaction(tx: Transaction) {
    setTransactionList((prev) => [tx, ...prev]);
  }

  function filterTransactions(
    type?: TransactionType,
    status?: TransactionStatus,
    fromDate?: string,
    toDate?: string
  ): Transaction[] {
    return transactions.filter(tx => {
      const txDate = new Date(tx.date);
      const afterFrom = !fromDate || txDate >= new Date(fromDate);
      const beforeTo = !toDate || txDate <= new Date(toDate);
      const typeMatch = !type || tx.type === type;
      const statusMatch = !status || tx.status === status;
      return afterFrom && beforeTo && typeMatch && statusMatch;
    });
  }

  return { transactions, addTransaction, filterTransactions, setTransactionList };
}
