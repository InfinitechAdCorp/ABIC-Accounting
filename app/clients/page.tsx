import React from "react";
import { getClients } from "@/components/contractMonitoring/clients/actions";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import ClientsTable from "@/components/contractMonitoring/clients/clientsTable";
import Header from "@/components/globals/header";
import AddClientModal from "@/components/contractMonitoring/clients/addClientModal";
import { formatClients } from "@/components/globals/utils";

const Clients = async () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "contracts", label: "Contracts" },
    { key: "action", label: "Action" },
  ];

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
            <ClientsTable columns={columns} clients={formattedClients} />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Clients;
