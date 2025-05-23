"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import { Column } from "@/components/globals/types";
import {
  PDCSet as Record,
  PDCSetDisplayFormat,
} from "@/components/transactionHistory/pdcSets/types";
import DestroyModal from "@/components/globals/destroyModal";
import { destroy } from "@/components/transactionHistory/pdcSets/actions";
import ViewPDCsModal from "@/components/transactionHistory/pdcSets/viewPDCsModal";

const RenderCell = (column: string, record: Record) => {
  switch (column) {
    case "actions":
      return (
        <div className="relative flex justify-start items-center gap-2">
          <DestroyModal title="PDC Set" action={destroy} id={record.id} />
          <ViewPDCsModal record={record} />
        </div>
      );
    default:
      return record.display_format![column as keyof PDCSetDisplayFormat];
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
