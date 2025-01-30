"use client";

import React, { useState, useEffect } from "react";
import { getAll } from "@/components/transactionHistory/transactionClients/actions";
import { Card, CardBody } from "@nextui-org/react";
import DataTable from "@/components/transactionHistory/transactionClients/dataTable";
import Navbar from "@/components/globals/navbar";
import { FormattedTransactionClient } from "@/components/transactionHistory/types";

export const dynamic = "force-dynamic";

const TransactionClients = () => {
  const [accountID, setAccountID] = useState("");
  const [transactionClients, setTransactionClients] =
    useState<FormattedTransactionClient[]>();

  useEffect(() => {
    setAccountID(sessionStorage.getItem("accountID") || "");

    const fetchTransactionClients = async () => {
      getAll(accountID || "").then((response) => {
        setTransactionClients(response.transactionClients);
      });
    };

    if (accountID) {
      fetchTransactionClients();
    }
  }, [accountID, transactionClients]);

  const columns = [
    { name: "NAME", key: "name", sortable: true },
    { name: "TRANSACTIONS", key: "transactions", sortable: true },
    { name: "STARTING BALANCE", key: "starting_balance", sortable: true },
    { name: "CURRENT BALANCE", key: "current_balance", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = [
    "name",
    "transactions",
    "starting_balance",
    "current_balance",
    "actions",
  ];

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
              rows={transactionClients || []}
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

export default TransactionClients;
