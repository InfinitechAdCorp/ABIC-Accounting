"use client";

import React from "react";
import { CClient as Record, CClientRow as Row } from "@/components/collectionMonitoring/types";
import { Column } from "@/components/globals/types";
import {
    TableRow,
    TableCell,
  } from "@heroui/react";

// const RenderCell = (columnKey: string, record: Record) => {
//   switch (columnKey) {
//     case "actions":
//       return (
//         <div className="relative flex justify-end items-center gap-2">
//           <UpdateModal record={record} />
//           <DestroyModal title="Client" action={destroy} id={record.id} />
//           <ViewBtn
//             title="View Collections"
//             url={`/collection-monitoring/clients/${record.id}`}
//           />
//         </div>
//       );
//     case "collections":
//       return record.collections?.length;
//     default:
//       return record[columnKey as keyof Record];
//   }
// };

// export default RenderCell;

const RenderCell = (records: Record[], index: number, column: Column, row: Row) => {

}

const Renderer = (records: Record[], columns: Column[], rows: Row[]) => {
    return <>
        {rows.map((row, index) => {
            <TableRow>
                {columns.map((column) => {
                    RenderCell(records, index, column, row)
                })}
            </TableRow>
        })}
    </>
}