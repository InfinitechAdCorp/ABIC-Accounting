"use client";

import React from "react";
import { formatDate, formatNumber } from "@/components/globals/utils";
import UpdateModal from "@/components/transactionHistory/transactions/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import SetStatusModal from "@/components/transactionHistory/transactions/setStatusModal";
import ViewProofModal from "@/components/transactionHistory/transactions/viewProofModal";
import {
  destroy,
  setStatus,
} from "@/components/transactionHistory/transactions/actions";
import {
  Transaction as Record,
  TClient,
} from "@/components/transactionHistory/types";
import { ListBlobResultBlob } from "@vercel/blob";

const RenderCell = (
  record: Record,
  columnKey: string,
  dependencies: {
    blobs: ListBlobResultBlob[];
    tClients: TClient[];
  }
) => {
  switch (columnKey) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal record={record} tClients={dependencies.tClients} />
          <DestroyModal title="Transaction" action={destroy} id={record.id} />
          <SetStatusModal
            action={setStatus}
            id={record.id}
            status={record.status}
          />
        </div>
      );
    case "date":
      return formatDate(record.date);
    case "client":
      return record.t_client?.name;
    case "credit":
      let credit;
      if (record.type == "Credit") {
        credit = formatNumber(record.amount);
      }
      return credit;
    case "debit":
      let debit;
      if (record.type == "Debit") {
        debit = formatNumber(record.amount);
      }
      return debit;
    case "proof":
      const proof = record[columnKey as keyof Record];
      const blob = dependencies.blobs.find((blob) => {
        return proof == blob.pathname;
      });

      return <ViewProofModal url={blob?.url || "/no-image.png"} />;
    default:
      return record[columnKey as keyof Record];
  }
};

export default RenderCell;
