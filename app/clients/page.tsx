import React from "react";
import { getClients } from "@/components/contractMonitoring/clients/actions";
import {
  FormattedClient,
  ClientWithContracts,
} from "@/components/contractMonitoring/types";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import ClientsTable from "@/components/contractMonitoring/clients/clientsTable";
import Header from "@/components/globals/header";
import AddClientModal from "@/components/contractMonitoring/clients/addClientModal";

const Clients = async () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "contracts", label: "Contracts" },
    { key: "action", label: "Action" },
  ];

  const { clients } = await getClients();

  const formatData = (clients: ClientWithContracts[]) => {
    const formattedClients: FormattedClient[] = [];

    clients.forEach((client) => {
      const contracts = client.contracts.length;
      const formattedClient = {
        ...client,
        contracts: contracts,
      };
      formattedClients.push(formattedClient);
    });

    return formattedClients;
  };

  const formattedClients = formatData(clients);

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
