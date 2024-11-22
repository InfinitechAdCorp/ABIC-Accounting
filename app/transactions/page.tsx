import React from "react";
import { getTransactions } from "@/components/transactionMonitoring/transactions/actions";
import { getAccounts } from "@/components/transactionMonitoring/accounts/actions";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import TransactionsTable from "@/components/transactionMonitoring/transactions/transactionsTable";
import Header from "@/components/globals/header";
import AddAccountModal from "@/components/transactionMonitoring/accounts/addAccountModal";
import AddTransactionModal from "@/components/transactionMonitoring/transactions/addTransactionModal";
import { formatAccounts, formatTransactions } from "@/components/globals/utils";
import DataTable from "@/components/globals/dataTable";

const Transactions = async () => {
  const oldColumns = [
    { key: "date", label: "Voucher Date" },
    { key: "voucher", label: "Voucher Number" },
    { key: "check", label: "Check Number" },
    { key: "account.name", label: "Account" },
    { key: "particulars", label: "Particulars" },
    { key: "credit", label: "Credit" },
    { key: "debit", label: "Debit" },
    { key: "action", label: "Action" },
  ];

  const columns = [
    { name: "DATE", key: "date", sortable: true },
    { name: "VOUCHER", key: "voucher", sortable: true },
    { name: "CHECK", key: "check", sortable: true },
    { name: "ACCOUNT", key: "account.name", sortable: true },
    { name: "PARTICULARS", key: "particulars", sortable: true },
    { name: "TYPE", key: "type", sortable: true },
    { name: "AMOUNT", key: "amount", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = [
    "date",
    "voucher",
    "check",
    "account.name",
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
          <CardHeader>
            <Header title="Transactions">
              <div className="flex gap-2">
                <AddAccountModal />
                <AddTransactionModal accounts={formattedAccounts} />
              </div>
            </Header>
          </CardHeader>
          <CardBody>
            <TransactionsTable
              columns={oldColumns}
              transactions={formattedTransactions}
              accounts={formattedAccounts}
            />
          </CardBody>
        </Card>
      </div>

      <div className="flex justify-center">
        <Card>
          <CardBody>
            <DataTable
              model="transactions"
              columns={columns}
              rows={formattedTransactions}
              initialVisibleColumns={initialVisibleColumns}
              sortKey="voucher"
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
