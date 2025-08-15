// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import WalletDashboard from "./components/Dashboard/WalletDashboard";
import AddFunds from "./components/Dashboard/AddFunds";
import Withdraw from "./components/Withdraw/Withdraw";
import ExchangeCurrency from "./components/Dashboard/ExchangeCurrency";
import TransactionsPage from "./components/Transactions/TransactionsPage";
import { getUser } from "./utils/localStorage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const user = getUser();
  return user && user.isAuthenticated ? children : <Navigate to="/" replace />;
};

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <WalletDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddFunds />
              </PrivateRoute>
            }
          />
          <Route
            path="/withdraw"
            element={
              <PrivateRoute>
                <Withdraw />
              </PrivateRoute>
            }
          />
          <Route
            path="/exchange"
            element={
              <PrivateRoute>
                <ExchangeCurrency />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <TransactionsPage />
              </PrivateRoute>
            }
          />
          {/* Redirect any unknown route to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
