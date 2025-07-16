import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Transaction = {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
};

export const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  addTransaction: () => {}
});

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // ✅ Load dari localStorage saat pertama kali render
  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  // ✅ Simpan ke localStorage setiap kali transactions berubah
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [...prev, tx]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
