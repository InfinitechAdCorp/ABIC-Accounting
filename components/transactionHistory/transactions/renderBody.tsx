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
import { isPending } from "@/components/globals/utils";

const getRecord = (records: Record[], id: string) => {
  const record = records.find((record) => {
    return record.id == id;
  }) as Record;
  return record;
};

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
      return <ViewProofModal url={value || "/no-image.png"} />;
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
      {rows.map((row) => (
        <TableRow key={row.id} className={setColor(getRecord(records, row.id))}>
          {columns.map((column) => (
            <TableCell key={column.key}>
              {RenderCell(
                getRecord(records, row.id),
                column.key,
                row,
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
