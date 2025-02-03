"use client";

import React from "react";
import { formatDate, formatNumber } from "@/components/globals/utils";
import UpdateModal from "@/components/transactionHistory/transactions/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import ChangeStatusModal from "@/components/transactionHistory/transactions/changeStatuslModal";
import {
  destroy,
  changeStatus,
} from "@/components/transactionHistory/transactions/actions";
import {
  FormattedTransaction,
  FormattedTransactionClient,
} from "@/components/transactionHistory/types";

type Row = FormattedTransaction;

const RenderCell = (
  row: Row,
  columnKey: string,
  dependencies: { transactionClients: FormattedTransactionClient[] }
) => {
  if (columnKey == "actions") {
    return (
      <div className="relative flex justify-end items-center gap-2">
        <UpdateModal
          transaction={row}
          transactionClients={dependencies.transactionClients}
        />
        <DestroyModal title="Transaction" action={destroy} id={row.id} />
        <ChangeStatusModal action={changeStatus} id={row.id} status={row.status} />
      </div>
    );
  } else if (columnKey == "date") {
    return formatDate(row.date);
  } else if (columnKey == "client") {
    return row.transaction_client?.name;
  } else if (columnKey == "credit") {
    if (row.type == "Credit") {
      return formatNumber(row.amount);
    }
  } else if (columnKey == "debit") {
    if (row.type == "Debit") {
      return formatNumber(row.amount);
    }
  } else {
    return row[columnKey as keyof Row];
  }
};

export default RenderCell;
