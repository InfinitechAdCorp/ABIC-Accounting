"use client";

import React, { useState, useEffect } from "react";

const CurrencyConverterForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>("PHP");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<any>({});
  const [allCurrencies, setAllCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      setCurrencies(data.rates);
      setAllCurrencies(Object.keys(data.rates));
    };

    fetchCurrencies();
  }, [fromCurrency]);

  useEffect(() => {
    if (!currencies[toCurrency]) return;

    const converted = amount * currencies[toCurrency];
    setConvertedAmount(converted);
  }, [amount, currencies, toCurrency]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-96 p-6 m-7">
        <h1 className="text-3xl font-bold text-center mb-6">
          Currency Converter
        </h1>
        <p className="mb-5 text-sm text-gray-600">
          Enter an amount and select currencies to convert.
        </p>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount (₱)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#006FEE] focus:border-[#006FEE]"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fromCurrency"
            className="block text-sm font-medium text-gray-700"
          >
            From Currency
          </label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#006FEE] focus:border-[#006FEE]"
          >
            {allCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="toCurrency"
            className="block text-sm font-medium text-gray-700"
          >
            To Currency
          </label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#006FEE] focus:border-[#006FEE]"
          >
            {allCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {convertedAmount !== null && (
          <div
            id="currency-converter-result"
            className="mt-5 p-4 bg-[#006FEE] text-white rounded-lg"
          >
            <h2 className="text-lg font-semibold">Converted Amount</h2>
            <p className="mt-2">
              Converted Amount:{" "}
              <strong>{convertedAmount.toFixed(2) || 0}</strong> {toCurrency}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CurrencyConverterForm;
