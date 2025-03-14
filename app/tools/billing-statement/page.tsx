import React from "react";
import Navbar from "@/components/globals/navbar";
import BillingStatementForm from "@/components/tools/billingStatement/billingStatementForm";
import { getAllBSs } from "@/components/tools/actions";
import { Card, CardBody } from "@heroui/react";
import { get as getCookies } from "@/components/globals/auth";

const BillingStatement = async () => {
  const { record: cookies } = await getCookies();
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
      <Navbar record={cookies} />

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
