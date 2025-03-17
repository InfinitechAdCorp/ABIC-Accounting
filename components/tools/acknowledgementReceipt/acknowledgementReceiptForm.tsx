"use client";

import React, { useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { createAR as action } from "@/components/tools/actions";
import toast from "react-hot-toast";
import { ActionResponse } from "@/components/globals/types";
import { getField, capitalize } from "@/components/globals/utils";

type Props = {
  number: string;
};

const AcknowledgementReceiptForm = ({ number }: Props) => {
  const [values, setValues] = useState({
    arNumber: number,
    companyName: "",
    companyAddress: "",
    companyContact: "",
    bankDetails: "",
    accountName: "",
    accountNumber: "",
    receivedBy: "",
    issuedBy: "",
  })

  const [items, setItems] = useState([{ name: "Item A", purpose: "1000" }]);

  const addRowBtnRef = useRef<HTMLButtonElement>(null);
  const printBtnRef = useRef<HTMLButtonElement>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const key = e.target.name;
    const value: string = e.target.value
    setValues({ ...values, [key]: value });
  };

  const addItemRow = () => {
    setItems([...items, { name: "", purpose: "" }]);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + (parseFloat(item.purpose) || 0),
    0
  );

  const handlePrint = () => {
    const printValues = { number: values.arNumber };
    action(printValues).then((response: ActionResponse) => {
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

    addRowBtnRef.current!.style.display = "none";
    printBtnRef.current!.style.display = "none";
    document.getElementById("navbar")!.style.display = "none";
    document.getElementById("headerContent")!.style.display = "none";

    window.print();

    addRowBtnRef.current!.style.display = "block";
    printBtnRef.current!.style.display = "block";
    document.getElementById("navbar")!.style.display = "grid";
    document.getElementById("headerContent")!.style.display = "grid";
  };

  return (
    <>
      <Card className="m-5 md:m-7 p-5 w-[50rem] rounded-none">
        <CardHeader>
          <div className="w-full">
            <div className="flex justify-end">
              <p className="font-semibold">AR Number:</p>
              <input
                name="arNumber"
                type="text"
                value={values.arNumber}
                onChange={onChange}
                className="ml-2 focus:outline-none"
              />
            </div>

            <div className="flex justify-center text-center">
              <div className="mt-4">
                <h1 className="text-lg font-bold">
                  <input
                    name="companyName"
                    type="text"
                    placeholder="Company Name"
                    value={values.companyName}
                    onChange={onChange}
                    className="w-full text-center focus:outline-none"
                  />
                </h1>
                <input
                  name="companyAddress"
                  type="text"
                  placeholder="Company Address"
                  value={values.companyAddress}
                  onChange={onChange}
                  className="focus:outline-none w-full text-center"
                />
                <input
                  name="companyContact"
                  type="text"
                  placeholder="Contact Details"
                  value={values.companyContact}
                  onChange={onChange}
                  className="focus:outline-none text-center"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody>
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
                        className="w-full focus:outline-none"
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
                        className="w-full text-right focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}

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

          <div className="mt-6 text-sm">
            <p>
              <strong>For check payment,</strong> please make check payable to{" "}
              <strong>{values.companyName}</strong>. <br />
              <strong>For bank deposit,</strong> kindly see below bank account
              details for reference. Once deposited, send us the deposit slip
              for payment reference.
            </p>
          </div>

          <div className="mt-2 text-sm">
            <table className="w-1/2 border border-gray-300 text-left">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Bank Details:
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      name="bankDetails"
                      type="text"
                      value={values.bankDetails}
                      onChange={onChange}
                      className="w-full focus:outline-none text-center"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Account Name:
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      name="accountName"
                      type="text"
                      value={values.accountName}
                      onChange={onChange}
                      className="w-full focus:outline-none text-center"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    Account Number:
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      name="accountNumber"
                      type="text"
                      value={values.accountNumber}
                      onChange={onChange}
                      className="w-full focus:outline-none text-center"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>

        <CardFooter>
          <div className="w-full mt-6 flex justify-between">
            <div className="flex flex-col text-sm">
              <div className="flex items-center">
                <p className="font-semibold">Received By:</p>
                <input
                  name="receivedBy"
                  type="text"
                  value={values.receivedBy}
                  onChange={onChange}
                  className="ml-2 focus:outline-none"
                />
              </div>
              <div className="flex items-center mt-4">
                <p className="font-semibold">Issued By:</p>
                <input
                  name="issuedBy"
                  type="text"
                  value={values.issuedBy}
                  onChange={onChange}
                  className="ml-2 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <button
                ref={printBtnRef}
                onClick={handlePrint}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
              >
                Print
              </button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default AcknowledgementReceiptForm;
