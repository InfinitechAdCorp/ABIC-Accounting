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
  CollectionDisplayFormat,
  CClient,
} from "@/components/collectionMonitoring/types";

const RenderCell = (
  column: string,
  record: Record,
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

      const value =
        record.display_format![column as keyof CollectionDisplayFormat];
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
      return record.display_format![column as keyof CollectionDisplayFormat];
  }
};

const RenderBody = (
  columns: Column[],
  records: Record[],
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
      {records.map((record) => (
        <TableRow key={record.id}>
          {columns.map((column) => (
            <TableCell key={column.key}>
              {RenderCell(column.key, record, dependencies)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default RenderBody;
