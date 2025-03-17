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

type Values = {
  currencies: { [key: string]: number };
  amount: number,
  from: string,
  to: string,
  convertedAmount: number,
};

const CurrencyConverterForm = () => {
  const [values, setValues] = useState<Values>({
    currencies: {},
    amount: 0,
    from: "PHP",
    to: "USD",
    convertedAmount: 0
  })

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const key = e.target.name;
    let value: string | number = e.target.value
    if (["from", "to"].includes(key)) {
      value = Number(e.target.value);
    }
    setValues({ ...values, [key]: value });
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${values.from}`
      );
      const { rates: currencies } = await response.json();
      setValues({ ...values, currencies: currencies });
    };

    fetchCurrencies();
  }, [values.from]);

  useEffect(() => {
    if (values.currencies) {
      const converted = values.amount * values.currencies[values.to];
      setValues({ ...values, convertedAmount: converted });
    }
  }, [values.amount, values.currencies, values.to]);

  const isValid = values.amount != 0 && values.from != "" && values.to != "";

  return (
    <>
      <Card className="m-5 md:m-7 p-5 w-[25rem]">
        <CardHeader>
          <div className="w-full">
            <div className="text-center">
              <h3 className="text-sm md:text-3xl font-semibold mb-3">
                Currency Converter
              </h3>
            </div>

            <div>
              <small className="text-gray-600">
                Enter an amount and select currencies to convert.
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
            onChange={onChange}
          />

          <Select
            name="from"
            className="mb-3"
            size="md"
            variant="bordered"
            label="From"
            labelPlacement="outside"
            placeholder="Select Currency to Convert From"
            defaultSelectedKeys={[values.from]}
            onChange={onChange}
          >
            {Object.keys(values.currencies).map((currency) => (
              <SelectItem key={currency}>{currency}</SelectItem>
            ))}
          </Select>

          <Select
            name="to"
            size="md"
            variant="bordered"
            label="To"
            labelPlacement="outside"
            placeholder="Select Currency to Convert To"
            defaultSelectedKeys={[values.to]}
            onChange={onChange}
          >
            {Object.keys(values.currencies).map((currency) => (
              <SelectItem key={currency}>{currency}</SelectItem>
            ))}
          </Select>
        </CardBody>

        {isValid && (
          <CardFooter>
            <div className="w-full bg-[#006FEE] rounded-lg">
              <div className="text-center my-5">
                <h3 className="text-sm text-white md:text-lg font-semibold mb-1">
                  Conversion Results
                </h3>
                <div className="text-white">
                  <h3>
                    Converted Amount:{" "}
                    <strong>{formatNumber(values.convertedAmount)}</strong>
                  </h3>
                  <h3>
                    Rate:{" "}
                    <strong>
                      1 {values.from} = {values.currencies[values.to]} {values.to}
                    </strong>
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

export default CurrencyConverterForm;
