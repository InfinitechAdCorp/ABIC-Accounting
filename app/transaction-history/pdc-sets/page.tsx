import React from "react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/datatable/dataTable";
import CreateModal from "@/components/transactionHistory/pdcSets/createModal";
import {
  getAll,
  displayFormat,
} from "@/components/transactionHistory/pdcSets/actions";
import RenderBody from "@/components/transactionHistory/pdcSets/renderBody";
import { get as getCookies } from "@/components/globals/auth";

const PDCs = async () => {
    const { record: cookies } = await getCookies();
  const { records: ufRecords } = await getAll();

  const model = "PDC Sets";

  const columns = [
    { key: "name", name: "NAME", sortable: true },
    { key: "pay_to", name: "PAY TO", sortable: true },
    { key: "start", name: "START", sortable: true },
    { key: "end", name: "END", sortable: true },
    { key: "pdcs", name: "PDCs", sortable: true },
    { key: "type", name: "TYPE", sortable: true },
    { key: "total", name: "TOTAL", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  const records = await displayFormat(columns, ufRecords);

  const Buttons = (
    <>
      <CreateModal />
    </>
  );

  return (
    <>
      <Navbar record={cookies} />

      <div className="max-h-[93vh]">
        <DataTable
          baseModel={model}
          columns={columns}
          records={records}
          filterKey="start"
          RenderBody={RenderBody}
          Buttons={Buttons}
        />
      </div>
    </>
  );
};

export default PDCs;
