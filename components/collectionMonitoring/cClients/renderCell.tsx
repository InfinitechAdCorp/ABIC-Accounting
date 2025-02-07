"use client";

import React from "react";
import UpdateModal from "@/components/collectionMonitoring/cClients/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import ViewBtn from "@/components/globals/viewBtn";
import { destroy } from "@/components/collectionMonitoring/cClients/actions";
import { CClient as Record } from "@/components/collectionMonitoring/types";

const RenderCell = (columnKey: string, record: Record) => {
  switch (columnKey) {
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
    case "collections":
      return record.collections?.length;
    default:
      return record[columnKey as keyof Record];
  }
};

export default RenderCell;
