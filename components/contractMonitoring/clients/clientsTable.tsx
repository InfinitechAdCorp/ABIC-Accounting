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
import { ActionResponse } from "@/components/globals/types";
import { toast } from "react-toastify";
import EditClientModal from "@/components/contractMonitoring/clients/editClientModal";
import DeleteModal from "@/components/globals/deleteModal";
import { deleteClient } from "./actions";

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
