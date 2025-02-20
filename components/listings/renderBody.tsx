"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import { Column } from "@/components/globals/types";
import {
  Listing as Record,
  ListingDisplayFormat,
} from "@/components/listings/types";
import UpdateModal from "@/components/listings/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import { destroy } from "@/components/listings/actions";

const RenderCell = (column: string, record: Record) => {
  switch (column) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal record={record} />
          <DestroyModal title="Listing" action={destroy} id={record.id} />
        </div>
      );
    default:
      return record.display_format![column as keyof ListingDisplayFormat];
  }
};

const RenderBody = (columns: Column[], records: Record[]) => {
  return (
    <>
      {records.map((record) => (
        <TableRow
          key={record.id}
          className={
            record.status == "Closed" ? "text-[#006FEE]" : "text-[#F31260]"
          }
        >
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
