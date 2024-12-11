import React from "react";
import { getAll as getContracts } from "@/components/contractMonitoring/contracts/actions";
import { getAll as getClients } from "@/components/contractMonitoring/clients/actions";
import { Card, CardBody } from "@nextui-org/react";
import DataTable from "@/components/contractMonitoring/contracts/dataTable";
import { formatClients, formatContracts } from "@/components/globals/utils";
import Navbar from "@/components/globals/navbar";

export const dynamic = 'force-dynamic'

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
    { name: "CLIENT", key: "client", sortable: true },
    { name: "PROPERTY", key: "property", sortable: true },
    { name: "LOCATION", key: "location", sortable: true },
    { name: "CONTRACT START", key: "start", sortable: true },
    { name: "CONTRACT END", key: "end", sortable: true },
    { name: "ADVANCE", key: "advance", sortable: true },
    { name: "DEPOSIT", key: "deposit", sortable: true },
    { name: "TENANT PRICE", key: "tenant_price", sortable: true },
    { name: "OWNER INCOME", key: "owner_income", sortable: true },
    { name: "ABIC INCOME", key: "abic_income", sortable: true },
    { name: "DUE DATE", key: "due", sortable: true },
    { name: "STATUS", key: "status", sortable: true },
    { name: "PAYMENTS", key: "payments", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = [
    "client",
    "property",
    "location",
    "start",
    "end",
    "due",
    "status",
    "payments",
    "actions",
  ];

  const { contracts } = await getContracts();
  const formattedContracts = formatContracts(contracts);

  const { clients } = await getClients();
  const formattedClients = formatClients(clients);

  return (
    <>      
      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">Contracts</h1>
            <DataTable
              model="contracts"
              columns={columns}
              rows={formattedContracts}
              initialVisibleColumns={initialVisibleColumns}
              searchKey="property"
              sortKey="property"
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
