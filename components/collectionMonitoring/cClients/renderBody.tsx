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
  CClientDisplayFormat,
} from "@/components/collectionMonitoring/types";

const RenderCell = (column: string, record: Record) => {
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
      return record.display_format![column as keyof CClientDisplayFormat];
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
