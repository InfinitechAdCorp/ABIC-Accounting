"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Navbar from "@/components/globals/navbar"; // Import Navbar

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>("PHP");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<any>({});
  const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);

  useEffect(() => {
    // Fetch currency information
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

  // Fetch the logo to include in the PDF
  useEffect(() => {
    const fetchLogoBase64 = async () => {
      const response = await fetch("/logo.jpg");
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoBase64(reader.result as string);
      };
      reader.readAsDataURL(blob);
    };

    fetchLogoBase64();
  }, []);

  // Print function
  const printPage = () => {
    const printContent = document.getElementById("currency-converter-result")?.outerHTML;

    // Check if printContent is available
    if (!printContent) {
      console.error("Content not found.");
      return;
    }

    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`
      <html>
        <head>
          <title>Currency Conversion Result</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .result-container { padding: 20px; background-color: #F9F9F9; }
            .result-header { font-size: 20px; font-weight: bold; }
            .result-body { margin-top: 15px; }
            .form-data { margin-top: 20px; }
            .buttons { display: none; } /* Hide the buttons */
          </style>
        </head>
        <body>
          <div class="result-container">
            <div class="result-header">
              Currency Conversion Result
            </div>
            <div class="result-body">
              <p><strong>Amount: ₱${amount.toFixed(2)}</strong></p>
              <p><strong>From Currency: ${fromCurrency}</strong></p>
              <p><strong>To Currency: ${toCurrency}</strong></p>
              <p><strong>Converted Amount: ${convertedAmount ? convertedAmount.toFixed(2) : "Calculating..."}</strong></p>
            </div>
          </div>
          ${printContent.replace(/<button[^>]*>.*<\/button>/g, "")}
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
  };

  // Export to PDF function
  const exportToPDF = () => {
    if (!logoBase64) return;

    const doc = new jsPDF();
    const logoWidth = 50;
    const logoHeight = 50;
    const x = (doc.internal.pageSize.width - logoWidth) / 2;
    const y = 20;

    // Add logo to the PDF
    doc.addImage(logoBase64, "JPEG", x, y, logoWidth, logoHeight);

    doc.setFont("times", "normal");
    doc.setFontSize(18);
    const title = "Currency Conversion Result";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    const titleY = 80;

    doc.text(title, titleX, titleY);
    doc.setFontSize(14);

    let currentY = 100;

    doc.text(`Amount: ${fromCurrency} ${amount.toFixed(2)}`, 20, currentY);
    currentY += 10;
    doc.text(
      `Converted Amount: ${toCurrency} ${convertedAmount ? convertedAmount.toFixed(2) : "Calculating..."}`,
      20,
      currentY
    );

    const footerText = "This is system-generated";
    const footerY = 180;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(footerText, 20, footerY);

    doc.save("currency_conversion_result.pdf");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-[#F9F9F9] flex items-center justify-center py-12">
        <div className="bg-white rounded-lg shadow-lg w-full sm:w-96 p-6">
          <h1 className="text-3xl font-bold text-center text-[#9E3361] mb-6">
            Currency Converter
          </h1>
          <p className="mb-5 text-sm text-gray-600">
            Enter an amount and select currencies to convert.
          </p>

          {/* Amount Input */}
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
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#9E3361] focus:border-[#9E3361]"
            />
          </div>

          {/* From Currency Dropdown */}
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
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#9E3361] focus:border-[#9E3361]"
            >
              {allCurrencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          {/* To Currency Dropdown */}
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
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#9E3361] focus:border-[#9E3361]"
            >
              {allCurrencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          {/* Currency Choice Display */}
          <div className="mt-2 text-sm text-gray-600">
            <p>Converting from: {fromCurrency}</p>
            <p>Converting to: {toCurrency}</p>
          </div>

          {/* Result Display */}
          {convertedAmount !== null && (
            <div
              id="currency-converter-result"
              className="mt-5 p-4 bg-[#9E3361] text-white rounded-lg"
            >
              <h2 className="text-lg font-semibold">Converted Amount</h2>
              <p className="mt-2">
                Converted Amount:{" "}
                <strong>
                  {convertedAmount ? convertedAmount.toFixed(2) : "Calculating..."}
                </strong>{" "}
                {toCurrency}
              </p>
              {/* Export to PDF and Print Buttons */}
              <button
                onClick={exportToPDF}
                className="mt-4 w-full bg-[#9E3361] text-white rounded-lg py-2"
              >
                Export to PDF
              </button>
              <button
                onClick={printPage}
                className="mt-4 w-full bg-[#9E3361] text-white rounded-lg py-2"
              >
                Print Result
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
