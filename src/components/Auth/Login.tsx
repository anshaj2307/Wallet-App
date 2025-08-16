// src/components/Auth/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [mobile, setMobile] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = () => {
    if (mobile.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number!");
      return;
    }
    setStep(2);
    toast.info("OTP sent successfully.");
  };

  const handleVerifyOTP = () => {
    if (otp !== "1234") {
      toast.error("Invalid OTP. Please try 1234.");
      return;
    }

    // Save user with auth flag in localStorage
    localStorage.setItem("user", JSON.stringify({ isAuthenticated: true, mobile }));

    toast.success("Login successful! Welcome.");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl mb-6 font-bold text-blue-700">Login</h2>
      {step === 1 && (
        <>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-300 rounded"
            placeholder="Enter mobile number"
            maxLength={10}
          />
          <button
            onClick={handleSendOTP}
            className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-300 rounded"
            placeholder="Enter OTP"
            maxLength={4}
          />
          <button
            onClick={handleVerifyOTP}
            className="w-full bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
