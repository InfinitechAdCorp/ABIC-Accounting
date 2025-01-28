"use client";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Image from 'next/image';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalLoanAmount, setTotalLoanAmount] = useState<number | null>(null);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);

  useEffect(() => {
    // Convert the logo to base64 format to use in jsPDF
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

    const totalMonths = years * 12 + months; // Convert years and months to total months
    const monthlyInterestRate = interestRate / 100 / 12; // Convert interest rate to decimal per month

    //loan formula
    const monthly = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    const totalLoanAmountWithInterest = monthly * totalMonths;

    setMonthlyPayment(monthly);
    setTotalLoanAmount(totalLoanAmountWithInterest);
  }, [loanAmount, years, months, interestRate]);

  // export the result to PDF
  const exportToPDF = () => {
    if (!logoBase64) return; // Wait until logo is loaded
  
    const doc = new jsPDF();
    const logoWidth = 50;
    const logoHeight = 50;
    const x = (doc.internal.pageSize.width - logoWidth) / 2; // Center horizontally
    const y = 20; // Position it at the top
  
    // Add the logo to the PDF
    doc.addImage(logoBase64, "JPEG", x, y, logoWidth, logoHeight);
  
    // Set title for the half coupon bond-like format
    doc.setFont("times", "normal");
    doc.setFontSize(18);
  
    // Center the "Loan Calculation Result" text horizontally
    const title = "Loan Calculation Result";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    const titleY = 80; // Adjusted position for the title
  
    doc.text(title, titleX, titleY);
  
    // Set the loan details, keeping it within half-page
    doc.setFontSize(14);
    doc.text(`Loan Amount: ₱${loanAmount.toFixed(2)}`, 20, 100);
    doc.text(`Loan Term: ${years} Years and ${months} Months`, 20, 110);
    doc.text(`Interest Rate: ${interestRate}%`, 20, 120);
    doc.text(`Monthly Payment: ₱${monthlyPayment?.toFixed(2)}`, 20, 130);
    doc.text(`Total Loan Amount: ₱${totalLoanAmount?.toFixed(2)}`, 20, 140);
  
    // Add the "system-generated" text in the footer
    const footerText = "This is system-generated This is system-generated This is system-generated This is system-generated This is system-generated";
    const footerY = 180; // Position footer within the lower half of the page
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Reset text color to black for footer
    doc.text(footerText, 20, footerY);
  
    // Save the PDF
    doc.save("loan_calculation_result.pdf");
  };

  //currency format
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "₱0.00";
    return `₱${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen flex items-center justify-center py-12">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-96 p-6">
        <h1 className="text-3xl font-bold text-center text-[#9E3361] mb-6">Loan Calculator</h1>
        <p className="mb-5 text-sm text-gray-600">
          Enter your desired loan amount, term, and interest rate to calculate the monthly payment.
        </p>

        {/* Loan Amount Input */}
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

        {/* Years Input */}
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

        {/* Months Input */}
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

        {/* Interest Rate Input */}
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

        {/* Result Display */}
        {monthlyPayment !== null && (
          <div className="mt-5 p-4 bg-[#9E3361] text-white rounded-lg">
            <h2 className="text-lg font-semibold">Calculation Result</h2>
            <p className="mt-2">
              Monthly Payment: <strong>{formatCurrency(monthlyPayment)}</strong>
            </p>
            <p>
              Total Loan Amount: <strong>{formatCurrency(totalLoanAmount)}</strong>
            </p>
            {/* Export to PDF Button */}
            <button
              onClick={exportToPDF}
              className="mt-4 w-full bg-[#9E3361] text-white rounded-lg py-2"
            >
              Export to PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
