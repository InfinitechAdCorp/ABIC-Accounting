"use client";

import React from "react";
import { formatNumber } from "@/components/globals/utils";
import UpdateModal from "@/components/transactionHistory/transactionClients/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import ViewBtn from "@/components/transactionHistory/transactionClients/viewBtn";
import { destroy } from "@/components/transactionHistory/transactionClients/actions";
import { FormattedTransactionClient } from "@/components/transactionHistory/types";

type Row = FormattedTransactionClient;

const RenderCell = (row: Row, columnKey: string) => {
  const transactions = row.transactions || [];

  switch (columnKey) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal transactionClient={row} />
          <DestroyModal title="Client" action={destroy} id={row.id} />
          <ViewBtn id={row.id} />
        </div>
      );
    case "starting_balance":
      let startingBalance = 0;
      const transaction = transactions[0];
      if (transaction) {
        if (transaction.type == "Credit") {
          startingBalance += transaction.amount;
        } else {
          startingBalance -= transaction.amount;
        }
      }
      return formatNumber(startingBalance);
    case "current_balance":
      let currentBalance = 0;
      if (transactions) {
        transactions.forEach((transaction) => {
          if (transaction.type == "Credit") {
            currentBalance += transaction.amount;
          } else {
            currentBalance -= transaction.amount;
          }
        });
      }
      return formatNumber(currentBalance);
    case "transactions":
      return row.transactions?.length;
    default:
      return row[columnKey as keyof Row];
  }
};

export default RenderCell;
