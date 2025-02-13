import React from "react";
import {
  getAll,
  tableFormat,
} from "@/components/collectionMonitoring/cClients/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import DataTable from "@/components/globals/dataTable";
import CreateModal from "@/components/collectionMonitoring/cClients/createModal";
import ExportBtn from "@/components/globals/exportBtn";
import RenderBody from "@/components/collectionMonitoring/cClients/renderBody";
import { retry } from "@/components/globals/serverUtils";

const CClients = async () => {
  const { record: account } = await retry(getAccount);
  const { records } = await getAll();

  const model = "Clients";

  const columns = [
    { key: "id", name: "ID" },
    { key: "name", name: "NAME" },
    { key: "collections", name: "COLLECTIONS" },
    { key: "actions", name: "ACTIONS" },
  ];

  const rows = await tableFormat(columns, records);

  const Buttons = (
    <>
      <CreateModal />
      <ExportBtn model={model} columns={columns} rows={rows} />
    </>
  );

  return (
    <>
      <Navbar record={account!} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">
              {model.toUpperCase()}
            </h1>
            <DataTable
              model={model}
              records={records}
              columns={columns}
              rows={rows}
              searchKey="name"
              RenderBody={RenderBody}
              Buttons={Buttons}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default CClients;
