import React from "react";
import {
  get,
  getAll as getCClients,
} from "@/components/collectionMonitoring/cClients/actions";
import { tableFormat } from "@/components/collectionMonitoring/collections/actions";
import { get as getAccount } from "@/components/accounts/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderBody from "@/components/collectionMonitoring/collections/renderBody";
import CreateModal from "@/components/collectionMonitoring/collections/createModal";
import { retry } from "@/components/globals/serverUtils";

const TransactionClient = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { record: account } = await retry(getAccount);
  const { record } = await get((await params).id);
  const { records: cClients } = await getCClients();

  const model = `Collections`;

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
    { key: "id", name: "ID" },
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

  const rows = await tableFormat(columns, record?.collections || []);

  const Buttons = (
    <>
      <CreateModal locations={locations} cClients={cClients} />
    </>
  );

  return (
    <>
      <Navbar record={account!} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">
              {`${record?.name}'s ${model}`.toUpperCase()}
            </h1>
            <DataTable
              model={model}
              records={record?.collections || []}
              columns={columns}
              rows={rows}
              searchKey="name"
              filterKey="start"
              RenderBody={RenderBody}
              dependencies={{
                locations: locations,
                cClients: cClients,
              }}
              Buttons={Buttons}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TransactionClient;
