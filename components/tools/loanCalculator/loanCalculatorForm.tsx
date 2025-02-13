"use client";

import React, { useState, useEffect } from "react";

const LoanCalculatorForm = () => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalLoanAmount, setTotalLoanAmount] = useState<number | null>(null);

  useEffect(() => {
    if (interestRate === null || interestRate <= 0) {
      return;
    }

    const totalMonths = years * 12 + months;
    const monthlyInterestRate = interestRate / 100 / 12;

    const monthly =
      (loanAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalMonths))) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    const totalLoanAmountWithInterest = monthly * totalMonths;

    setMonthlyPayment(monthly);
    setTotalLoanAmount(totalLoanAmountWithInterest);
  }, [loanAmount, years, months, interestRate]);

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "₱0.00";
    return `₱${amount.toFixed(2)}`;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-96 p-6 m-7">
        <h1 className="text-3xl font-bold text-center mb-6">Loan Calculator</h1>
        <p className="mb-5 text-sm text-gray-600">
          Enter your desired loan amount, term, and interest rate to calculate
          the monthly payment.
        </p>

        <div className="mb-4">
          <label
            htmlFor="loanAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount (₱)
          </label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#006FEE] focus:border-[#006FEE]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="mb-4">
            <label
              htmlFor="years"
              className="block text-sm font-medium text-gray-700"
            >
              Years
            </label>
            <select
              id="years"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#006FEE] focus:border-[#006FEE]"
            >
              {Array.from({ length: 25 }, (_, i) => i + 1).map((year) => (
                <option key={year} value={year}>
                  {year} {year === 1 ? "Year" : "Years"}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="months"
              className="block text-sm font-medium text-gray-700"
            >
              Months
            </label>
            <select
              id="months"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#006FEE] focus:border-[#006FEE]"
            >
              {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                <option key={month} value={month}>
                  {month} {month === 1 ? "Month" : "Months"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="interestRate"
            className="block text-sm font-medium text-gray-700"
          >
            Interest Rate
          </label>
          <input
            type="number"
            id="interestRate"
            value={interestRate || ""}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#006FEE] focus:border-[#006FEE]"
          />
        </div>

        {monthlyPayment !== null && (
          <div
            id="loan-results"
            className="mt-5 p-4 bg-[#006FEE] text-white rounded-lg"
          >
            <h2 className="text-lg font-semibold">Calculation Result</h2>
            <p className="mt-2">
              Monthly Payment: <strong>{formatCurrency(monthlyPayment)}</strong>
            </p>
            <p>
              Total Loan Amount:{" "}
              <strong>{formatCurrency(totalLoanAmount)}</strong>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default LoanCalculatorForm;
