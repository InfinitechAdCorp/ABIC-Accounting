import React from "react";
import { getTransactions } from "@/components/transactionMonitoring/transactions/actions";
import { getAccounts } from "@/components/transactionMonitoring/accounts/actions";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import TransactionsTable from "@/components/transactionMonitoring/transactions/transactionsTable";
import Header from "@/components/globals/header";
import AddAccountModal from "@/components/transactionMonitoring/accounts/addAccountModal";
import AddTransactionModal from "@/components/transactionMonitoring/transactions/addTransactionModal";
import { formatAccounts, formatTransactions } from "@/components/globals/functions";

const Transactions = async () => {
  const columns = [
    { key: "date", label: "Voucher Date" },
    { key: "voucher", label: "Voucher Number" },
    { key: "check", label: "Check Number" },
    { key: "account.name", label: "Account" },
    { key: "particulars", label: "Particulars" },
    { key: "credit", label: "Credit" },
    { key: "debit", label: "Debit" },
    { key: "action", label: "Action" },
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
              columns={columns}
              transactions={formattedTransactions}
              accounts={formattedAccounts}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
