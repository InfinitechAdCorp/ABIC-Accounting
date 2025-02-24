import React from "react";
import {
  getAll,
  displayFormat,
} from "@/components/collectionMonitoring/cClients/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import DataTable from "@/components/globals/dataTable";
import CreateModal from "@/components/collectionMonitoring/cClients/createModal";
import RenderBody from "@/components/collectionMonitoring/cClients/renderBody";
import { retry } from "@/components/globals/serverUtils";

const CClients = async () => {
  const { record: account } = await retry(getAccount);
  const { records: ufRecords } = await getAll();

  const model = "Clients";

  const columns = [
    { key: "name", name: "NAME", sortable: true },
    { key: "collections", name: "COLLECTIONS", sortable: true },
  ];

  const records = await displayFormat(columns, ufRecords);

  const Buttons = (
    <>
      <CreateModal />
    </>
  );

  return (
    <>
      <Navbar record={account!} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:my-7 md:mx-32 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">
              {model.toUpperCase()}
            </h1>
            <DataTable
              model={model}
              columns={[
                ...columns,
                { key: "actions", name: "ACTIONS", sortable: false },
              ]}
              records={records}
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
