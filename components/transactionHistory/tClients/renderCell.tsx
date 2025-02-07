"use client";

import React from "react";
import { computeBalance, formatNumber } from "@/components/globals/utils";
import UpdateModal from "@/components/transactionHistory/tClients/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import ViewBtn from "@/components/globals/viewBtn";
import { destroy as action } from "@/components/transactionHistory/tClients/actions";
import { TClient as Record } from "@/components/transactionHistory/types";

const RenderCell = (columnKey: string, record: Record) => {
  const transactions = record.transactions?.reverse() || [];

  switch (columnKey) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal record={record} />
          <DestroyModal title="Client" action={action} id={record.id} />
          <ViewBtn
            title="View Transactions"
            url={`/transaction-history/clients/${record.id}`}
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
      return record.transactions?.length;
    default:
      return record[columnKey as keyof Record];
  }
};

export default RenderCell;
