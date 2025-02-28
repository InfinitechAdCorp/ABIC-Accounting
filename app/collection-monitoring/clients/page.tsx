import React from "react";
import {
  getAll,
  displayFormat,
} from "@/components/collectionMonitoring/cClients/actions";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import DataTable from "@/components/globals/dataTable";
import RenderBody from "@/components/collectionMonitoring/cClients/renderBody";
import { retry } from "@/components/globals/serverUtils";

const CClients = async () => {
  const { record: account } = await retry(getAccount);
  const { records: ufRecords } = await getAll();

  const model = "Clients";

  const columns = [
    { key: "name", name: "NAME", sortable: true },
    { key: "collections", name: "COLLECTIONS", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  const records = await displayFormat(columns, ufRecords);

  return (
    <>
      <Navbar record={account!} />

      <div className="max-h-[93vh]">
        <DataTable
          baseModel={model}
          columns={columns}
          records={records}
          RenderBody={RenderBody}
        />
      </div>
    </>
  );
};

export default CClients;
