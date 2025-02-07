import React from "react";
import {
  get,
  getAll as getCClients,
} from "@/components/collectionMonitoring/cClients/actions";
import { get as getAccount } from "@/components/accounts/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderCell from "@/components/collectionMonitoring/collections/renderCell";
import CreateModal from "@/components/collectionMonitoring/collections/createModal";
import { Account } from "@prisma/client";
import ExportBtn from "@/components/globals/exportBtn";

const TransactionClient = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const { record: account } = await getAccount();
  const { record } = await get(id);
  const { records: cClients } = await getCClients();

  const model = `${record?.name}'s Collections`;

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
    { key: "property", name: "PROPERTY" },
    { key: "location", name: "LOCATION" },
    { key: "start", name: "CONTRACT START" },
    { key: "end", name: "CONTRACT END" },
    { key: "advance", name: "ADVANCE" },
    { key: "deposit", name: "DEPOSIT" },
    { key: "tenant_price", name: "TENANT PRICE" },
    { key: "owner_income", name: "OWNER INCOME" },
    { key: "abic_income", name: "ABIC INCOME" },
    { key: "due", name: "DUE DATE" },
    { key: "status", name: "STATUS" },
    { key: "payments", name: "PAYMENTS" },
    { key: "actions", name: "ACTIONS" },
  ];

  return (
    <>
      <Navbar record={account as Account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">
              {model.toUpperCase()}
            </h1>
            <DataTable
              model={model}
              columns={columns}
              rows={record?.collections || []}
              searchKey="name"
              RenderCell={RenderCell}
              dependencies={{
                locations: locations,
                cClients: cClients,
              }}
            >
              <>
                <CreateModal
                  locations={locations}
                  cClients={cClients}
                />

                <ExportBtn />
              </>
            </DataTable>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TransactionClient;
