import React from "react";
import {
  getAll,
  displayFormat,
} from "@/components/collectionMonitoring/cClients/actions";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/collectionMonitoring/cClients/renderBody";

const CClients = async () => {
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
      <Navbar />

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
