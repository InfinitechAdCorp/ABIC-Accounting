"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import { Column } from "@/components/globals/types";
import {
  Listing as Record,
  ListingRow as Row,
} from "@/components/listings/types";

const RenderCell = (record: Record, column: string, row: Row) => {
  switch (column) {
    case "actions":
      return "5";
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
