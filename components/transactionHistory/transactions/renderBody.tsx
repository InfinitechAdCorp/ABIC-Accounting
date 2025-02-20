"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import UpdateModal from "@/components/transactionHistory/transactions/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import SetStatusModal from "@/components/transactionHistory/transactions/setStatusModal";
import {
  destroy,
  setStatus,
} from "@/components/transactionHistory/transactions/actions";
import { Column } from "@/components/globals/types";
import {
  Transaction as Record,
  TransactionDisplayFormat,
  TClient,
} from "@/components/transactionHistory/types";
import { isPending } from "@/components/globals/utils";
import ViewProofBtn from "@/components/transactionHistory/transactions/viewProofBtn";

const setColor = (record: Record) => {
  let color;
  if (isPending(record.date)) {
    color = "text-[#F5A524]";
  }
  if (record.status == "Cancelled") {
    color = "text-[#F31260]";
  }
  return color;
};

const RenderCell = (
  column: string,
  record: Record,
  dependencies: {
    tClients: TClient[];
  }
) => {
  switch (column) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal record={record} tClients={dependencies.tClients} />
          <DestroyModal title="Transaction" action={destroy} id={record.id} />
          <SetStatusModal
            action={setStatus}
            id={record.id}
            status={record.status}
          />
        </div>
      );
    case "proof":
      const value = record.display_format![column as keyof TransactionDisplayFormat];
      return <ViewProofBtn url={value || "/no-image.png"} />;
    default:
      return record.display_format![column as keyof TransactionDisplayFormat];
  }
};

const RenderBody = (
  columns: Column[],
  records: Record[],
  dependencies: {
    tClients: TClient[];
  }
) => {
  return (
    <>
      {records.map((record) => (
        <TableRow key={record.id} className={setColor(record)}>
          {columns.map((column) => (
            <TableCell key={column.key}>
              {RenderCell(
                column.key,
                record,
                dependencies
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default RenderBody;
