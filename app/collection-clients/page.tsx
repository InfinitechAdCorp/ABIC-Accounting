"use client";

import React, { useState, useEffect } from "react";
import { getAll } from "@/components/collectionMonitoring/collectionClients/actions";
import { Card, CardBody } from "@nextui-org/react";
import DataTable from "@/components/collectionMonitoring/collectionClients/dataTable";
import Navbar from "@/components/globals/navbar";
import { FormattedCollectionClient } from "@/components/collectionMonitoring/types";

export const dynamic = "force-dynamic";

const CollectionClients = () => {
  const [accountID, setAccountID] = useState("");
  const [collectionClients, setCollectionClients] =
    useState<FormattedCollectionClient[]>();

  useEffect(() => {
    setAccountID(sessionStorage.getItem("accountID") || "");

    const fetchCollectionClients = async () => {
      const response = await getAll(accountID || "");
      setCollectionClients(response.collectionClients);
    };

    if (accountID) {
      fetchCollectionClients();
    }
  }, [accountID, collectionClients]);

  const columns = [
    { name: "NAME", key: "name", sortable: true },
    { name: "COLLECTIONS", key: "collections", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = ["name", "collections", "actions"];

  return (
    <>
      <Navbar />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">Clients</h1>
            <DataTable
              model="clients"
              columns={columns}
              rows={collectionClients || []}
              initialVisibleColumns={initialVisibleColumns}
              searchKey="name"
              sortKey="name"
              accountID={accountID}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default CollectionClients;
