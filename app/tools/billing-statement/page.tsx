import React from "react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import BillingStatementForm from "@/components/tools/billingStatement/billingStatementForm";
import { getAllBSs } from "@/components/tools/actions";
import { retry } from "@/components/globals/serverUtils";

const BillingStatement = async () => {
  const { record: account } = await retry(getAccount);
  const { records } = await getAllBSs();

  const setNumber = (ar: any) => {
    let id = 500;
    if (ar) {
      id = Number(ar.number.split("-").at(-1)) + 1;
    }
    const year = new Date().getFullYear();
    const voucher = `${year}-BS-${id.toString().padStart(5, "0")}`;
    return voucher;
  };

  const number = setNumber(records.at(-1));

  return (
    <>
      <Navbar record={account!} />

      <div className="flex justify-center items-center">
        <BillingStatementForm number={number} />
      </div>
    </>
  );
};

export default BillingStatement;
