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
  const [values, setValues] = useState({
    amount: 0,
    years: 0,
    months: 0,
    rate: 0,
    monthly: 0,
    total: 0,
  });

  const setter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const key = e.target.name;
    const value = Number(e.target.value);
    setValues({ ...values, [key]: value });
  };

  useEffect(() => {
    const totalMonths = values.years * 12 + values.months;
    const monthlyRate = values.rate / 100 / 12;

    const monthlyPayment =
      (values.amount * (monthlyRate * (1 + monthlyRate) ** totalMonths)) /
      ((1 + monthlyRate) ** totalMonths - 1);
    const totalPayment = monthlyPayment * totalMonths;

    setValues({ ...values, monthly: monthlyPayment, total: totalPayment });
  }, [values.amount, values.years, values.months, values.rate]);

  const isValid = values.amount != 0 && values.months != 0 && values.rate != 0;

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
            name="amount"
            className="mb-3"
            type="number"
            size="md"
            variant="bordered"
            label="Amount"
            labelPlacement="outside"
            placeholder="Enter Amount"
            onChange={setter}
          />

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Select
              name="years"
              size="md"
              variant="bordered"
              label="Years"
              labelPlacement="outside"
              placeholder="Select Years"
              onChange={setter}
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
              name="months"
              size="md"
              variant="bordered"
              label="Months"
              labelPlacement="outside"
              placeholder="Select Months"
              onChange={setter}
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
            name="rate"
            className="mb-3"
            type="number"
            size="md"
            variant="bordered"
            label="Interest Rate"
            labelPlacement="outside"
            placeholder="Enter Interest Rate"
            onChange={setter}
          />
        </CardBody>

        {isValid && (
          <CardFooter>
            <div className="w-full bg-[#006FEE] rounded-lg">
              <div className="text-center my-5">
                <h3 className="text-sm text-white md:text-lg font-semibold mb-2">
                  Calculation Results
                </h3>
                <div className="text-white">
                  <h3>
                    Monthly Payment: <strong>{formatNumber(values.monthly)}</strong>
                  </h3>
                  <h3>
                    Total Loan Amount: <strong>{formatNumber(values.total)}</strong>
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
