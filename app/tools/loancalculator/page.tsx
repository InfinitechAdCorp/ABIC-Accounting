"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Image from 'next/image';
import Navbar from "@/components/globals/navbar"; // Import Navbar

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalLoanAmount, setTotalLoanAmount] = useState<number | null>(null);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);

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

  useEffect(() => {
    if (interestRate === null || interestRate <= 0) {
      return;
    }

    const totalMonths = years * 12 + months;
    const monthlyInterestRate = interestRate / 100 / 12;

    const monthly = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    const totalLoanAmountWithInterest = monthly * totalMonths;

    setMonthlyPayment(monthly);
    setTotalLoanAmount(totalLoanAmountWithInterest);
  }, [loanAmount, years, months, interestRate]);

  const exportToPDF = () => {
    if (!logoBase64) return;

    const doc = new jsPDF();
    const logoWidth = 50;
    const logoHeight = 50;
    const x = (doc.internal.pageSize.width - logoWidth) / 2;
    const y = 20;

    doc.addImage(logoBase64, "JPEG", x, y, logoWidth, logoHeight);

    doc.setFont("times", "normal");
    doc.setFontSize(18);

    const title = "Loan Calculation Result";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    const titleY = 80;

    doc.text(title, titleX, titleY);

    doc.setFontSize(14);

    doc.text(`Loan Amount: Php ${loanAmount.toFixed(2)}`, 20, 100);
    const yearText = years === 1 ? "1 year" : `${years} years`;
    const loanTermText = `${yearText} and ${months} Months`;

    doc.text(`Loan Term: ${loanTermText}`, 20, 110);
    doc.text(`Interest Rate: ${interestRate}%`, 20, 120);
    doc.text(`Monthly Payment: PHP ${monthlyPayment?.toFixed(2)}`, 20, 130);
    doc.text(`Total Loan Amount: PHP ${totalLoanAmount?.toFixed(2)}`, 20, 140);

    const footerText = "This is system-generated This is system-generated This is system-generated This is system-generated This is system-generated";
    const footerY = 180;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(footerText, 20, footerY);

    doc.save("loan_calculation_result.pdf");
  };

  // Print functionality
 const printPage = () => {
  const printContent = document.getElementById("loan-results")?.outerHTML;

  // Check if printContent is available
  if (!printContent) {
    console.error("Loan results content not found.");
    return;
  }

  // Capture form data
  const loanAmountText = `Loan Amount: ₱${loanAmount.toFixed(2)}`;
  const loanTermText = `${years} Year(s) and ${months} Month(s)`;
  const interestRateText = `${interestRate}% per Year`;

  // Create a print window and format the content
  const printWindow = window.open("", "_blank");
  printWindow?.document.write(`
    <html>
      <head>
        <title>Loan Calculation Result</title>
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
            Loan Calculation Result
          </div>
          <div class="result-body">
            <p><strong>${loanAmountText}</strong></p>
            <p><strong>${loanTermText}</strong></p>
            <p><strong>${interestRateText}</strong></p>
          </div>
          <div class="form-data">
            <h3>Form Data</h3>
            <p>Loan Amount: ₱${loanAmount.toFixed(2)}</p>
            <p>Loan Term: ${years} Year(s) and ${months} Month(s)</p>
            <p>Interest Rate: ${interestRate}%</p>
          </div>
          <!-- buttons will not be printed -->
          ${printContent.replace(/<button[^>]*>.*<\/button>/g, "")}
        </div>
      </body>
    </html>
  `);
  printWindow?.document.close();
  printWindow?.focus();
  printWindow?.print();
};

  
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "₱0.00";
    return `₱${amount.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-[#F9F9F9] flex items-center justify-center py-12">
        <div className="bg-white rounded-lg shadow-lg w-full sm:w-96 p-6">
          <h1 className="text-3xl font-bold text-center text-[#9E3361] mb-6">Loan Calculator</h1>
          <p className="mb-5 text-sm text-gray-600">
            Enter your desired loan amount, term, and interest rate to calculate the monthly payment.
          </p>

          <div className="mb-4">
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
              Loan Amount (₱)
            </label>
            <input
              type="number"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#9E3361] focus:border-[#9E3361]"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="years" className="block text-sm font-medium text-gray-700">
              Loan Term (Years)
            </label>
            <select
              id="years"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#9E3361] focus:border-[#9E3361]"
            >
              {Array.from({ length: 25 }, (_, i) => i + 1).map((year) => (
                <option key={year} value={year}>
                  {year} {year === 1 ? "Year" : "Years"}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="months" className="block text-sm font-medium text-gray-700">
              Additional Months
            </label>
            <select
              id="months"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#9E3361] focus:border-[#9E3361]"
            >
              {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                <option key={month} value={month}>
                  {month} {month === 1 ? "Month" : "Months"}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
              Interest Rate (% per Year)
            </label>
            <input
              type="number"
              id="interestRate"
              value={interestRate || ""}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#9E3361] focus:border-[#9E3361]"
            />
          </div>

          {monthlyPayment !== null && (
            <div id="loan-results" className="mt-5 p-4 bg-[#9E3361] text-white rounded-lg">
              <h2 className="text-lg font-semibold">Calculation Result</h2>
              <p className="mt-2">
                Monthly Payment: <strong>{formatCurrency(monthlyPayment)}</strong>
              </p>
              <p>
                Total Loan Amount: <strong>{formatCurrency(totalLoanAmount)}</strong>
              </p>
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
                Print
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
