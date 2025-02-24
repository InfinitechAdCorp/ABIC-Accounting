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
  TClientDisplayFormat,
} from "@/components/transactionHistory/types";

const RenderCell = (column: string, record: Record) => {
  switch (column) {
    case "actions":
      return (
        <div className="relative flex justify-start items-center gap-2">
          <UpdateModal record={record} />
          <DestroyModal title="Client" action={action} id={record.id} />
          <ViewBtn
            title="View Transactions"
            url={`/transaction-history/clients/${record.id}`}
          />
        </div>
      );
    default:
      return record.display_format![column as keyof TClientDisplayFormat];
  }
};

const RenderBody = (columns: Column[], records: Record[]) => {
  return (
    <>
      {records.map((record) => (
        <TableRow key={record.id}>
          {columns.map((column) => (
            <TableCell key={column.key}>
              {RenderCell(column.key, record)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default RenderBody;
