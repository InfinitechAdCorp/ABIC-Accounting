"use client";
import React, { useState, useEffect } from "react";
import { getAll as getAllBSs } from "@/components/tools/BS/actions";
import { BS } from "@prisma/client";

const Invoice = () => {
  const [date, setDate] = useState("January-25-2025");
  const [companyName, setCompanyName] = useState("Example Company Name");
  const [companyAddress, setCompanyAddress] = useState(
    "Example Company Address"
  );
  const [companyContact, setCompanyContact] = useState("09456754591");
  const [billingCompanyName, setBillingCompanyName] =
    useState("Click to add text");
  const [billingAmount, setBillingAmount] = useState("Click to add amount");

  const [items, setItems] = useState([
    { qty: 10, price: 500, name: "Item A", purpose: "For Office" },
  ]);

  const hasEdited = (initialValue: any, currentValue: any): boolean => {
    if (
      initialValue === null ||
      initialValue === undefined ||
      currentValue === null ||
      currentValue === undefined
    ) {
      return false;
    }
    return initialValue !== currentValue;
  };

  const addItemRow = () => {
    setItems([
      ...items,
      { qty: 0, price: 0, name: "", purpose: "" }, // Set qty and price as numbers
    ]);
  };

  // Function to compute total for each row
  const computeRowTotal = (price: any): number => {
    return parseFloat(String(price)) || 0;
  };

  // Function to compute grand total
  const computeGrandTotal = () => {
    return items.reduce((total, item) => {
      return total + computeRowTotal(item.price); // Just add the price
    }, 0);
  };

  const handlePrint = () => {
    const addRowButton = document.getElementById("addRowButton");
    const printButton = document.getElementById("printButton");

    if (addRowButton && printButton) {
      addRowButton.style.display = "none";
      printButton.style.display = "none";
      window.print();
      addRowButton.style.display = "block";
      printButton.style.display = "block";
    }
  };

  const [records, setRecords] = useState<BS[]>([]);

  useEffect(() => {
    const getAll = async () => {
      const response = await getAllBSs();
      setRecords(response.records);
    };

    getAll();
  }, []);

  const setNumber = (ar: any) => {
    let id = 500;
    if (ar) {
      id = Number(ar.number.split("-").at(-1)) + 1;
    }
    const year = new Date().getFullYear();
    const voucher = `${year}-AR-${id.toString().padStart(5, "0")}`;
    return voucher;
  };

  const number = setNumber(records[0]);

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl mt-20 bg-white shadow-lg rounded-2xl p-6">
          <div className="flex justify-between items-start">
            <div></div>
            <div className="flex justify-end">
              <p className="font-semibold text-gray-700">Date Issued:</p>
              <input
                type="text"
                value={number}
                onChange={(e) => setDate(e.target.value)}
                className={`focus:outline-none ml-2 ${
                  hasEdited("001234", date) ? "" : "border-b border-gray-400"
                }`}
              />
            </div>
          </div>

          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={`w-full overflow-x-auto text-center focus:outline-none ${
                  hasEdited("Company Name", companyName)
                    ? ""
                    : "border-b border-gray-400"
                }`}
              />
            </h1>
            <input
              type="text"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              className={`text-gray-600 focus:outline-none w-full overflow-x-auto text-center ${
                hasEdited("123 Main St, City, Country", companyAddress)
                  ? ""
                  : "border-b border-gray-400"
              }`}
            />
            <input
              type="text"
              value={companyContact}
              onChange={(e) => setCompanyContact(e.target.value)}
              className={`text-gray-600 focus:outline-none ${
                hasEdited("(123) 456-7890", companyContact)
                  ? ""
                  : "border-b border-gray-400"
              }`}
            />
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-lg font-bold">BILLING STATEMENT</h2>
            <p className="mt-4 text-gray-700">
              This is to certify that{" "}
              <input
                type="text"
                value={billingCompanyName}
                onChange={(e) => setBillingCompanyName(e.target.value)}
                className="focus:outline-none w-full max-w-xs mx-auto text-center"
              />
              {" is hereby billed the amount of "}
              <input
                type="text"
                value={billingAmount}
                onChange={(e) => setBillingAmount(e.target.value)}
                className="focus:outline-none w-full max-w-xs mx-auto text-center"
              />
              {
                " for the payment of website development, hosting, and related services. This billing statement serves as a formal request for payment and outlines the details of the charges incurred."
              }
            </p>
          </div>

          <div className="mt-8">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    DESCRIPTION
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    UNIT PRICE
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          setItems(
                            items.map((itm, idx) =>
                              idx === index
                                ? { ...itm, name: e.target.value }
                                : itm
                            )
                          )
                        }
                        className="w-full focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) =>
                          setItems(
                            items.map((itm, idx) =>
                              idx === index
                                ? {
                                    ...itm,
                                    price: parseFloat(e.target.value) || 0,
                                  }
                                : itm
                            )
                          )
                        }
                        className="w-full focus:outline-none"
                      />
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={computeRowTotal(item.price)} // Just show the unit price
                        readOnly
                        className="w-full focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Grand Total Row */}
            <div className="mt-4 text-right">
              <p className="font-semibold">
                Grand Total:{" "}
                <span className="font-bold text-lg">
                  {`₱ ${computeGrandTotal().toFixed(2)}`}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              id="addRowButton"
              onClick={addItemRow}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Add Row
            </button>
            <button
              id="printButton"
              onClick={handlePrint}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
