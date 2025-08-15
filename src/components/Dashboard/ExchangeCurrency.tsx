import React, { useState } from "react";
import useWallet from "../../hooks/useWallet";
import useTransactions from "../../hooks/useTransactions";
import { Currency } from "../../types";
import { convertCurrency } from "../../utils/exchangeRates";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const currencies: Currency[] = ["INR", "USD", "EUR", "GBP"];

const ExchangeCurrency: React.FC = () => {
  const { wallet, exchangeCurrency } = useWallet();
  const { addTransaction } = useTransactions();
  const [fromCurrency, setFromCurrency] = useState<Currency>("INR");
  const [toCurrency, setToCurrency] = useState<Currency>("USD");
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (amount <= 0) {
      setError("Enter a positive amount");
      toast.error("Enter a positive amount");
      return;
    }
    if (fromCurrency === toCurrency) {
      setError("From and To currency must be different");
      toast.error("From and To currency must be different");
      return;
    }
    if (!wallet.balances[fromCurrency] || wallet.balances[fromCurrency] < amount) {
      setError("Insufficient funds");
      toast.error("Insufficient funds");
      return;
    }

    setError("");
    const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);

    exchangeCurrency(fromCurrency, toCurrency, amount, convertedAmount);

    addTransaction({
      id: uuidv4(),
      type: "Exchange",
      amount,
      currency: fromCurrency,
      status: "Success",
      date: new Date().toISOString(),
      details: { fromCurrency, toCurrency, convertedAmount },
    });

    toast.success("Currency exchanged successfully!");
    navigate("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition"
      >
        ← Return to Dashboard
      </button>

      <h1 className="text-2xl font-bold mb-4">Exchange Currency</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block font-semibold mb-1">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value as Currency)}
            className="w-full p-2 border rounded"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="mt-1 text-sm text-gray-500">
            Available: {wallet.balances[fromCurrency]?.toFixed(2) ?? 0}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value as Currency)}
            className="w-full p-2 border rounded"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
          Exchange
        </button>
      </form>
    </div>
  );
};

export default ExchangeCurrency;
