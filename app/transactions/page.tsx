import React from "react";
import { getTransactions } from "@/components/transactionMonitoring/transactions/actions";
import { getAccounts } from "@/components/transactionMonitoring/accounts/actions";
import { Card, CardBody } from "@nextui-org/react";
import { formatAccounts, formatTransactions } from "@/components/globals/utils";
import TransactionsTable from "@/components/transactionMonitoring/transactions/dataTable";

const Transactions = async () => {
  const columns = [
    { name: "DATE", key: "date", sortable: true },
    { name: "VOUCHER", key: "voucher", sortable: true },
    { name: "CHECK", key: "check", sortable: true },
    { name: "ACCOUNT", key: "account", sortable: true },
    { name: "PARTICULARS", key: "particulars", sortable: true },
    { name: "TYPE", key: "type", sortable: true },
    { name: "AMOUNT", key: "amount", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = [
    "date",
    "voucher",
    "check",
    "account",
    "particulars",
    "type",
    "amount",
    "actions",
  ];

  const { transactions } = await getTransactions();
  const formattedTransactions = formatTransactions(transactions);

  const { accounts } = await getAccounts();
  const formattedAccounts = formatAccounts(accounts);

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">Transactions</h1>
            <TransactionsTable
              model="transactions"
              columns={columns}
              rows={formattedTransactions}
              initialVisibleColumns={initialVisibleColumns}
              searchKey="particulars"
              sortKey="date"
              accounts={formattedAccounts}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
