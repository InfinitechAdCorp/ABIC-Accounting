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

type Rates = {
  [key: string]: number;
};

const CurrencyConverterForm = () => {
  const [currencies, setCurrencies] = useState<Rates>({});
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("PHP");
  const [to, setTo] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${from}`
      );
      const data = await response.json();
      setCurrencies(data.rates);
    };

    fetchCurrencies();
  }, [from]);

  useEffect(() => {
    if (currencies) {
      const converted = amount * currencies[to];
      setConvertedAmount(converted);
    }
  }, [amount, currencies, to]);

  const isValid = amount != 0 && from != "" && to != "";

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

          <Select
            className="mb-3"
            size="md"
            variant="bordered"
            label="From"
            labelPlacement="outside"
            placeholder="Select Currency to Convert From"
            defaultSelectedKeys={[from]}
            onChange={(e) => {
              const value = e.target.value;
              setFrom(value);
            }}
          >
            {Object.keys(currencies).map((currency) => (
              <SelectItem key={currency}>{currency}</SelectItem>
            ))}
          </Select>

          <Select
            size="md"
            variant="bordered"
            label="To"
            labelPlacement="outside"
            placeholder="Select Currency to Convert To"
            defaultSelectedKeys={[to]}
            onChange={(e) => {
              const value = e.target.value;
              setTo(value);
            }}
          >
            {Object.keys(currencies).map((currency) => (
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
                <div>
                  <h3 className="text-white">
                    Converted Amount:{" "}
                    <strong>{formatNumber(convertedAmount)}</strong>
                  </h3>
                  <h3 className="text-white">
                    Rate:{" "}
                    <strong>
                      1 {from} = {currencies[to]} {to}
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
