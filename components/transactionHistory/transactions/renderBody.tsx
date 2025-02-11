"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import UpdateModal from "@/components/transactionHistory/transactions/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import SetStatusModal from "@/components/transactionHistory/transactions/setStatusModal";
import ViewProofModal from "@/components/transactionHistory/transactions/viewProofModal";
import {
  destroy,
  setStatus,
} from "@/components/transactionHistory/transactions/actions";
import { Column } from "@/components/globals/types";
import {
  Transaction as Record,
  TransactionRow as Row,
  TClient,
} from "@/components/transactionHistory/types";

const RenderCell = (
  record: Record,
  column: string,
  row: Row,
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
      const value = row[column as keyof Row];
      return <ViewProofModal url={(value as string) || "/no-image.png"} />;
    default:
      return row[column as keyof Row];
  }
};

const RenderBody = (
  records: Record[],
  columns: Column[],
  rows: Row[],
  dependencies: {
    tClients: TClient[];
  }
) => {
  return (
    <>
      {rows.map((row, index) => (
        <TableRow
          key={index}
          className={
            records[index].status == "Cancelled" ? "text-[#F31260]" : ""
          }
        >
          {columns.map((column) => (
            <TableCell key={column.key}>
              {RenderCell(records[index], column.key, row, dependencies)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default RenderBody;
