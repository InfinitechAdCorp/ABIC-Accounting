import React from "react";
import {
  getAll,
  displayFormat,
  checkRecords,
} from "@/components/collectionMonitoring/collections/actions";
import { getAll as getCClients } from "@/components/collectionMonitoring/cClients/actions";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/collectionMonitoring/collections/dataTable";
import RenderBody from "@/components/collectionMonitoring/collections/renderBody";
import CreateModal from "@/components/collectionMonitoring/collections/createModal";
import { get as getCookies } from "@/components/globals/auth";

const Collections = async () => {
  const { record: cookies } = await getCookies();
  
  await checkRecords();

  const { records: ufRecords } = await getAll();
  const { records: cClients } = await getCClients();

  const model = "Collections";

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
    { key: "client", name: "CLIENT", sortable: true },
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

  const initialColumns = ['client', 'property', 'location', 'start', 'end', 'due', 'status', 'payments', 'actions']

  const records = await displayFormat(columns, ufRecords);

  const Buttons = (
    <>
      <CreateModal locations={locations} cClients={cClients} />
    </>
  );

  return (
    <>
      <Navbar record={cookies} />

      <div className="max-h-screen">
        <DataTable
          baseModel={model}
          columns={columns}
          initialColumns={initialColumns}
          records={records}
          filterKey="start"
          RenderBody={RenderBody}
          Buttons={Buttons}
          dependencies={{
            locations: locations,
            cClients: cClients,
          }}
        />
      </div>
    </>
  );
};

export default Collections;
