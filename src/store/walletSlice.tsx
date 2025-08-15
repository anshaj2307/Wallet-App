import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wallet } from "../types";

const initialState: Wallet = {
  balances: { INR: 1000, USD: 0, EUR: 0, GBP: 0 }
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addFunds(
      state,
      action: PayloadAction<{ currency: keyof Wallet["balances"]; amount: number }>
    ) {
      const { currency, amount } = action.payload;
      state.balances[currency] += amount;
    },
  }
});

export const { addFunds } = walletSlice.actions;
export default walletSlice.reducer;
