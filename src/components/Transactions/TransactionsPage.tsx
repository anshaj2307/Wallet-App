import React, { useState } from "react";
import useTransactions from "../../hooks/useTransactions";
import { Transaction, TransactionType, TransactionStatus } from "../../types";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const transactionTypes: (TransactionType | "")[] = ["", "Add", "Withdraw", "Exchange"];
const transactionStatuses: (TransactionStatus | "")[] = ["", "Success", "Failed"];

const TransactionsPage: React.FC = () => {
  const { transactions } = useTransactions();
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState<TransactionType | "">("");
  const [filterStatus, setFilterStatus] = useState<TransactionStatus | "">("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredTxs = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    return (
      (!filterType || tx.type === filterType) &&
      (!filterStatus || tx.status === filterStatus) &&
      (!from || txDate >= from) &&
      (!to || txDate <= to)
    );
  });

  // Format transaction for export
  function formatTx(tx: Transaction) {
    return {
      id: tx.id,
      type: tx.type,
      amount: tx.amount,
      currency: tx.currency,
      status: tx.status,
      date: new Date(tx.date).toLocaleString(),
      details: tx.details ? JSON.stringify(tx.details) : "",
    };
  }

  // Excel export function
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTxs.map(formatTx));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  // PDF export function
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction History", 14, 20);
    const rows = filteredTxs.map((tx) => [
      tx.id,
      tx.type,
      tx.amount,
      tx.currency,
      tx.status,
      new Date(tx.date).toLocaleString(),
    ]);
    autoTable(doc, {
      head: [["ID", "Type", "Amount", "Currency", "Status", "Date"]],
      body: rows,
      startY: 30,
    });

    doc.save("transactions.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {/* Return button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition"
      >
        ← Return to Dashboard
      </button>

      {/* ===== Enhanced Filter Selector Panel ===== */}
      <div className="flex flex-wrap gap-4 mb-6 items-center bg-white p-4 rounded-lg shadow-lg">
        {/* Transaction Type Selector */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Transaction Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as TransactionType | "")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-gray-50"
          >
            {transactionTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type || "All Types"}
              </option>
            ))}
          </select>
        </div>

        {/* Status Selector */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as TransactionStatus | "")}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all bg-gray-50"
          >
            {transactionStatuses.map((status, idx) => (
              <option key={idx} value={status}>
                {status || "All Statuses"}
              </option>
            ))}
          </select>
        </div>

        {/* From Date Picker */}
        <div className="flex flex-col">
          <label htmlFor="fromDate" className="mb-1 text-sm font-medium text-gray-700">
            From Date
          </label>
          <input
            id="fromDate"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              bg-white hover:bg-gray-50 transition duration-150"
            placeholder="From"
          />
        </div>

        {/* To Date Picker */}
        <div className="flex flex-col">
          <label htmlFor="toDate" className="mb-1 text-sm font-medium text-gray-700">
            To Date
          </label>
          <input
            id="toDate"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              bg-white hover:bg-gray-50 transition duration-150"
            placeholder="To"
          />
        </div>

        {/* Export Buttons */}
        <div className="flex flex-row gap-2 mt-6 md:mt-0">
          <CSVLink
            data={filteredTxs.map(formatTx)}
            filename={"transactions.csv"}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
          >
            Export CSV
          </CSVLink>
          <button
            onClick={exportExcel}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600"
          >
            Export Excel
          </button>
          <button
            onClick={exportPDF}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* ===== Enhanced Transactions Table ===== */}
      <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Type</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Amount</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Currency</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTxs.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-5 text-gray-500">
                No transactions found.
              </td>
            </tr>
          ) : (
            filteredTxs.map((tx, idx) => (
              <tr key={tx.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-4">{tx.type}</td>
                <td className="py-2 px-4">{tx.amount.toFixed(2)}</td>
                <td className="py-2 px-4">{tx.currency}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      tx.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="py-2 px-4">{new Date(tx.date).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
