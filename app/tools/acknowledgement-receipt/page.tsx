import React from "react";
import Navbar from "@/components/globals/navbar";
import AcknowledgementReceiptForm from "@/components/tools/acknowledgementReceipt/acknowledgementReceiptForm";
import { getAllARs } from "@/components/tools/actions";
import { Card, CardBody } from "@heroui/react";
import { get as getCookies } from "@/components/globals/auth";

const AcknowledgmentReceipt = async () => {
  const { record: cookies } = await getCookies();
  const { records } = await getAllARs();

  const setNumber = (number: string | undefined) => {
    let id = 500;
    if (number) {
      id = Number(number.split("-").at(-1)) + 1;
    }
    const year = new Date().getFullYear();
    const voucherNumber = `${year}-AR-${id.toString().padStart(5, "0")}`;
    return voucherNumber;
  };

  const number = setNumber(records.at(-1)?.number);

  return (
    <>
      <Navbar record={cookies} />

      <Card radius="none" className="py-[0.10rem] px-2" id="headerContent">
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
