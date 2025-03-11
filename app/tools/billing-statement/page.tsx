import React from "react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import BillingStatementForm from "@/components/tools/billingStatement/billingStatementForm";
import { getAllBSs } from "@/components/tools/actions";
import { retry } from "@/components/globals/serverUtils";
import { Card, CardBody } from "@heroui/react";

const BillingStatement = async () => {
  const { record: account } = await retry(getAccount);
  const { records } = await getAllBSs();

  const setNumber = (ar: any) => {
    let id = 500;
    if (ar) {
      id = Number(ar.number.split("-").at(-1)) + 1;
    }
    const year = new Date().getFullYear();
    const voucherNumber = `${year}-BS-${id.toString().padStart(5, "0")}`;
    return voucherNumber;
  };

  const number = setNumber(records.at(-1));

  return (
    <>
      <Navbar />

      <Card radius="none" className="py-[0.10rem] px-2">
        <CardBody>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Billing Statement</h3>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-center items-center">
        <BillingStatementForm number={number} />
      </div>
    </>
  );
};

export default BillingStatement;
