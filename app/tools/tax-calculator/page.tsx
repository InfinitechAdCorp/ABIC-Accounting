import React from "react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import TaxCalculatorForm from "@/components/tools/taxCalculator/taxCalculatorForm";
import { retry } from "@/components/globals/serverUtils";
import { Card, CardBody } from "@heroui/react";

const TaxCalculator = async () => {
  const { record: account } = await retry(getAccount);

  return (
    <>
      <Navbar record={account!} />

      <Card radius="none" className="py-[0.10rem] px-2">
        <CardBody>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Tax Calculator</h3>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-center">
        <TaxCalculatorForm />
      </div>
    </>
  );
};

export default TaxCalculator;
