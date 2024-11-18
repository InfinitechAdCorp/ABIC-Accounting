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
import { FormattedAccount } from "@/components/transactionMonitoring/types";

type Props = {
  columns: {
    key: string;
    label: string;
  }[];
  accounts: FormattedAccount[];
};

const AccountsTable = ({ columns, accounts }: Props) => {
  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={accounts}>
        {(account) => (
          <TableRow key={account.id}>
            <TableCell>{account.name}</TableCell>
            <TableCell>{account.balance}</TableCell>
            <TableCell>{account.transactions}</TableCell>
            <TableCell>No Action</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AccountsTable;
