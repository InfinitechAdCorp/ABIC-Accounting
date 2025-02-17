import React from "react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import AcknowldegmentReceiptForm from "@/components/tools/acknowledgmentReceipt/acknowledgmentReceiptForm";
import Test from "@/components/tools/acknowledgmentReceipt/test";
import { getAllARs } from "@/components/tools/actions";
import { retry } from "@/components/globals/serverUtils";

const AcknowledgmentReceipt = async () => {
  const { record: account } = await retry(getAccount);
  const { records } = await getAllARs();

  const setNumber = (ar: any) => {
    let id = 500;
    if (ar) {
      id = Number(ar.number.split("-").at(-1)) + 1;
    }
    const year = new Date().getFullYear();
    const voucher = `${year}-AR-${id.toString().padStart(5, "0")}`;
    return voucher;
  };

  const number = setNumber(records.at(-1))

  return (
    <>
      <Navbar record={account!} />

      <div className="flex justify-center items-center">
        <AcknowldegmentReceiptForm number={number} />
      </div>

      <div className="flex justify-center items-center">
        <Test number={number} />
      </div>
    </>
  );
};

export default AcknowledgmentReceipt;
