import React from "react";
import { get as getAccount } from "@/components/accounts/actions";
import {
  getAll,
  displayFormat,
} from "@/components/collectionMonitoring/collections/actions";
import { getAll as getCClients } from "@/components/collectionMonitoring/cClients/actions";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/collectionMonitoring/collections/dataTable";
import RenderBody from "@/components/collectionMonitoring/collections/renderBody";
import CreateCollectionModal from "@/components/collectionMonitoring/collections/createModal";
import CreateCClientModal from "@/components/collectionMonitoring/cClients/createModal";
import { retry } from "@/components/globals/serverUtils";

const Collections = async () => {
  const { record: account } = await retry(getAccount);
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

  const records = await displayFormat(columns, ufRecords);

  const Buttons = (
    <>
      <div className="hidden sm:flex">
        <CreateCClientModal />
      </div>
      <CreateCollectionModal locations={locations} cClients={cClients} />
    </>
  );

  return (
    <>
      <Navbar record={account!} />

      <div className="max-h-[93vh]">
        <DataTable
          model={model}
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

export default Collections;
