"use client";
import React, { useState } from "react";
import Navbar from "@/components/globals/navbar"; // Import Navbar

const Invoice = () => {
  const [companyName, setCompanyName] = useState("Example Company Name");
  const [companyAddress, setCompanyAddress] = useState("Example Company Address");
  const [companyContact, setCompanyContact] = useState("09456754591");
  const [billingCompanyName, setBillingCompanyName] = useState("Click to add text");
  const [billingAmount, setBillingAmount] = useState("Click to add amount");

  const [items, setItems] = useState([
    { qty: 10, price: 500, name: "Item A", purpose: "For Office" },
  ]);

  const addItemRow = () => {
    setItems([...items, { qty: 0, price: 0, name: "", purpose: "" }]);
  };

  const computeGrandTotal = () => {
    return items.reduce((total, item) => total + (parseFloat(item.price) || 0), 0);
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

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl mt-20 bg-white shadow-lg rounded-2xl p-6">
          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full text-center focus:outline-none border-b border-gray-400"
              />
            </h1>
            <input
              type="text"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              className="text-gray-600 focus:outline-none w-full text-center border-b border-gray-400"
            />
            <input
              type="text"
              value={companyContact}
              onChange={(e) => setCompanyContact(e.target.value)}
              className="text-gray-600 focus:outline-none border-b border-gray-400"
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
              />{" "}
              is hereby billed the amount of{" "}
              <input
                type="text"
                value={billingAmount}
                onChange={(e) => setBillingAmount(e.target.value)}
                className="focus:outline-none w-full max-w-xs mx-auto text-center"
              />{" "}
              for the payment of website development, hosting, and related services.
            </p>
          </div>
          <div className="mt-2 text-sm">
  <div className="flex justify-between w-full">
    {/* Table for Date and Bill To */}
   <div className="w-full max-w-sm ml-0">
  <table className="w-full border border-gray-300 text-left">
    <tbody>
      <tr>
        <td className="border border-gray-300 px-2 py-2 font-semibold w-1/4">Date:</td>
        <td className="border border-gray-300 px-2 py-2 w-3/4">
          <input
            type="text"
            className="w-full focus:outline-none border border-gray-300 rounded px-2 h-8"
            placeholder="Enter Date"
          />
        </td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-2 py-2 font-semibold">Bill To:</td>
        <td className="border border-gray-300 px-2 py-2">
          <input
            type="text"
            className="w-full h-8 px-2 focus:outline-none border border-gray-300 rounded"
            placeholder="Enter Additional Info"
          />
        </td>
      </tr>
      <tr>
        <td className="border border-gray-300 px-2 py-2 font-semibold" colSpan="2">
          <input
            type="text"
            className="w-full h-16 px-2 focus:outline-none border border-gray-300 rounded"
            placeholder="Enter Additional Info"
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>



    {/* BS #: Positioned at the right end of the row */}
    <div className="w-1/5 text-right">
      <label className="font-semibold mr-4">BS #:</label>
      <input
        type="text"
        className="px-2 py-1 focus:outline-none border border-gray-300 rounded"
        placeholder="Enter BS #"
      />
    </div>
  </div>
</div>


          <div className="mt-8">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left w-3/4">PARTICULARS</th>
                  <th className="border border-gray-300 px-4 py-2 text-left w-1/4">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 w-3/4">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          setItems(
                            items.map((itm, idx) =>
                              idx === index ? { ...itm, name: e.target.value } : itm
                            )
                          )
                        }
                        className="w-full focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 w-1/4">
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          setItems(
                            items.map((itm, idx) =>
                              idx === index ? { ...itm, price: parseFloat(e.target.value) || 0 } : itm
                            )
                          )
                        }
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
                <span className="font-bold text-lg">₱ {computeGrandTotal().toFixed(2)}</span>
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
