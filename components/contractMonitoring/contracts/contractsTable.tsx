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
} from "@/components/contractMonitoring/types";
import EditContractModal from "@/components/contractMonitoring/contracts/editContractModal";
import DeleteModal from "@/components/globals/deleteModal";
import { deleteContract } from "./actions";
import { handleSubmit, formatNumber, formatDate } from "@/components/globals/utils";

type Props = {
  columns: {
    key: string;
    label: string;
  }[];
  contracts: FormattedContract[];
  clients: FormattedClient[];
  locations: {
    key: string;
    name: string;
  }[];
};

const ContractsTable = ({ columns, contracts, clients, locations }: Props) => {
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
            <TableCell>
              {formatNumber(contract.tenant_price as number)}
            </TableCell>
            <TableCell>
              {formatNumber(contract.owner_income as number)}
            </TableCell>
            <TableCell>
              {formatNumber(contract.abic_income as number)}
            </TableCell>
            <TableCell>{formatDate(contract.due)}</TableCell>
            <TableCell>{contract.payments}</TableCell>
            <TableCell>{contract.status}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <EditContractModal
                  onSubmit={handleSubmit}
                  contract={contract}
                  clients={clients}
                  locations={locations}
                />
                <DeleteModal
                  title="Contract"
                  action={deleteContract}
                  id={contract.id}
                />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ContractsTable;
