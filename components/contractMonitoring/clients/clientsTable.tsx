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
import { FormattedClient } from "@/components/contractMonitoring/types";
import EditClientModal from "@/components/contractMonitoring/clients/editClientModal";
import DeleteModal from "@/components/globals/deleteModal";
import { deleteClient } from "./actions";
import { handleSubmit } from "@/components/globals/utils";

type Props = {
  columns: {
    key: string;
    label: string;
  }[];
  clients: FormattedClient[];
};

const ClientsTable = ({ columns, clients }: Props) => {
  return (
    <Table aria-label="Clients Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={clients}>
        {(client) => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.contracts}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <EditClientModal onSubmit={handleSubmit} client={client} />
                <DeleteModal
                  title="Client"
                  action={deleteClient}
                  id={client.id}
                />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ClientsTable;
