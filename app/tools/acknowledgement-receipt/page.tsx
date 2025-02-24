import React from "react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import AcknowledgementReceiptForm from "@/components/tools/acknowledgementReceipt/acknowledgementReceiptForm";
import { getAllARs } from "@/components/tools/actions";
import { retry } from "@/components/globals/serverUtils";
import { Card, CardBody } from "@heroui/react";

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

  const number = setNumber(records.at(-1));

  return (
    <>
      <Navbar record={account!} />

      <Card radius="none" className="py-[0.10rem] px-2">
        <CardBody>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Acknowledgment Receipt</h3>
          </div>
        </CardBody>
      </Card>

      <div className="flex justify-center items-center">
        <AcknowledgementReceiptForm number={number} />
      </div>
    </>
  );
};

export default AcknowledgmentReceipt;
