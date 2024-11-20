"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  FormattedTransaction,
  FormattedAccount,
  ActionResponse,
} from "@/components/transactionMonitoring/types";
import { toast } from "react-toastify";
import EditTransactionModal from "@/components/transactionMonitoring/transactions/editTransactionModal";
import DeleteTransactionModal from "@/components/transactionMonitoring/transactions/deleteTransactionModal";

type Props = {
  columns: {
    key: string;
    label: string;
  }[];
  transactions: FormattedTransaction[];
  accounts: FormattedAccount[];
};

const TransactionsTable = ({ columns, transactions, accounts }: Props) => {
  const formatNumber = (number: number) => {
    const formattedNumber = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
    }).format(number);
    return formattedNumber;
  };

  const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  const handleSubmit = (
    action: (formData: FormData) => Promise<ActionResponse>,
    formData: FormData,
    onClose: () => void
  ) => {
    action(formData).then((response) => handlePostSubmit(response, onClose));
  };

  const handlePostSubmit = (response: ActionResponse, onClose: () => void) => {
    if (response.code == 200) {
      toast.success(response.message);
      onClose();
    } else {
      if (response.code == 429) {
        console.log(response.errors);
      }
      toast.error(response.message);
    }
  };

  return (
    <Table aria-label="Accounts Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={transactions}>
        {(transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{formatDate(transaction.date)}</TableCell>
            <TableCell>{transaction.voucher}</TableCell>
            <TableCell>{transaction.check}</TableCell>
            <TableCell>{transaction.account?.name}</TableCell>
            <TableCell>{transaction.particulars}</TableCell>
            <TableCell>
              {transaction.type == "Credit" &&
                formatNumber(transaction.amount as number)}
            </TableCell>
            <TableCell>
              {transaction.type == "Debit" &&
                formatNumber(transaction.amount as number)}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <EditTransactionModal onSubmit={handleSubmit} transaction={transaction} accounts={accounts} />
                <DeleteTransactionModal onSubmit={handleSubmit} id={transaction.id} />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
