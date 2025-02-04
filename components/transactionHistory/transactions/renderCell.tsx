"use client";

import React from "react";
import { formatDate, formatNumber } from "@/components/globals/utils";
import UpdateModal from "@/components/transactionHistory/transactions/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import ChangeStatusModal from "@/components/transactionHistory/transactions/changeStatuslModal";
import ViewProofModal from "@/components/transactionHistory/transactions/viewProofModal";
import {
  destroy,
  changeStatus,
} from "@/components/transactionHistory/transactions/actions";
import {
  FormattedTransaction,
  FormattedTransactionClient,
} from "@/components/transactionHistory/types";
import { ListBlobResultBlob } from "@vercel/blob";

type Row = FormattedTransaction;

const RenderCell = (
  row: Row,
  columnKey: string,
  dependencies: {
    blobs: ListBlobResultBlob[];
    transactionClients: FormattedTransactionClient[];
  }
) => {
  switch (columnKey) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal
            transaction={row}
            transactionClients={dependencies.transactionClients}
          />
          <DestroyModal title="Transaction" action={destroy} id={row.id} />
          <ChangeStatusModal
            action={changeStatus}
            id={row.id}
            status={row.status}
          />
        </div>
      );
    case "date":
      return formatDate(row.date);
    case "client":
      return row.transaction_client?.name;
    case "credit":
      if (row.type == "Credit") {
        return formatNumber(row.amount);
      }
      return "";
    case "debit":
      if (row.type == "Debit") {
        return formatNumber(row.amount);
      }
      return "";
    case "proof":
      const name = row[columnKey as keyof Row];
      const blob = dependencies.blobs.find((blob) => {
        return name == blob.pathname;
      });
      return <ViewProofModal url={blob?.url || "/no-image.png"} />;
    default:
      return row[columnKey as keyof Row];
  }
};

export default RenderCell;
