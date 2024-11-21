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
import { ActionResponse } from "@/components/globals/types";
import { toast } from "react-toastify";
import EditAccountModal from "@/components/transactionMonitoring/accounts/editAccountModal";
import DeleteModal from "@/components/globals/deleteModal";
import { deleteAccount } from "./actions";

type Props = {
  columns: {
    key: string;
    label: string;
  }[];
  accounts: FormattedAccount[];
};

const AccountsTable = ({ columns, accounts }: Props) => {
  const formatNumber = (number: number) => {
    const formattedNumber = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
    }).format(number);
    return formattedNumber;
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
