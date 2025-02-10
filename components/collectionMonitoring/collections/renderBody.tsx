"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import { Chip } from "@heroui/react";
import UpdateModal from "@/components/collectionMonitoring/collections/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import PaymentModal from "@/components/collectionMonitoring/collections/paymentModal";
import {
  destroy,
  markAsPaid,
} from "@/components/collectionMonitoring/collections/actions";
import { Column } from "@/components/globals/types";
import {
  Collection as Record,
  CollectionRow as Row,
  CClient,
} from "@/components/collectionMonitoring/types";

const RenderCell = (
  record: Record,
  column: string,
  row: Row,
  dependencies: {
    locations: {
      key: string;
      name: string;
    }[];
    cClients: CClient[];
  }
) => {
  switch (column) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal
            record={record}
            locations={dependencies.locations}
            cClients={dependencies.cClients}
          />
          <DestroyModal title="Collection" action={destroy} id={record.id} />
          <PaymentModal action={markAsPaid} id={record.id} />
        </div>
      );
    case "status":
      type Color = "success" | "danger" | "primary";

      const value = row[column as keyof Row];
      let color = "primary";

      if (value.includes("Remaining")) {
        color = "success";
      } else if (value.includes("Past")) {
        color = "danger";
      }

      return (
        <Chip color={color as Color} size="sm" variant="flat">
          {value}
        </Chip>
      );
    default:
      return row[column as keyof Row];
  }
};

const RenderBody = (
  records: Record[],
  columns: Column[],
  rows: Row[],
  dependencies: {
    locations: {
      key: string;
      name: string;
    }[];
    cClients: CClient[];
  }
) => {
  return (
    <>
      {rows.map((row, index) => (
        <TableRow key={index}>
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
