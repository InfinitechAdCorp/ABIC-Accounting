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
import HeaderButtons from "@/components/contractMonitoring/contracts/headerButtons";
import { string } from "yup";

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
  const formattedContracts: FormattedContract[] = [];

  const formatContracts = (contracts: ContractWithClient[]) => {
    contracts.forEach((contract) => {
      const tenant_price = contract.tenant_price?.toNumber();
      const owner_income = contract.owner_income?.toNumber();
      const abic_income = contract.abic_income?.toNumber();
      const payments =
        differenceInMonths(contract.due_date, contract.start) - 1;

      const formattedContract = {
        ...contract,
        tenant_price: tenant_price,
        owner_income: owner_income,
        abic_income: abic_income,
        payments: payments,
      };
      formattedContracts.push(formattedContract);
    });
  };

  formatContracts(contracts);

  const { clients } = await getClients();
  const formattedClients: FormattedClient[] = [];

  const formatClients = (clients: ClientWithContracts[]) => {
    clients.forEach((client) => {
      const contracts = client.contracts;

      const formattedClient = {
        ...client,
        contracts: contracts.length,
      };
      formattedClients.push(formattedClient);
    });
  };

  formatClients(clients);

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <h1 className="font-bold">Contracts</h1>
              <div className="flex gap-2">
                <HeaderButtons
                  clients={formattedClients}
                  locations={locations}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <ContractsTable
              columns={columns}
              contracts={formattedContracts}
              clients={formattedClients}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Contracts;
