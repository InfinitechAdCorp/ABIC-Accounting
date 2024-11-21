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
import EditAccountModal from "@/components/transactionMonitoring/accounts/editAccountModal";
import DeleteModal from "@/components/globals/deleteModal";
import { deleteAccount } from "./actions";
import { handleSubmit, formatNumber } from "@/components/globals/utils";

type Props = {
  columns: {
    key: string;
    label: string;
  }[];
  accounts: FormattedAccount[];
};

const AccountsTable = ({ columns, accounts }: Props) => {
  return (
    <Table aria-label="Accounts Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={accounts}>
        {(account) => (
          <TableRow key={account.id}>
            <TableCell>{account.name}</TableCell>
            <TableCell>{formatNumber(account.balance)}</TableCell>
            <TableCell>{account.transactions}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <EditAccountModal onSubmit={handleSubmit} account={account} />
                <DeleteModal
                  title="Account"
                  action={deleteAccount}
                  id={account.id}
                />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AccountsTable;
