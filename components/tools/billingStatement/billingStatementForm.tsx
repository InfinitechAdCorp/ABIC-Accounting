"use client";

import React, { useState } from "react";
import { createBS as action } from "@/components/tools/actions";
import toast from "react-hot-toast";
import { ActionResponse } from "@/components/globals/types";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { getField, capitalize } from "@/components/globals/utils";

type Props = {
  number: string;
};

const BillingStatementForm = ({ number }: Props) => {
  const [bSNumber, setbSNumber] = useState(number);
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  const [billingCompanyName, setBillingCompanyName] = useState("");

  const [items, setItems] = useState([
    { qty: 10, price: 500, name: "Item A", purpose: "For Office" },
  ]);

  const addItemRow = () => {
    setItems([...items, { qty: 0, price: 0, name: "", purpose: "" }]);
  };

  const computeRowTotal = (price: any): number => {
    return parseFloat(String(price)) || 0;
  };

  const computeGrandTotal = () => {
    return items.reduce((total, item) => {
      return total + computeRowTotal(item.price);
    }, 0);
  };

  const handlePrint = () => {
    const values = { number: bSNumber };
    action(values).then((response: ActionResponse) => {
      if (response.code == 200) {
        toast.success(response.message);
      } else {
        if (response.code == 401) {
          toast.error(response.message);
        } else if (response.code == 429) {
          toast.error(response.message);
        } else {
          const message = response.error.message;
          if (message.includes("Unique constraint")) {
            const field = getField(message);
            toast.error(`${capitalize(field)} is Already Taken`);
          } else {
            toast.error(response.message);
          }
        }
      }
    });

    const addRowButton = document.getElementById("addRowButton");
    const printButton = document.getElementById("printButton");
    const navbar = document.getElementById("navbar");

    if (addRowButton && printButton) {
      addRowButton.style.display = "none";
      printButton.style.display = "none";
      navbar!.style.display = "none";
      window.print();
      addRowButton.style.display = "block";
      printButton.style.display = "block";
      navbar!.style.display = "grid";
    }
  };

  return (
    <>
      <Card className="m-5 md:m-7 p-5 w-[50rem] rounded-none">
        <CardHeader>
          <div className="w-full">
            <div className="flex justify-end">
              <p className="font-semibold text-gray-700">BS Number:</p>
              <input
                type="text"
                value={number}
                onChange={(e) => setbSNumber(e.target.value)}
                className={`focus:outline-none ml-2`}
              />
            </div>

            <div className="flex justify-center text-center">
              <div className="mt-4">
                <h1 className="text-xl font-bold">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={`w-full overflow-x-auto text-center focus:outline-none`}
                  />
                </h1>
                <input
                  type="text"
                  placeholder="Company Address"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className={`text-gray-600 focus:outline-none w-full overflow-x-auto text-center`}
                />
                <input
                  type="text"
                  placeholder="Contact Details"
                  value={companyContact}
                  onChange={(e) => setCompanyContact(e.target.value)}
                  className={`text-gray-600 text-center focus:outline-none`}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <div className="mt-8 text-center">
            <h2 className="text-lg font-bold">BILLING STATEMENT</h2>
            <p className="mt-4 text-gray-700">
              This is to certify that{" "}
              <input
                type="text"
                placeholder="Click to add text"
                value={billingCompanyName}
                onChange={(e) => setBillingCompanyName(e.target.value)}
                className="focus:outline-none w-full max-w-xs mx-auto text-center"
              />{" "}
              is hereby billed the amount of{" "}
              <span>{`₱ ${computeGrandTotal().toFixed(2)}`}</span> for the
              payment of website development, hosting, and related services.
              This billing statement serves as a formal request for payment and
              outlines the details of the charges incurred.
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
        </CardBody>

        <CardFooter>
          <div className="w-full mt-6 flex justify-between">
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
        </CardFooter>
      </Card>
    </>
  );
};

export default BillingStatementForm;
