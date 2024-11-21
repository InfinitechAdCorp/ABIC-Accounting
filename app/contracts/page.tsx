import React from "react";
import { getContracts } from "@/components/contractMonitoring/contracts/actions";
import { getClients } from "@/components/contractMonitoring/clients/actions";
import {
  FormattedContract,
  ContractWithClient,
  FormattedClient,
  ClientWithContracts,
} from "@/components/contractMonitoring/types";
import { differenceInMonths } from "date-fns";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import ContractsTable from "@/components/contractMonitoring/contracts/contractsTable";
import Header from "@/components/globals/header";
import AddClientModal from "@/components/contractMonitoring/clients/addClientModal";
import AddContractModal from "@/components/contractMonitoring/contracts/addContractModal";

const Contracts = async () => {
  const locations = [
    { key: "All", name: "All" },
    { key: "Bacoor", name: "Bacoor" },
    { key: "Makati", name: "Makati" },
    { key: "BGC", name: "BGC" },
    { key: "Pasay", name: "Pasay" },
    { key: "Mandaluyong", name: "Mandaluyong" },
    { key: "QC", name: "QC" },
    { key: "Pasig", name: "Pasig" },
    { key: "Paranaque", name: "Paranaque" },
  ];

  const columns = [
    { key: "client.name", label: "Client" },
    { key: "property", label: "Property" },
    { key: "location", label: "Location" },
    { key: "start", label: "Contract Start" },
    { key: "end", label: "Contract End" },
    { key: "advance", label: "Advance" },
    { key: "deposit", label: "Deposit" },
    { key: "tenant_price", label: "Tenant Price" },
    { key: "owner_income", label: "Owner Income" },
    { key: "abic_income", label: "ABIC Income" },
    { key: "due_date", label: "Due Date" },
    { key: "payments", label: "Payments" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  const { contracts } = await getContracts();

  const formatContracts = (contracts: ContractWithClient[]) => {
    const formattedContracts: FormattedContract[] = [];

    contracts.forEach((contract) => {
      const client = contract.client;
      const tenant_price = contract.tenant_price?.toNumber();
      const owner_income = contract.owner_income?.toNumber();
      const abic_income = contract.abic_income?.toNumber();
      const payments =
        differenceInMonths(contract.due_date, contract.start) - 1;

      const formattedContract = {
        ...contract,
        client: {
          ...client,
          id: client?.id as string,
          name: client?.name as string,
        },
        client_id: contract.client_id as string,
        tenant_price: tenant_price,
        owner_income: owner_income,
        abic_income: abic_income,
        payments: payments,
      };
      formattedContracts.push(formattedContract);
    });

    return formattedContracts;
  };

  const formattedContracts = formatContracts(contracts);

  const { clients } = await getClients();

  const formatClients = (clients: ClientWithContracts[]) => {
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

  const formattedClients = formatClients(clients);

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardHeader>
            <Header title="Contracts">
              <div className="flex gap-2">
                <AddClientModal />
                <AddContractModal
                  clients={formattedClients}
                  locations={locations}
                />
              </div>
            </Header>
          </CardHeader>
          <CardBody>
            <ContractsTable
              columns={columns}
              contracts={formattedContracts}
              clients={formattedClients}
              locations={locations}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Contracts;
