"use client";

import React from "react";
import { computeBalance, formatNumber } from "@/components/globals/utils";
import UpdateModal from "@/components/transactionHistory/transactionClients/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import ViewBtn from "@/components/globals/viewBtn";
import { destroy } from "@/components/transactionHistory/transactionClients/actions";
import { FormattedTransactionClient } from "@/components/transactionHistory/types";

type Item = FormattedTransactionClient;

const RenderCell = (item: Item, columnKey: string) => {
  const transactions = item.transactions?.reverse() || [];

  switch (columnKey) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal transactionClient={item} />
          <DestroyModal title="Client" action={destroy} id={item.id} />
          <ViewBtn
            title="View Transactions"
            link={`/transaction-history/clients/${item.id}`}
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
      return item.transactions?.length;
    default:
      return item[columnKey as keyof Item];
  }
};

export default RenderCell;