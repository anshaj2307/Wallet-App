import React from "react";
import useWallet from "../../hooks/useWallet";
import useTransactions from "../../hooks/useTransactions";
import { convertCurrency } from "../../utils/exchangeRates";
import { Currency } from "../../types";
import { useNavigate } from "react-router-dom";

const currencySymbols: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const currencies: Currency[] = ["INR", "USD", "EUR", "GBP"];

const WalletDashboard: React.FC = () => {
  const { wallet } = useWallet();
  const { transactions } = useTransactions();
  const navigate = useNavigate();

  const recentTxs = transactions.slice(0, 5);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 leading-tight mb-2">
          🧾 Wallet Dashboard
        </h1>
        <p className="text-gray-500 text-lg">
          Track, exchange, and manage your balances easily!
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {currencies.map((curr) => (
          <div
            key={curr}
            className="bg-gradient-to-br from-blue-100 to-blue-300 p-6 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-200"
          >
            <div className="text-3xl mb-2">{currencySymbols[curr]}</div>
            <div className="text-2xl font-bold text-blue-800">{curr}</div>
            <div className="mt-2 text-3xl font-extrabold text-gray-900">
              {curr === "INR"
                ? wallet.balances[curr].toFixed(2)
                : convertCurrency(wallet.balances["INR"], "INR", curr).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Actions Row */}
      <div className="flex justify-center gap-6 mb-10">
        <button
          className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/add")}
        >
          + Add Funds
        </button>
        <button
          className="bg-green-500 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-green-600 transition-colors"
          onClick={() => navigate("/withdraw")}
        >
          – Withdraw Funds
        </button>
        <button
          className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition-colors"
          onClick={() => navigate("/exchange")}
        >
          ↔ Exchange Currency
        </button>
      </div>

      {/* Recent Transactions List */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Recent Transactions</h2>
        {recentTxs.length === 0 ? (
          <div className="text-gray-500 text-center">No transactions yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {recentTxs.map((tx) => (
              <li
                key={tx.id}
                className="py-3 flex items-center justify-between transition-colors hover:bg-gray-50"
              >
                <div>
                  <span className="font-semibold">{tx.type}</span>
                  <span className="text-gray-700 ml-2">
                    {currencySymbols[tx.currency]}
                    {tx.amount.toFixed(2)}
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    tx.status === "Success"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {tx.status}
                </div>
                <div className="text-xs text-gray-400 ml-4">
                  {new Date(tx.date).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="text-right mt-4">
          <button
            className="text-blue-600 font-semibold underline hover:text-blue-800"
            onClick={() => navigate("/transactions")}
          >
            View All →
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;
