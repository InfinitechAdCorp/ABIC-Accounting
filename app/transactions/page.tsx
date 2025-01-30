"use client";

import React, { useState, useEffect } from "react";
import { getAll as getTransactions } from "@/components/transactionHistory/transactions/actions";
import { getAll as getTransactionClients } from "@/components/transactionHistory/transactionClients/actions";
import { Card, CardBody } from "@nextui-org/react";
import DataTable from "@/components/transactionHistory/transactions/dataTable";
import Navbar from "@/components/globals/navbar";
import {
  FormattedTransaction,
  FormattedTransactionClient,
} from "@/components/transactionHistory/types";

export const dynamic = "force-dynamic";

const Transactions = () => {
  const [accountID, setAccountID] = useState("");
  const [transactions, setTransactions] = useState<FormattedTransaction[]>();
  const [transactionClients, setTransactionClients] =
    useState<FormattedTransactionClient[]>();

  useEffect(() => {
    setAccountID(sessionStorage.getItem("accountID") || "");

    const fetchTransactions = async () => {
      const response = await getTransactions(accountID || "");
      setTransactions(response.transactions);
    };

    const fetchTransactionClients = async () => {
      const response = await getTransactionClients(accountID || "");
      setTransactionClients(response.transactionClients);
    };

    if (accountID) {
      fetchTransactions();
      fetchTransactionClients();
    }
  }, [accountID, transactions, transactionClients]);

  const columns = [
    { name: "DATE", key: "date", sortable: true },
    { name: "VOUCHER", key: "voucher", sortable: true },
    { name: "CHECK", key: "check", sortable: true },
    { name: "CLIENT", key: "client", sortable: true },
    { name: "PARTICULARS", key: "particulars", sortable: true },
    { name: "CREDIT", key: "credit", sortable: true },
    { name: "DEBIT", key: "debit", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = [
    "date",
    "voucher",
    "check",
    "client",
    "particulars",
    "credit",
    "debit",
    "actions",
  ];

  // const { transactions } = await getTransactions();
  // const formattedTransactions = formatTransactions(transactions);

  // const { transactionClients } = await getTransactionClients();
  // const formattedTransactionClients = formatTransactionClients(transactionClients);

  return (
    <>
      <Navbar />

      {/* <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">Transactions</h1>
            <DataTable
              model="transactions"
              columns={columns}
              rows={formattedTransactions}
              initialVisibleColumns={initialVisibleColumns}
              searchKey="particulars"
              sortKey="date"
              transactionClients={formattedTransactionClients}
            />
          </CardBody>
        </Card>
      </div> */}
    </>
  );
};

export default Transactions;
