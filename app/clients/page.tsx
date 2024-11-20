import React from "react";
import { getClients } from "@/components/contractMonitoring/clients/actions";
import {
  FormattedClient,
  ClientWithContracts,
} from "@/components/contractMonitoring/types";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import HeaderButtons from "@/components/contractMonitoring/clients/headerButtons";
import ClientsTable from "@/components/contractMonitoring/clients/clientsTable";

const Clients = async () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "contracts", label: "Contracts" },
    { key: "action", label: "Action" },
  ];

  const { clients } = await getClients();
  const formattedClients: FormattedClient[] = [];

  const formatData = (clients: ClientWithContracts[]) => {
    clients.forEach((client) => {
      const contracts = client.contracts.length
      const formattedClient = {
        ...client,
        contracts: contracts,
      };
      formattedClients.push(formattedClient);
    });
  };

  formatData(clients);
  console.log(formattedClients);

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <h1 className="font-bold">Clients</h1>
              <HeaderButtons />
            </div>
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
