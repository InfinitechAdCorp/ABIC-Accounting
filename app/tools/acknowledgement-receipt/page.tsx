"use client";
import React, { useState } from "react";
import Navbar from "@/components/globals/navbar"; // Import Navbar

const Invoice = () => {
  // State para makapag edit
  const [arNumber, setArNumber] = useState("2025-AR-00500");
  const [companyName, setCompanyName] = useState(
    "INFINITECH Advertising Corporation"
  );
  const [companyAddress, setCompanyAddress] = useState(
    "Unit 311, Campos Rueda Building, Urban Avenue, Makati City"
  );
  const [companyContact, setCompanyContact] = useState("09456754591");
  const [name, setName] = useState("John Doe");
  const [date, setDate] = useState("January 29, 2025");
  const [address, setAddress] = useState(
    "Unit 311, Campos Rueda Building, Makati City"
  );
  const [items, setItems] = useState<
    { qty: string | number; name: string; purpose: string }[]
  >([
    { qty: 10, name: "Item A", purpose: "For Office" },
    { qty: 5, name: "Item B", purpose: "For Meeting" },
    { qty: 2, name: "Item C", purpose: "For Presentation" },
  ]);
  const [receivedBy, setReceivedBy] = useState("");
  const [issuedBy, setIssuedBy] = useState("");

  const hasEdited = (
    initialValue: string | number | null | undefined,
    currentValue: string | number | null | undefined
  ): boolean => {
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

  // Add a new item row
  const addItemRow = () => {
    setItems([...items, { qty: "", name: "", purpose: "" }]); // new row with empty fields
  };

  // Print function
  const handlePrint = () => {
    // Hide the "Add Row" and "Print" buttons
    const addRowButton = document.getElementById("addRowButton");
    const printButton = document.getElementById("printButton");

    // Check if the elements are not null before accessing their styles
    if (addRowButton && printButton) {
      addRowButton.style.display = "none";
      printButton.style.display = "none";

      window.print();

      addRowButton.style.display = "block";
      printButton.style.display = "block";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main content with top padding to ensure no overlap with fixed navbar */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl mt-20 bg-white shadow-lg rounded-2xl p-6">
          {/* AR Number */}
          <div className="flex justify-between items-start">
            <div></div>
            <div className="flex justify-end">
              <p className="font-semibold text-gray-700">AR Number:</p>
              <input
                type="text"
                value={arNumber}
                onChange={(e) => setArNumber(e.target.value)}
                className={`focus:outline-none ml-2 ${
                  hasEdited("001234", arNumber)
                    ? ""
                    : "border-b border-gray-400"
                }`}
              />
            </div>
          </div>

          {/* Header Section */}
          <div className="mt-4">
            {/* Company Details */}
            <div className="text-center">
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

            {/* Date and Name Section */}
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <p className="font-semibold text-gray-700">Name:</p>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`focus:outline-none ml-2 ${
                        hasEdited("John Doe", name)
                          ? "border-b-0"
                          : "border-b border-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex items-center mt-2">
                    <p className="font-semibold text-gray-700">Address:</p>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`focus:outline-none ml-2 ${
                        hasEdited(
                          "Unit 311, Campos Rueda Building, Makati City",
                          address
                        )
                          ? "border-b-0"
                          : "border-b border-gray-400"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center">
                  <p className="font-semibold text-gray-700">Date:</p>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`focus:outline-none ml-2 ${
                      hasEdited("January 29, 2025", date)
                        ? "border-b-0"
                        : "border-b border-gray-400"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="mt-8">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    QTY
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Items
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].qty = e.target.value;
                          setItems(newItems);
                        }}
                        className={`w-16 text-center focus:outline-none ${
                          hasEdited(10, item.qty)
                            ? ""
                            : "border-b border-gray-400"
                        }`}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].name = e.target.value;
                          setItems(newItems);
                        }}
                        className={`focus:outline-none ${
                          hasEdited("Item A", item.name)
                            ? ""
                            : "border-b border-gray-400"
                        }`}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={item.purpose}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].purpose = e.target.value;
                          setItems(newItems);
                        }}
                        className={`focus:outline-none ${
                          hasEdited("For Office", item.purpose)
                            ? ""
                            : "border-b border-gray-400"
                        }`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Button to add new row, conditionally render based on print state */}
            <button
              id="addRowButton"
              onClick={addItemRow}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add Row
            </button>
          </div>

          {/* Footer Section */}
          <div className="mt-6 flex justify-between">
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="font-semibold text-gray-700">Received By:</p>
                <input
                  type="text"
                  value={receivedBy}
                  onChange={(e) => setReceivedBy(e.target.value)}
                  className={`border-b focus:outline-none ml-2 ${
                    receivedBy !== "" ? "border-none" : "border-gray-400"
                  } w-48`}
                  style={{
                    whiteSpace: "nowrap",
                    overflowX: "auto",
                    padding: "0.5rem",
                    width: "12rem",
                  }}
                />
              </div>
              <div className="flex items-center mt-4">
                <p className="font-semibold text-gray-700">Issued By:</p>
                <input
                  type="text"
                  value={issuedBy}
                  onChange={(e) => setIssuedBy(e.target.value)}
                  className={`border-b focus:outline-none ml-2 ${
                    issuedBy !== "" ? "border-none" : "border-gray-400"
                  } w-48`}
                  style={{
                    whiteSpace: "nowrap",
                    overflowX: "auto",
                    padding: "0.5rem",
                    width: "12rem",
                  }}
                />
              </div>
            </div>

            {/* Print Button */}
            <button
              id="printButton"
              onClick={handlePrint}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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



