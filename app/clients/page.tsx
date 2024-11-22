import React from "react";
import { getClients } from "@/components/contractMonitoring/clients/actions";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Header from "@/components/globals/header";
import AddClientModal from "@/components/contractMonitoring/clients/addClientModal";
import { formatClients } from "@/components/globals/utils";
import DataTable from "@/components/globals/dataTable";
import ClientsTable from "@/components/contractMonitoring/clients/clientsTable";

const Clients = async () => {
  const oldColumns = [
    { key: "name", label: "Name" },
    { key: "contracts", label: "Contracts" },
    { key: "action", label: "Action" },
  ];

  const columns = [
    { name: "NAME", key: "name", sortable: true },
    { name: "CONTRACTS", key: "contracts", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = ["name", "contracts", "actions"];

  const { clients } = await getClients();
  const formattedClients = formatClients(clients);

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardHeader>
            <Header title="Clients">
              <AddClientModal />
            </Header>
          </CardHeader>
          <CardBody>
            <ClientsTable columns={oldColumns} clients={formattedClients} />
          </CardBody>
        </Card>
      </div>

      <div className="flex justify-center">
        <Card>
          <CardBody>
            <DataTable
              model="clients"
              columns={columns}
              rows={formattedClients}
              initialVisibleColumns={initialVisibleColumns}
              sortKey="name"
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Clients;
