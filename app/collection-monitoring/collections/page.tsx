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
              searchKey="property"
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
