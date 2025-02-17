"use client";

import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Select,
  SelectItem,
  CardFooter,
} from "@heroui/react";
import { formatNumber } from "@/components/globals/utils";
import { ActionResponse } from "@/components/globals/types";

type Props = {
  number: string;
};

const Test = ({ number }: Props) => {
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
      <Card className="m-5 md:m-7 p-5 w-[50rem] rounded-none">
        <CardHeader>
          <div className="w-full flex justify-end">
            <p className="font-semibold text-gray-700">AR Number:</p>
            <input
              type="text"
              value={arNumber}
              onChange={(e) => setArNumber(e.target.value)}
              className="ml-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* <div className="flex justify-center">
            <div className="mt-4">
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
          </div> */}
        </CardHeader>

        <CardBody></CardBody>

        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export default Test;
