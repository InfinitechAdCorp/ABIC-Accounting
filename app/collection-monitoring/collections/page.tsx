"use client";

import React, { useState, useEffect } from "react";
import { getAll as getCollections } from "@/components/collectionMonitoring/collections/actions";
import { getAll as getCollectionClients } from "@/components/collectionMonitoring/collectionClients/actions";
import { Card, CardBody } from "@nextui-org/react";
import DataTable from "@/components/collectionMonitoring/collections/dataTable";
import Navbar from "@/components/globals/navbar";
import {
  FormattedCollection,
  FormattedCollectionClient,
} from "@/components/collectionMonitoring/types";

const Collections = () => {
  const [accountID, setAccountID] = useState("");
  const [collections, setCollections] = useState<FormattedCollection[]>();
  const [collectionClients, setCollectionClients] =
    useState<FormattedCollectionClient[]>();

  useEffect(() => {
    setAccountID(sessionStorage.getItem("accountID") || "");

    const fetchCollections = async () => {
      getCollections(accountID || "").then((response) => {
        setCollections(response.collections);
      });
    };

    const fetchCollectionClients = async () => {
      getCollectionClients(accountID || "").then((response) => {
        setCollectionClients(response.collectionClients);
      });
    };

    if (accountID) {
      fetchCollections();
      fetchCollectionClients();
    }
  }, [accountID]);

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
      <Navbar />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">Collections</h1>
            <DataTable
              model="collections"
              columns={columns}
              rows={collections || []}
              initialVisibleColumns={initialVisibleColumns}
              searchKey="property"
              sortKey="property"
              locations={locations}
              accountID={accountID}
              collectionClients={collectionClients || []}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Collections;
