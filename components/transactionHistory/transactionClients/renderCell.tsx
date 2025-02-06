"use client";

import React from "react";
import UpdateModal from "@/components/transactionHistory/transactionClients/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import ViewBtn from "@/components/globals/viewBtn";
import { destroy } from "@/components/transactionHistory/transactionClients/actions";
import { FormattedTransactionClient } from "@/components/transactionHistory/types";

type Record = FormattedTransactionClient;

const RenderCell = (record: Record, columnKey: string) => {
  switch (columnKey) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal transactionClient={record} />
          <DestroyModal title="Client" action={destroy} id={record.id} />
          <ViewBtn
            title="View Transactions"
            link={`/transaction-history/clients/${record.id}`}
          />
        </div>
      );
    default:
      return record[columnKey as keyof Record];
  }
};

export default RenderCell;
