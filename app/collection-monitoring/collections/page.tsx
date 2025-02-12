import React from "react";
import { get as getAccount } from "@/components/accounts/actions";
import {
  getAll,
  tableFormat,
} from "@/components/collectionMonitoring/collections/actions";
import { getAll as getCClients } from "@/components/collectionMonitoring/cClients/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderBody from "@/components/collectionMonitoring/collections/renderBody";
import CreateCollectionModal from "@/components/collectionMonitoring/collections/createModal";
import CreateCClientModal from "@/components/collectionMonitoring/cClients/createModal";
import { Account } from "@prisma/client";
import ExportBtn from "@/components/globals/exportModal";

const Collections = async () => {
  const { record: account } = await getAccount();
  const { records } = await getAll();
  const { records: cClients } = await getCClients();

  const model = "Collections";

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
    { key: "client", name: "CLIENT" },
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

  const rows = await tableFormat(columns.slice(0, -1), records);

  return (
    <>
      <Navbar record={account as Account} />

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
              searchKey="property"
              RenderBody={RenderBody}
              dependencies={{
                locations: locations,
                cClients: cClients,
              }}
            >
              <>
                <div className="hidden sm:flex">
                  <CreateCClientModal />
                </div>
                <CreateCollectionModal
                  locations={locations}
                  cClients={cClients}
                />
                <ExportBtn columns={columns.slice(0, -1)} rows={rows} />
              </>
            </DataTable>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Collections;
