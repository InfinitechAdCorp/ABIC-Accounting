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
  FormattedContract,
  FormattedClient,
  ActionResponse,
} from "@/components/contractMonitoring/types";
import { toast } from "react-toastify";
import { differenceInDays } from "date-fns";
// import EditContractModal from "@/components/contractMonitoring/contracts/editContractModal";
// import DeleteContractModal from "@/components/contractMonitoring/contracts/deleteContractModal";

type Props = {
  columns: {
    key: string;
    label: string;
  }[];
  contracts: FormattedContract[];
  clients: FormattedClient[];
};

const ContractsTable = ({ columns, contracts, clients }: Props) => {
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

  const getStatus = (due_date: Date) => {
    const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
    const difference = differenceInDays(due_date, today);

    let status;
    if (difference > 0) {
      status = `${difference} Days Remaining`;
    } else if (difference < 0) {
      status = `${difference} Days Past Due`;
    } else if (difference == 0) {
      status = "Today";
    }

    return status;
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
      <TableBody items={contracts}>
        {(contract) => (
          <TableRow key={contract.id}>
            <TableCell>{contract.client?.name}</TableCell>
            <TableCell>{contract.property}</TableCell>
            <TableCell>{contract.location}</TableCell>
            <TableCell>{formatDate(contract.start)}</TableCell>
            <TableCell>{formatDate(contract.end)}</TableCell>
            <TableCell>{contract.advance}</TableCell>
            <TableCell>{contract.deposit}</TableCell>
            <TableCell>{formatNumber(contract.tenant_price as number)}</TableCell>
            <TableCell>{formatNumber(contract.owner_income as number)}</TableCell>
            <TableCell>{formatNumber(contract.abic_income as number)}</TableCell>
            <TableCell>{formatDate(contract.due_date)}</TableCell>
            <TableCell>{contract.payments}</TableCell>
            <TableCell>{getStatus(contract.due_date)}</TableCell>
            <TableCell>
                Action
              {/* <div className="flex gap-2">
                <EditTransactionModal
                  onSubmit={handleSubmit}
                  transaction={transaction}
                  accounts={accounts}
                />
                <DeleteTransactionModal
                  onSubmit={handleSubmit}
                  id={transaction.id}
                />
              </div> */}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ContractsTable;
