"use client";

import React from "react";
import { computeBalance, formatNumber } from "@/components/globals/utils";
import UpdateModal from "@/components/transactionHistory/transactionClients/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import ViewBtn from "@/components/globals/viewBtn";
import { destroy } from "@/components/transactionHistory/transactionClients/actions";
import { FormattedTransactionClient } from "@/components/transactionHistory/types";

type Row = FormattedTransactionClient;

const RenderCell = (row: Row, columnKey: string) => {
  const transactions = row.transactions?.reverse() || [];

  switch (columnKey) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal transactionClient={row} />
          <DestroyModal title="Client" action={destroy} id={row.id} />
          <ViewBtn
            title="View Transactions"
            link={`/transaction-history/clients/${row.id}`}
          />
        </div>
      );
    case "starting_fund":
      let startingFund = 0;

      const transaction = transactions.find((transaction) => {
        if (transaction.status != "Cancelled") {
          return transaction;
        }
      });

      if (transaction) {
        if (transaction.type == "Credit") {
          startingFund += transaction.amount;
        } else {
          startingFund -= transaction.amount;
        }
      }

      return formatNumber(startingFund);
    case "running_balance":
      const runningBalance = computeBalance(transactions);
      return formatNumber(runningBalance);
    case "transactions":
      return row.transactions?.length;
    default:
      return row[columnKey as keyof Row];
  }
};

export default RenderCell;
