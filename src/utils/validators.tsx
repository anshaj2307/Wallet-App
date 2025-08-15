export function validateMobile(mobile: string): boolean {
  return /^\d{10}$/.test(mobile);
}

export function validateOTP(otp: string): boolean {
  return otp === '1234'; // Dummy OTP
}

export function validateBankDetails(bankName: string, accountNumber: string, ifsc: string): boolean {
  const bankValid = bankName.length > 2;
  const accValid = /^\d{9,18}$/.test(accountNumber);
  const ifscValid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  return bankValid && accValid && ifscValid;
}
