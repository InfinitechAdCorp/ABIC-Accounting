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
    { key: "date", name: "DATE" },
    { key: "voucher", name: "VOUCHER" },
    { key: "check", name: "CHECK" },
    { key: "client", name: "CLIENT" },
    { key: "particulars", name: "PARTICULARS" },
    { key: "credit", name: "CREDIT" },
    { key: "debit", name: "DEBIT" },
    { key: "proof", name: "PROOF" },
    { key: "actions", name: "ACTIONS" },
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
              searchKey="particulars"
              transactionClients={transactionClients || []}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
