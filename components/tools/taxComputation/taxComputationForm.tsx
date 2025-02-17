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

const TaxComputationForm = () => {
  const [period, setPeriod] = useState(2);
  const [fields, setFields] = useState({
    basic: 0,
    representation: 0,
    transportation: 0,
    living: 0,
    housing: 0,
    otherTaxable: 0,
    commission: 0,
    sharing: 0,
    directors: 0,
    taxable13th: 0,
    hazard: 0,
    oT: 0,
    otherSupplementary: 0,
    statutory: 0,
    nonTaxable: {
      nonTaxableHoliday: 0,
      nonTaxableOT: 0,
      differential: 0,
      nonTaxableHazard: 0,
      nonTaxable13th: 0,
      deMinimis: 0,
      contributions: 0,
      otherNonTaxable: 0,
    },
  });

  const [results, setResults] = useState({
    grossCompensationIncome: 0,
    totalNonTaxableIncome: 0,
    netTaxableIncome: 0,
  });

  useEffect(() => {
    const computeResults = () => {
      const {
        basic,
        representation,
        transportation,
        living,
        housing,
        otherTaxable,
        commission,
        sharing,
        directors,
        taxable13th,
        hazard,
        oT,
        otherSupplementary,
        statutory,
        nonTaxable,
      } = fields;

      let grossCompensationIncome =
        basic +
        representation +
        transportation +
        living +
        housing +
        otherTaxable +
        commission +
        sharing +
        directors +
        taxable13th +
        hazard +
        oT +
        otherSupplementary;

      grossCompensationIncome *= period;

      const totalNonTaxableIncome =
        statutory +
        Object.values(nonTaxable).reduce((acc, value) => acc + value, 0);

      const netTaxableIncome = grossCompensationIncome - totalNonTaxableIncome;

      setResults({
        grossCompensationIncome,
        totalNonTaxableIncome,
        netTaxableIncome,
      });
    };

    computeResults();
  }, [fields, period]);

  const handleChange = (field: string, value: number) => {
    if (field in fields.nonTaxable) {
      setFields((prevFields) => ({
        ...prevFields,
        nonTaxable: {
          ...prevFields.nonTaxable,
          [field]: value,
        },
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [field]: value,
      }));
    }
  };

  return (
    <>
      <>
        <Card className="m-5 md:m-7 p-5 w-[83rem]">
          <CardHeader>
            <div className="w-full">
              <div className="text-center">
                <h3 className="text-sm md:text-3xl font-semibold mb-3">
                  Tax Calculator
                </h3>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <Select
              className="mb-5"
              size="md"
              variant="bordered"
              label="Payroll Period"
              labelPlacement="outside"
              placeholder="Select Payroll Period"
              defaultSelectedKeys={[`${period}`]}
              onChange={(e) => {
                const value = Number(e.target.value);
                setPeriod(value);
              }}
            >
              <SelectItem key="22">Daily</SelectItem>
              <SelectItem key="4">Weekly</SelectItem>
              <SelectItem key="2">Semi-Monthly</SelectItem>
              <SelectItem key="1">Monthly</SelectItem>
              <SelectItem key="12">Annually</SelectItem>
            </Select>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                Taxable Compensation Income
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-1">
                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Basic Salary"
                  labelPlacement="outside"
                  placeholder="Enter Basic Salary"
                  onChange={(e) =>
                    handleChange("basic", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Representation Allowance"
                  labelPlacement="outside"
                  placeholder="Enter Representation Allowance"
                  onChange={(e) =>
                    handleChange("representation", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Transportation Allowance"
                  labelPlacement="outside"
                  placeholder="Enter Transportation Allowance"
                  onChange={(e) =>
                    handleChange("transportation", Number(e.target.value))
                  }
                />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-1">
                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Cost of Living Allowance"
                  labelPlacement="outside"
                  placeholder="Enter Cost of Living Allowance"
                  onChange={(e) =>
                    handleChange("living", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Fixed Housing Allowance"
                  labelPlacement="outside"
                  placeholder="Enter Fixed Housing Allowance"
                  onChange={(e) =>
                    handleChange("housing", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Other Compensation"
                  labelPlacement="outside"
                  placeholder="Enter Other Compensation"
                  onChange={(e) =>
                    handleChange("otherTaxable", Number(e.target.value))
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                Supplementary Compensation Income
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-1">
                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Commission"
                  labelPlacement="outside"
                  placeholder="Enter Commission"
                  onChange={(e) =>
                    handleChange("commission", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Profit Sharing"
                  labelPlacement="outside"
                  placeholder="Enter Profit Sharing"
                  onChange={(e) =>
                    handleChange("sharing", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Directors Fee"
                  labelPlacement="outside"
                  placeholder="Enter Directors Fee"
                  onChange={(e) =>
                    handleChange("directors", Number(e.target.value))
                  }
                />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-1">
                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Taxable 13th Month Pay"
                  labelPlacement="outside"
                  placeholder="Enter Taxable 13th Month Pay"
                  onChange={(e) =>
                    handleChange("taxable13th", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Hazard Pay"
                  labelPlacement="outside"
                  placeholder="Enter Hazard Pay"
                  onChange={(e) =>
                    handleChange("hazard", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Overtime Pay"
                  labelPlacement="outside"
                  placeholder="Enter Overtime Pay"
                  onChange={(e) => handleChange("oT", Number(e.target.value))}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Other Compensation"
                  labelPlacement="outside"
                  placeholder="Enter Other Compensation"
                  onChange={(e) =>
                    handleChange("otherSupplementary", Number(e.target.value))
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                Non-Taxable / Exempt Compensation Income
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-1">
                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Statutory Minimum Wage"
                  labelPlacement="outside"
                  placeholder="Enter Statutory Minimum Wage"
                  onChange={(e) =>
                    handleChange("statutory", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Holiday Pay"
                  labelPlacement="outside"
                  placeholder="Enter Holiday Pay"
                  onChange={(e) =>
                    handleChange("nonTaxableHoliday", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Overtime Pay"
                  labelPlacement="outside"
                  placeholder="Enter Overtime Pay"
                  onChange={(e) =>
                    handleChange("nonTaxableOT", Number(e.target.value))
                  }
                />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-1">
                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Night Shift Differential"
                  labelPlacement="outside"
                  placeholder="Enter Night Shift Differential"
                  onChange={(e) =>
                    handleChange("differential", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Hazard Pay"
                  labelPlacement="outside"
                  placeholder="Enter Hazard Pay"
                  onChange={(e) =>
                    handleChange("nonTaxableHazard", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Non Taxable 13th Month Pay"
                  labelPlacement="outside"
                  placeholder="Enter Non Taxable 13th Month Pay"
                  onChange={(e) =>
                    handleChange("nonTaxable13th", Number(e.target.value))
                  }
                />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-1">
                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="De Minimis Benefits"
                  labelPlacement="outside"
                  placeholder="Enter De Minimis Benefits"
                  onChange={(e) =>
                    handleChange("deMinimis", Number(e.target.value))
                  }
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Contributions"
                  labelPlacement="outside"
                  placeholder="Enter Contributions"
                  onChange={(e) =>
                    handleChange("contributions", Number(e.target.value))
                  }
                />

                <Input
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Other Non Taxable Income"
                  labelPlacement="outside"
                  placeholder="Enter Other Non Taxable Income"
                  onChange={(e) =>
                    handleChange("otherNonTaxable", Number(e.target.value))
                  }
                />
              </div>
            </div>
          </CardBody>

          <CardFooter>
            <div className="w-full flex justify-center">
              <div className="bg-[#006FEE] rounded-lg px-16">
                <div className="text-center my-5">
                  <h3 className="text-sm md:text-lg font-semibold mb-2 text-white">
                    Calculation Results
                  </h3>
                  <div className="mb-3 text-white">
                    <h3>
                      Gross Compensation Income:{" "}
                      <strong>
                        {formatNumber(results.grossCompensationIncome)}
                      </strong>
                    </h3>
                    <h3>
                      Total Non-Taxable Income:{" "}
                      <strong>
                        {formatNumber(results.totalNonTaxableIncome)}
                      </strong>
                    </h3>
                    <h3>
                      Net Taxable Income:{" "}
                      <strong>{formatNumber(results.netTaxableIncome)}</strong>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </>
    </>
  );
};

export default TaxComputationForm;
