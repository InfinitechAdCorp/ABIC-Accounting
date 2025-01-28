"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Navbar from "@/components/globals/navbar";

interface NonTaxableIncomeMWE {
  holidayPay: number;
  overtimePay: number;
  nightShiftDifferential: number;
  hazardPay: number;
  nonTaxable13thMonthPay: number;
  deMinimisBenefits: number;
  contributions: number;
  otherNonTaxableIncome: number;
}

interface Fields {
  basicSalary: number;
  representationAllowance: number;
  transportationAllowance: number;
  costOfLivingAllowance: number;
  fixedHousingAllowance: number;
  otherTaxableRegularCompensation: number;
  commission: number;
  profitSharing: number;
  directorsFee: number;
  taxable13thMonthPay: number;
  hazardPay: number;
  overtimePay: number;
  otherTaxableSupplementaryCompensation: number;
  statutoryMinimumWage: number;
  nonTaxableIncomeMWE: NonTaxableIncomeMWE;
}

interface Results {
  grossCompensationIncome: number;
  totalNonTaxableIncome: number;
  netTaxableIncome: number;
}

const TaxCalculator = () => {
  const [payrollPeriod, setPayrollPeriod] = useState<string>("Semi-Monthly");
  const [fields, setFields] = useState<Fields>({
    basicSalary: 0,
    representationAllowance: 0,
    transportationAllowance: 0,
    costOfLivingAllowance: 0,
    fixedHousingAllowance: 0,
    otherTaxableRegularCompensation: 0,
    commission: 0,
    profitSharing: 0,
    directorsFee: 0,
    taxable13thMonthPay: 0,
    hazardPay: 0,
    overtimePay: 0,
    otherTaxableSupplementaryCompensation: 0,
    statutoryMinimumWage: 0,
    nonTaxableIncomeMWE: {
      holidayPay: 0,
      overtimePay: 0,
      nightShiftDifferential: 0,
      hazardPay: 0,
      nonTaxable13thMonthPay: 0,
      deMinimisBenefits: 0,
      contributions: 0,
      otherNonTaxableIncome: 0,
    },
  });

  const [results, setResults] = useState<Results>({
    grossCompensationIncome: 0,
    totalNonTaxableIncome: 0,
    netTaxableIncome: 0,
  });

  useEffect(() => {
    const computeResults = () => {
      const {
        basicSalary,
        representationAllowance,
        transportationAllowance,
        costOfLivingAllowance,
        fixedHousingAllowance,
        otherTaxableRegularCompensation,
        commission,
        profitSharing,
        directorsFee,
        taxable13thMonthPay,
        hazardPay,
        overtimePay,
        otherTaxableSupplementaryCompensation,
        statutoryMinimumWage,
        nonTaxableIncomeMWE,
      } = fields;

      let grossCompensationIncome =
        basicSalary +
        representationAllowance +
        transportationAllowance +
        costOfLivingAllowance +
        fixedHousingAllowance +
        otherTaxableRegularCompensation +
        commission +
        profitSharing +
        directorsFee +
        taxable13thMonthPay +
        hazardPay +
        overtimePay +
        otherTaxableSupplementaryCompensation;

      switch (payrollPeriod) {
        case "Semi-Monthly":
          grossCompensationIncome *= 2;
          break;
        case "Monthly":
          grossCompensationIncome *= 1;
          break;
        case "Weekly":
          grossCompensationIncome *= 4;
          break;
        case "Daily":
          grossCompensationIncome *= 22;
          break;
        case "Annually":
          grossCompensationIncome *= 12;
          break;
        default:
          break;
      }

      const totalNonTaxableIncome =
        statutoryMinimumWage +
        Object.values(nonTaxableIncomeMWE).reduce(
          (acc, value) => acc + value,
          0
        );

      const netTaxableIncome = grossCompensationIncome - totalNonTaxableIncome;

      setResults({
        grossCompensationIncome,
        totalNonTaxableIncome,
        netTaxableIncome,
      });
    };

    computeResults();
  }, [fields, payrollPeriod]);

  const handleChange = (field: string, value: number) => {
    if (field in fields.nonTaxableIncomeMWE) {
      setFields((prevFields) => ({
        ...prevFields,
        nonTaxableIncomeMWE: {
          ...prevFields.nonTaxableIncomeMWE,
          [field]: value,
        },
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [field]: value,
      }));
    }
  };

  const printPage = () => {
    window.print();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const logoWidth = 50;
    const logoHeight = 50;
    const x = (doc.internal.pageSize.width - logoWidth) / 2; // Center horizontally
    const y = 20; // Position it at the top

    // Load the logo image from the public folder
    const logoUrl = "/logo.jpg"; //  the logo is placed in the public folder

    const img = new Image();
    img.src = logoUrl;
    img.onload = () => {
      doc.addImage(img, "JPEG", x, y, logoWidth, logoHeight);

      // Set title for the document
      doc.setFont("times", "normal");
      doc.setFontSize(18);
      const title = "Tax Computation Summary";
      const titleWidth = doc.getTextWidth(title);
      const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
      const titleY = 80;

      doc.text(title, titleX, titleY);

      // Set tax computation details
      doc.setFontSize(14);
      const contentY = titleY + 20;

      doc.text(`Payroll Period: ${payrollPeriod}`, 20, contentY);
      doc.text(
        `Gross Compensation Income: PHP ${results.grossCompensationIncome.toFixed(
          2
        )}`,
        20,
        contentY + 10
      );
      doc.text(
        `Total Non-Taxable/Exempt Income: PHP ${results.totalNonTaxableIncome.toFixed(
          2
        )}`,
        20,
        contentY + 20
      );
      doc.text(
        `Net Taxable Compensation Income: PHP ${results.netTaxableIncome.toFixed(
          2
        )}`,
        20,
        contentY + 30
      );

      // Footer
      const footerText =
        "This is system-generated. This document was automatically generated.";
      const footerY = doc.internal.pageSize.height / 2 + 40; // Position footer in the lower half of the page
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(footerText, 20, footerY);

      doc.save("tax_computation_summary.pdf");
    };
  };

  const taxableCompensationFields = [
    "basicSalary",
    "representationAllowance",
    "transportationAllowance",
    "costOfLivingAllowance",
    "fixedHousingAllowance",
    "otherTaxableRegularCompensation",
  ];

  const supplementaryCompensationFields = [
    "commission",
    "profitSharing",
    "directorsFee",
    "taxable13thMonthPay",
    "hazardPay",
    "overtimePay",
    "otherTaxableSupplementaryCompensation",
  ];

  const nonTaxableCompensationFields = [
    "statutoryMinimumWage",
    "holidayPay",
    "overtimePay",
    "nightShiftDifferential",
    "hazardPay",
    "nonTaxable13thMonthPay",
    "deMinimisBenefits",
    "contributions",
    "otherNonTaxableIncome",
  ];

  const renderFields = (fieldsList: string[]) => {
    return fieldsList.map((field) => {
      // Check if field is part of nonTaxableIncomeMWE
      const isNonTaxableField = field in fields.nonTaxableIncomeMWE;

      return (
        <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0" key={field}>
          <label
            htmlFor={field}
            className="block text-sm font-medium text-gray-700 capitalize"
          >
            {field.replace(/([A-Z])/g, " $1").trim()}
          </label>
          <input
            type="number"
            id={field}
            value={
              isNonTaxableField
                ? (fields.nonTaxableIncomeMWE[
                    field as keyof NonTaxableIncomeMWE
                  ] as number)
                : (fields[field as keyof Fields] as number)
            }
            onChange={(e) => handleChange(field, Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#9E3361] focus:border-[#9E3361]"
          />
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-[#F9F9F9] flex items-center justify-center py-12">
        <div className="bg-white rounded-lg shadow-lg w-full sm:w-[90%] lg:w-[70%] p-6">
          <h1 className="text-3xl font-bold text-center text-[#9E3361] mb-6">
            Tax Calculator
          </h1>

          <div className="mb-4">
            <label
              htmlFor="payrollPeriod"
              className="block text-sm font-medium text-gray-700"
            >
              Payroll Period
            </label>
            <select
              id="payrollPeriod"
              value={payrollPeriod}
              onChange={(e) => setPayrollPeriod(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#9E3361] focus:border-[#9E3361]"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Semi-Monthly">Semi-Monthly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </select>
          </div>

          <h3 className="text-xl font-semibold text-[#9E3361] mt-4 mb-2">
            Taxable Compensation Income
          </h3>
          <div className="flex flex-wrap -mx-2 mb-4">
            {renderFields(taxableCompensationFields)}
          </div>

          <h3 className="text-xl font-semibold text-[#9E3361] mt-4 mb-2">
            Supplementary Compensation Income
          </h3>
          <div className="flex flex-wrap -mx-2 mb-4">
            {renderFields(supplementaryCompensationFields)}
          </div>

          <h3 className="text-xl font-semibold text-[#9E3361] mt-4 mb-2">
            Non-Taxable/Exempt Compensation Income
          </h3>
          <div className="flex flex-wrap -mx-2 mb-6">
            {renderFields(nonTaxableCompensationFields)}
          </div>

          <div className="flex flex-col items-center mt-6 bg-[#9E3361]">
            <h2 className="text-xl font-bold text-white">Results</h2>
            <div className="mt-4">
              <p className="text-white">
                Gross Compensation Income: {results.grossCompensationIncome}
              </p>
              <p className="text-white">
                Total Non-Taxable Income: {results.totalNonTaxableIncome}
              </p>
              <p className="text-white">
                Net Taxable Income: {results.netTaxableIncome}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={printPage}
              className="bg-[#9E3361] text-white px-4 py-2 rounded-lg hover:bg-[#9E3361]"
            >
              Print Page
            </button>
            <button
              onClick={exportToPDF}
              className="bg-[#9E3361] text-white px-4 py-2 rounded-lg hover:bg-[#9E3361]"
            >
              Export to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
