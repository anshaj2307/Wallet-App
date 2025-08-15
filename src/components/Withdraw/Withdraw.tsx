import React, { useState } from "react";
import useWallet from "../../hooks/useWallet";
import useTransactions from "../../hooks/useTransactions";
import { Currency } from "../../types";
import { validateBankDetails } from "../../utils/validators";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const currencies: Currency[] = ["INR", "USD", "EUR", "GBP"];

const Withdraw: React.FC = () => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>("INR");
  const [error, setError] = useState("");
  const { wallet, withdrawFunds } = useWallet();
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  
  // Your validation logic here
  if (amount <= 0) {
    toast.error("Please enter a positive amount");
    return;
  }
  setError("");

  withdrawFunds(currency, amount);

  addTransaction({
    id: uuidv4(),
    type: "Withdraw",
    amount,
    currency,
    status: "Success",
    date: new Date().toISOString(),
  });

  toast.success("Withdrawal successful!");
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

      <h1 className="text-2xl font-bold mb-4">Withdraw Funds</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <input
          type="text"
          placeholder="Bank Name"
          className="w-full p-2 border rounded"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Account Number"
          className="w-full p-2 border rounded"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="IFSC Code"
          className="w-full p-2 border rounded"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
        />
        <input
          type="number"
          placeholder="Amount"
          min="0"
          step="0.01"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          className="w-full p-2 border rounded"
        >
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Withdraw
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
