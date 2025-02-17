"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Select,
  SelectItem,
  CardFooter,
  Button,
} from "@heroui/react";

const HeroForm = () => {
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
            >
              <SelectItem key="Daily">Daily</SelectItem>
              <SelectItem key="Weekly">Weekly</SelectItem>
              <SelectItem key="Semi-Monthly">Semi-Monthly</SelectItem>
              <SelectItem key="Monthly">Monthly</SelectItem>
              <SelectItem key="Annually">Annually</SelectItem>
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
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Representation Allowance"
                  labelPlacement="outside"
                  placeholder="Enter Representation Allowance"
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Transportation Allowance"
                  labelPlacement="outside"
                  placeholder="Enter Transportation Allowance"
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
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Fixed Housing Allowance"
                  labelPlacement="outside"
                  placeholder="Enter Fixed Housing Allowance"
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Other Compensation"
                  labelPlacement="outside"
                  placeholder="Enter Other Compensation"
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
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Profit Sharing"
                  labelPlacement="outside"
                  placeholder="Enter Profit Sharing"
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Directors Fee"
                  labelPlacement="outside"
                  placeholder="Enter Directors Fee"
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
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Hazarad Pay"
                  labelPlacement="outside"
                  placeholder="Enter Hazarad Pay"
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Overtime Pay"
                  labelPlacement="outside"
                  placeholder="Enter Overtime Pay"
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
                  label="Other Compensation"
                  labelPlacement="outside"
                  placeholder="Enter Other Compensation"
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Holiday Pay"
                  labelPlacement="outside"
                  placeholder="Enter Holiday Pay"
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Overtime Pay"
                  labelPlacement="outside"
                  placeholder="Enter Overtime Pay"
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
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Hazard Pay"
                  labelPlacement="outside"
                  placeholder="Enter Hazard Pay"
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Non Taxable 13th Month Pay"
                  labelPlacement="outside"
                  placeholder="Enter Non Taxable 13th Month Pay"
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
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Contributions"
                  labelPlacement="outside"
                  placeholder="Enter Contributions"
                />

                <Input
                  className="mb-3"
                  type="number"
                  size="md"
                  variant="bordered"
                  label="Other Non Taxable Income"
                  labelPlacement="outside"
                  placeholder="Enter Other Non Taxable Income"
                />
              </div>
            </div>
          </CardBody>

          <CardFooter>
            <div className="w-full rounded-lg">
              <div className="text-center my-5">
                <h3 className="text-sm md:text-lg font-semibold mb-2">
                  Calculation Results
                </h3>
                <div className="mb-3">
                  <h3>
                    Gross Compensation Income: <strong>0.00</strong>
                  </h3>
                  <h3>
                    Total Non-Taxable Income: <strong>0.00</strong>
                  </h3>
                  <h3>
                    Net Taxable Income: <strong>0.00</strong>
                  </h3>
                </div>
                <div className="flex justify-center gap-3">
                  <Button color="primary">Print</Button>
                  <Button color="primary">Export</Button>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </>
    </>
  );
};

export default HeroForm;
