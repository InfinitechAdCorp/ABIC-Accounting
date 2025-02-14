"use client";

import React, { useState, useEffect } from "react";
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

const LoanCalculatorForm = () => {
  const [amount, setAmount] = useState(0);
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [rate, setRate] = useState(0);

  const [monthly, setMonthly] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalMonths = years * 12 + months;
    const monthlyRate = rate / 100 / 12;

    const monthlyPayment =
      (amount * (monthlyRate * (1 + monthlyRate) ** totalMonths)) /
      ((1 + monthlyRate) ** totalMonths - 1);
    const totalPayment = monthlyPayment * totalMonths;

    setMonthly(monthlyPayment);
    setTotal(totalPayment);
  }, [amount, years, months, rate]);

  const isValid = amount != 0 && years != 0 && months != 0 && rate != 0;

  return (
    <>
      <Card className="m-5 md:m-7 p-5 w-[25rem]">
        <CardHeader>
          <div className="w-full">
            <div className="text-center">
              <h3 className="text-sm md:text-3xl font-semibold mb-3">
                Loan Calculator
              </h3>
            </div>

            <div>
              <small className="text-gray-600">
                Enter your desired loan amount, term, and interest rate to
                calculate the monthly payment.
              </small>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <Input
            className="mb-3"
            type="number"
            size="md"
            variant="bordered"
            label="Amount"
            labelPlacement="outside"
            placeholder="Enter Amount"
            onChange={(e) => {
              const value = Number(e.target.value);
              setAmount(value);
            }}
          />

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Select
              size="md"
              variant="bordered"
              label="Years"
              labelPlacement="outside"
              placeholder="Select Years"
              onChange={(e) => {
                const value = Number(e.target.value);
                setYears(value);
              }}
            >
              {Array.from({ length: 26 }).map((_, index) => (
                <SelectItem
                  key={index}
                  textValue={`${index} ${index == 1 ? "Year" : "Years"}`}
                >
                  {index} {index == 1 ? "Year" : "Years"}
                </SelectItem>
              ))}
            </Select>

            <Select
              size="md"
              variant="bordered"
              label="Months"
              labelPlacement="outside"
              placeholder="Select Months"
              onChange={(e) => {
                const value = Number(e.target.value);
                setMonths(value);
              }}
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <SelectItem
                  key={index}
                  textValue={`${index} ${index == 1 ? "Month" : "Months"}`}
                >
                  {index} {index == 1 ? "Month" : "Months"}
                </SelectItem>
              ))}
            </Select>
          </div>

          <Input
            className="mb-3"
            type="number"
            size="md"
            variant="bordered"
            label="Interest Rate"
            labelPlacement="outside"
            placeholder="Enter Interest Rate"
            onChange={(e) => {
              const value = Number(e.target.value);
              setRate(value);
            }}
          />
        </CardBody>

        {isValid && (
          <CardFooter>
            <div className="w-full bg-[#006FEE] rounded-lg">
              <div className="text-center my-5">
                <h3 className="text-sm text-white md:text-lg font-semibold mb-2">
                  Calculation Results
                </h3>
                <div>
                  <h3 className="text-white">
                    Monthly Payment: <strong>{formatNumber(monthly)}</strong>
                  </h3>
                  <h3 className="text-white">
                    Total Loan Amount: <strong>{formatNumber(total)}</strong>
                  </h3>
                </div>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default LoanCalculatorForm;
