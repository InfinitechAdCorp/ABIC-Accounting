import React from "react";
import {
  get,
  getAll as getCClients,
} from "@/components/collectionMonitoring/cClients/actions";
import { displayFormat } from "@/components/collectionMonitoring/collections/actions";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/collectionMonitoring/collections/renderBody";
import CreateModal from "@/components/collectionMonitoring/collections/createModal";

const TransactionClient = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { record } = await get((await params).id);
  const { records: cClients } = await getCClients();

  const model = `Collections`;

  const locations = [
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
    { key: "property", name: "PROPERTY", sortable: true },
    { key: "location", name: "LOCATION", sortable: true },
    { key: "start", name: "CONTRACT START", sortable: true },
    { key: "end", name: "CONTRACT END", sortable: true },
    { key: "advance", name: "ADVANCE", sortable: true },
    { key: "deposit", name: "DEPOSIT", sortable: true },
    { key: "tenant_price", name: "TENANT PRICE", sortable: true },
    { key: "owner_income", name: "OWNER INCOME", sortable: true },
    { key: "abic_income", name: "ABIC INCOME", sortable: true },
    { key: "due", name: "DUE DATE", sortable: true },
    { key: "status", name: "STATUS", sortable: true },
    { key: "payments", name: "PAYMENTS", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  const records = await displayFormat(columns, record?.collections || []);

  const Buttons = (
    <>
      <CreateModal locations={locations} cClients={cClients} />
    </>
  );

  return (
    <>
      <Navbar />

      <div className="max-h-[93vh]">
        <DataTable
          baseModel={model}
          model={`${record?.name}'s ${model}`}
          columns={columns}
          records={records}
          filterKey="start"
          dependencies={{
            locations: locations,
            cClients: cClients,
          }}
          RenderBody={RenderBody}
          Buttons={Buttons}
        />
      </div>
    </>
  );
};

export default TransactionClient;
