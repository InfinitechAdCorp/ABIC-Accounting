"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FormattedAccount } from "@/components/transactionMonitoring/types";

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
              <Dropdown
                classNames={{
                  content: "min-w-0",
                }}
              >
                <DropdownTrigger>
                  <BsThreeDotsVertical className="cursor-pointer" />
                </DropdownTrigger>

                <DropdownMenu>
                  <DropdownItem>
                    <h3 className="font-semibold">Edit</h3>
                  </DropdownItem>
                  <DropdownItem>
                    <h3 className="font-semibold">Delete</h3>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AccountsTable;
