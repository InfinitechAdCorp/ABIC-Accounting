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
  FormattedClient,
  ActionResponse,
} from "@/components/contractMonitoring/types";
import { toast } from "react-toastify";
import EditClientModal from "@/components/contractMonitoring/clients/editClientModal";
import DeleteClientModal from "@/components/contractMonitoring/clients/deleteClientModal";

type Props = {
  columns: {
    key: string;
    label: string;
  }[];
  clients: FormattedClient[];
};

const ClientsTable = ({ columns, clients }: Props) => {
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
                <DeleteClientModal onSubmit={handleSubmit} id={client.id} />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ClientsTable;
