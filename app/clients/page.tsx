import React from "react";
import { getAll } from "@/components/contractMonitoring/clients/actions";
import { Card, CardBody } from "@nextui-org/react";
import { formatClients } from "@/components/globals/utils";
import DataTable from "@/components/contractMonitoring/clients/dataTable";

const Clients = async () => {
  const columns = [
    { name: "NAME", key: "name", sortable: true },
    { name: "CONTRACTS", key: "contracts", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = ["name", "contracts", "actions"];

  const { clients } = await getAll();
  const formattedClients = formatClients(clients);
  console.log("🚀 ~ Clients ~ formattedClients:", formattedClients)

  return (
    <>
      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">Clients</h1>
            <DataTable
              model="clients"
              columns={columns}
              rows={formattedClients}
              initialVisibleColumns={initialVisibleColumns}
              searchKey="name"
              sortKey="name"
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Clients;
