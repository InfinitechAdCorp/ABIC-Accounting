"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import { Column } from "@/components/globals/types";
import {
  Listing as Record,
  ListingRow as Row,
} from "@/components/listings/types";
import UpdateModal from "@/components/listings/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import { destroy } from "@/components/listings/actions";

const RenderCell = (record: Record, column: string, row: Row) => {
  switch (column) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal record={record} />
          <DestroyModal title="Listing" action={destroy} id={record.id} />
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
        <TableRow key={index} className={records[index].status == "Closed" ? "text-[#006FEE]" : "text-[#F31260]"}>
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
