import React from "react";
import { getAll as getTransactions } from "@/components/transactionHistory/transactions/actions";
import { getAll as getTransactionClients } from "@/components/transactionHistory/transactionClients/actions";
import { Card, CardBody } from "@nextui-org/react";
import DataTable from "@/components/transactionHistory/transactions/dataTable";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";

const Transactions = async () => {
  const { account } = await getAccount();
  const { transactions } = await getTransactions();
  const { transactionClients } = await getTransactionClients();

  const columns = [
    { name: "DATE", key: "date", sortable: true },
    { name: "VOUCHER", key: "voucher", sortable: true },
    { name: "CHECK", key: "check", sortable: true },
    { name: "CLIENT", key: "client", sortable: true },
    { name: "PARTICULARS", key: "particulars", sortable: true },
    { name: "CREDIT", key: "credit", sortable: true },
    { name: "DEBIT", key: "debit", sortable: true },
    { name: "PROOF", key: "proof", sortable: true },
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
    "proof",
  ];

  return (
    <>
      <Navbar account={account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <DataTable
              model="Transactions"
              columns={columns}
              rows={transactions || []}
              initialVisibleColumns={initialVisibleColumns}
              searchKey="particulars"
              sortKey="date"
              transactionClients={transactionClients || []}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
