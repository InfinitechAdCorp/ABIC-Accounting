import React from "react";
import { getClients } from "@/components/contractMonitoring/clients/actions";
import {
  FormattedClient,
  ClientWithContracts,
} from "@/components/contractMonitoring/types";

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
      const formattedClient = {
        ...client,
        contracts: client.contracts.length,
      };
      formattedClients.push(formattedClient);
    });
  };

  formatData(clients);
  console.log(formattedClients);

  return <></>;
};

export default Clients;
