import React from "react";
import { getAll as getTransactions } from "@/components/transactionHistory/transactions/actions";
import { getAll as getTransactionClients } from "@/components/transactionHistory/transactionClients/actions";
import { Card, CardBody } from "@nextui-org/react";
import { formatTransactionClients, formatTransactions } from "@/components/globals/utils";
import DataTable from "@/components/transactionHistory/transactions/dataTable";
import Navbar from "@/components/globals/navbar";

export const dynamic = "force-dynamic";

const Transactions = async () => {
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

  const { transactions } = await getTransactions();
  const formattedTransactions = formatTransactions(transactions);

  const { transactionClients } = await getTransactionClients();
  const formattedTransactionClients = formatTransactionClients(transactionClients);

  return (
    <>
      <Navbar />

      <div className="flex justify-center max-h-[93vh]">
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
      </div>
    </>
  );
};

export default Transactions;
