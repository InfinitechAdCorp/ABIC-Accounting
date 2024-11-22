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
} from "@/components/transactionMonitoring/types";
import EditTransactionModal from "@/components/transactionMonitoring/transactions/editTransactionModal";
import DeleteModal from "@/components/globals/deleteModal";
import { deleteTransaction } from "./actions";
import { handleSubmit, formatNumber } from "@/components/globals/utils";

type Props = {
  columns: {
    key: string;
    label: string;
  }[];
  transactions: FormattedTransaction[];
  accounts: FormattedAccount[];
};

const TransactionsTable = ({ columns, transactions, accounts }: Props) => {
  return (
    <Table aria-label="Accounts Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={transactions}>
        {(transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
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
                <EditTransactionModal
                  onSubmit={handleSubmit}
                  transaction={transaction}
                  accounts={accounts}
                />
                <DeleteModal
                  title="Transaction"
                  action={deleteTransaction}
                  id={transaction.id}
                />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
