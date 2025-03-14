import React from "react";
import {
  getAll,
  displayFormat,
} from "@/components/collectionMonitoring/cClients/actions";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/collectionMonitoring/cClients/renderBody";
import { get as getCookies } from "@/components/globals/auth";

const CClients = async () => {
  const { record: cookies } = await getCookies();
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
      <Navbar record={cookies} />

      <div className="max-h-screen">
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
