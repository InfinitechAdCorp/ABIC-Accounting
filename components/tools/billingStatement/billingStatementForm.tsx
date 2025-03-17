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
  const [values, setValues] = useState({
    bsNumber: number,
    companyName: "",
    companyAddress: "",
    companyContact: "",
    billingCompanyName: "",
  })

  const [items, setItems] = useState([
    { qty: 10, price: 500, name: "Item A", purpose: "For Office" },
  ]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const key = e.target.name;
    const value = e.target.value
    setValues({ ...values, [key]: value });
  };

  const addItemRow = () => {
    setItems([...items, { qty: 0, price: 0, name: "", purpose: "" }]);
  };

  const computeGrandTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.price || 0);
    }, 0);
  };

  const handlePrint = () => {
    const printValues = { number: values.bsNumber };
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

    const ids = ["addRowBtn", "printBtn", "navbar", "headerContent"]
    ids.forEach((id) => {
      const element = document.getElementById(id)
      element!.style.display = "none"
    })
    window.print();
    ids.forEach((id) => {
      const element = document.getElementById(id)
      element!.style.display = "grid"
    })
  };

  return (
    <>
      <Card className="m-5 md:m-7 p-5 w-[50rem] rounded-none">
        <CardHeader>
          <div className="w-full">
            <div className="flex justify-end">
              <p className="font-semibold text-gray-700">BS Number:</p>
              <input
                name="bsNumber"
                type="text"
                value={values.bsNumber}
                onChange={onChange}
                className={`focus:outline-none ml-2`}
              />
            </div>

            <div className="flex justify-center text-center">
              <div className="mt-4">
                <h1 className="text-xl font-bold">
                  <input
                    name="companyName"
                    type="text"
                    placeholder="Company Name"
                    value={values.companyName}
                    onChange={onChange}
                    className={`w-full overflow-x-auto text-center focus:outline-none`}
                  />
                </h1>
                <input
                  name="companyAddress"
                  type="text"
                  placeholder="Company Address"
                  value={values.companyAddress}
                  onChange={onChange}
                  className={`text-gray-600 focus:outline-none w-full overflow-x-auto text-center`}
                />
                <input
                  name="companyContact"
                  type="text"
                  placeholder="Contact Details"
                  value={values.companyContact}
                  onChange={onChange}
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
                name="billingCompanyName"
                type="text"
                placeholder="Click to add text"
                value={values.billingCompanyName}
                onChange={onChange}
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
                        value={item.price || 0}
                        readOnly
                        className="w-full focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
              id="addRowBtn"
              onClick={addItemRow}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Add Row
            </button>
            <button
              id="printBtn"
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
