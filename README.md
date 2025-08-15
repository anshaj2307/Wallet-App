# Wallet-App

A full-featured Wallet application built with React, TypeScript, Redux Toolkit, and Tailwind CSS. It provides secure login with mobile and OTP, wallet management in multiple currencies, funds addition and withdrawal, currency exchange, transaction history with filters, and export options including CSV, Excel, and PDF. React Toastify is used for alerts and notifications.

---

## Features

- Mobile number login with OTP verification
- Multi-currency wallet dashboard with live currency conversion
- Add funds, withdraw funds with bank details and validation
- Exchange currency with fixed exchange rates
- View and filter transaction history by type, status, and date range
- Export transactions as CSV, Excel, and PDF files
- Responsive and modern UI with Tailwind CSS
- Toast notifications using React Toastify
- Protected routes with React Router
- State management with Redux Toolkit

---

## Installation

1. Clone the repository:

git clone https://github.com/yourusername/wallet-app.git
cd wallet-app


2. Install dependencies:

npm install


3. Run the development server:

npm start


4. Open in browser 

[http://localhost:3000](http://localhost:3000)



## Available Scripts

- `npm start` - Run the app in development mode
- `npm run build` - Build the app for production
- `npm test` - Launch test runner in watch mode

---

## Project Structure

walletapp/
├── src/
│ ├── components/
│ │ ├── Auth/
│ │ │ └── Login.tsx
│ │ ├── Dashboard/
│ │ │ ├── WalletDashboard.tsx
│ │ │ ├── AddFunds.tsx
│ │ │ └── ExchangeCurrency.tsx
│ │ ├── Withdraw/
│ │ │ └── Withdraw.tsx
│ │ ├── Transactions/
│ │ │ └── TransactionsPage.tsx
│ ├── hooks/
│ │ ├── useWallet.tsx
│ │ └── useTransactions.tsx
│ ├── store/
│ │ └── walletSlice.ts
│ ├── utils/
│ │ ├── exchangeRates.ts
│ │ ├── localStorage.ts
│ │ └── validators.ts
│ ├── types/
│ │ └── index.ts
│ ├── App.tsx
│ └── index.tsx
├── package.json
└── README.md

text

---

## Dependencies

- react
- react-dom
- react-router-dom
- react-redux
- typescript
- reduxjs/toolkit
- react-redux
- tailwindcss
- react-toastify
- react-csv
- xlsx
- jspdf
- jspdf-autotable

---

## Usage

- Login using mobile number and OTP (use dummy OTP: `1234`)
- Add or withdraw funds in supported currencies
- Exchange between currencies with fixed rates
- View and filter transaction history with export options
- Receive real-time toast notifications for actions

---

## Contribution

Contributions are welcome! Please open issues or pull requests for improvements.