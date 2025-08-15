// src/components/Dashboard/AddFunds.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Currency } from "../../types";
import { getWallet, setWallet } from "../../utils/localStorage";
import { v4 as uuidv4 } from "uuid";
import useTransactions from "../../hooks/useTransactions";

const currencies: Currency[] = ["INR", "USD", "EUR", "GBP"];

const AddFunds: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>("INR");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (amount <= 0) {
      setError("Please enter a positive amount");
      toast.error("Please enter a positive amount");
      return;
    }
    setError("");

    // Get wallet from localStorage, update balance & persist
    const wallet = getWallet();
    wallet.balances[currency] = (wallet.balances[currency] ?? 0) + amount;
    setWallet(wallet);

    // Add transaction record
    addTransaction({
      id: uuidv4(),
      type: "Add",
      amount,
      currency,
      status: "Success",
      date: new Date().toISOString(),
    });

    toast.success("Funds added successfully!");
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

      <h1 className="text-2xl font-bold mb-4">Add Funds</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <label className="block mb-2 font-semibold">
          Amount
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <label className="block mb-4 font-semibold">
          Currency
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="w-full p-2 border rounded mt-1"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Funds
        </button>
      </form>
    </div>
  );
};

export default AddFunds;
