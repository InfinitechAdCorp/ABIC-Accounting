"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import UpdateModal from "@/components/transactionHistory/tClients/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import ViewBtn from "@/components/globals/viewBtn";
import { destroy as action } from "@/components/transactionHistory/tClients/actions";
import { Column } from "@/components/globals/types";
import {
  TClient as Record,
  TClientRow as Row,
} from "@/components/transactionHistory/types";

const RenderCell = (record: Record, column: string, row: Row) => {
  switch (column) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal record={record} />
          <DestroyModal title="Client" action={action} id={record.id} />
          <ViewBtn
            title="View Transactions"
            url={`/transaction-history/clients/${record.id}`}
          />
        </div>
      );
    default:
      return row[column as keyof Row];
  }
};

const RenderBody = (records: Record[], columns: Column[], rows: Row[]) => {
  return (
    <>
      {rows.map((row, index) => (
        <TableRow key={index}>
          {columns.map((column) => (
            <TableCell key={column.key}>
              {RenderCell(records[index], column.key, row)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default RenderBody;
