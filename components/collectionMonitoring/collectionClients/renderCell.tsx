"use client";

import React from "react";
import UpdateModal from "@/components/collectionMonitoring/collectionClients/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import ViewBtn from "@/components/globals/viewBtn";
import { destroy } from "@/components/collectionMonitoring/collectionClients/actions";
import { FormattedCollectionClient } from "@/components/collectionMonitoring/types";

type Row = FormattedCollectionClient;

const RenderCell = (row: Row, columnKey: string) => {
  switch (columnKey) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal collectionClient={row} />
          <DestroyModal title="Client" action={destroy} id={row.id} />
          <ViewBtn
            title="View Collections"
            link={`/collection-monitoring/clients/${row.id}`}
          />
        </div>
      );
    case "collections":
      return row.collections?.length;
    default:
      return row[columnKey as keyof Row];
  }
};

export default RenderCell;
