"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import UpdateModal from "@/components/collectionMonitoring/cClients/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import ViewBtn from "@/components/globals/viewBtn";
import { destroy } from "@/components/collectionMonitoring/cClients/actions";
import { Column } from "@/components/globals/types";
import {
  CClient as Record,
  CClientRow as Row,
} from "@/components/collectionMonitoring/types";

const RenderCell = (record: Record, column: string, row: Row) => {
  switch (column) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal record={record} />
          <DestroyModal title="Client" action={destroy} id={record.id} />
          <ViewBtn
            title="View Collections"
            url={`/collection-monitoring/clients/${record.id}`}
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
