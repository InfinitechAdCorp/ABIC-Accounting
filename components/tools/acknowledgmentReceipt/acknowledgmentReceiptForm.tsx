"use client";

import React, { useState, useRef } from "react";
import { createAR as action } from "@/components/tools/actions";
import toast from "react-hot-toast";
import { ActionResponse } from "@/components/globals/types";

type Props = {
  number: string;
};

const AcknowledgmentReceiptForm = ({ number }: Props) => {
  const [arNumber, setArNumber] = useState(number);
  const [companyName, setCompanyName] = useState("Company Name");
  const [companyAddress, setCompanyAddress] = useState("Company Address");
  const [companyContact, setCompanyContact] = useState("Contact Details");
  const [receivedBy, setReceivedBy] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [items, setItems] = useState([{ name: "Item A", purpose: "1000" }]);

  const addRowBtnRef = useRef<HTMLButtonElement>(null);
  const printBtnRef = useRef<HTMLButtonElement>(null);

  const addItemRow = () => {
    setItems([...items, { name: "", purpose: "" }]);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + (parseFloat(item.purpose) || 0),
    0
  );

  const handlePrint = () => {
    const values = { number: arNumber };
    action(values).then((response: ActionResponse) => {
      if (response.code == 200) {
        toast.success(response.message);
      } else {
        if (response.code == 429) {
          console.log(response.errors);
        } else {
          console.log(response.error);
        }
        toast.error(response.message);
      }
    });

    addRowBtnRef.current!.style.display = "none";
    printBtnRef.current!.style.display = "none";
    document.getElementById("navbar")!.style.display = "none";
    window.print();
    addRowBtnRef.current!.style.display = "block";
    printBtnRef.current!.style.display = "block";
    document.getElementById("navbar")!.style.display = "grid";
  };

  return (
    <>
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 m-7">
        <div className="flex justify-between items-start">
          <div></div>
          <div className="flex justify-end">
            <p className="font-semibold text-gray-700">AR Number:</p>
            <input
              type="text"
              value={arNumber}
              onChange={(e) => setArNumber(e.target.value)}
              className="ml-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <h1 className="text-lg font-bold">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full text-center focus:outline-none"
            />
          </h1>
          <input
            type="text"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            className="text-gray-600 focus:outline-none w-full text-center"
          />
          <input
            type="text"
            value={companyContact}
            onChange={(e) => setCompanyContact(e.target.value)}
            className="text-gray-600 focus:outline-none text-center"
          />
        </div>

        {/* Table for Items */}
        <div className="mt-8">
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 w-3/4 text-left">
                  Particulars
                </th>
                <th className="border border-gray-300 px-4 py-2 w-1/4 text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 w-3/4">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].name = e.target.value;
                        setItems(newItems);
                      }}
                      className="w-full focus:outline-none text-gray-700"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 w-1/4 text-right">
                    <input
                      type="text"
                      value={item.purpose}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].purpose = e.target.value;
                        setItems(newItems);
                      }}
                      className="w-full text-right focus:outline-none text-gray-700"
                    />
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-200 font-bold">
                <td className="border border-gray-300 px-4 py-2 text-right">
                  Total:
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {totalAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <button
            ref={addRowBtnRef}
            onClick={addItemRow}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition text-sm"
          >
            Add Row
          </button>
        </div>

        {/* Payment Instructions */}
        <div className="mt-6 text-sm text-gray-700">
          <p>
            <strong>For check payment,</strong> please make check payable to{" "}
            <strong>{companyName}</strong>. <br />
            <strong>For bank deposit,</strong> kindly see below bank account
            details for reference. Once deposited, send us the deposit slip for
            payment reference.
          </p>
        </div>

        {/* Bank Details Table (Left Aligned) */}
        <div className="mt-2 text-sm">
          <table className="w-1/2 border border-gray-300 text-left">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Bank Details:
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Security Bank Pasay Taft Branch
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Account Name:
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ABIC REALTY CORPORATION
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  Account Number:
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  0000043381202
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between">
          <div className="flex flex-col text-sm">
            <div className="flex items-center">
              <p className="font-semibold text-gray-700">Received By:</p>
              <input
                type="text"
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
                className="ml-2 focus:outline-none text-gray-700"
              />
            </div>
            <div className="flex items-center mt-4">
              <p className="font-semibold text-gray-700">Issued By:</p>
              <input
                type="text"
                value={issuedBy}
                onChange={(e) => setIssuedBy(e.target.value)}
                className="ml-2 focus:outline-none text-gray-700"
              />
            </div>
          </div>
          <button
            ref={printBtnRef}
            onClick={handlePrint}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
          >
            Print
          </button>
        </div>
      </div>
    </>
  );
};

export default AcknowledgmentReceiptForm;
