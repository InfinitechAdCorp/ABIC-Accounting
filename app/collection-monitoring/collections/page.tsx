import React from "react";
import { getAll as getCollections } from "@/components/collectionMonitoring/collections/actions";
import { getAll as getCollectionClients } from "@/components/collectionMonitoring/collectionClients/actions";
import { Card, CardBody } from "@nextui-org/react";
import DataTable from "@/components/collectionMonitoring/collections/dataTable";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";

const Collections = async () => {
    const { account } = await getAccount();
    const { collections } = await getCollections();
    const { collectionClients } = await getCollectionClients();

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
    { name: "CLIENT", key: "client", sortable: true },
    { name: "PROPERTY", key: "property", sortable: true },
    { name: "LOCATION", key: "location", sortable: true },
    { name: "CONTRACT START", key: "start", sortable: true },
    { name: "CONTRACT END", key: "end", sortable: true },
    { name: "ADVANCE", key: "advance", sortable: true },
    { name: "DEPOSIT", key: "deposit", sortable: true },
    { name: "TENANT PRICE", key: "tenant_price", sortable: true },
    { name: "OWNER INCOME", key: "owner_income", sortable: true },
    { name: "ABIC INCOME", key: "abic_income", sortable: true },
    { name: "DUE DATE", key: "due", sortable: true },
    { name: "STATUS", key: "status", sortable: true },
    { name: "PAYMENTS", key: "payments", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = [
    "client",
    "property",
    "location",
    "start",
    "end",
    "due",
    "status",
    "payments",
    "actions",
  ];

  return (
    <>
      <Navbar account={account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <DataTable
              model="Collections"
              columns={columns}
              rows={collections || []}
              initialVisibleColumns={initialVisibleColumns}
              searchKey="property"
              sortKey="property"
              locations={locations}
              collectionClients={collectionClients || []}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Collections;
