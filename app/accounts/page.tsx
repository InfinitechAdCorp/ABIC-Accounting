import React from "react";
import { getAccounts } from "@/components/transactionMonitoring/accounts/actions";
import {
  FormattedAccount,
  AccountWithTransactions,
} from "@/components/transactionMonitoring/types";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import HeaderButtons from "@/components/transactionMonitoring/accounts/headerButtons";
import AccountsTable from "@/components/transactionMonitoring/accounts/accountsTable";

const Accounts = async () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "balance", label: "Balance" },
    { key: "transactions", label: "Transactions" },
    { key: "action", label: "Action" },
  ];

  const { accounts } = await getAccounts();
  const formattedAccounts: FormattedAccount[] = [];

  const formatData = (accounts: AccountWithTransactions[]) => {
    accounts.forEach((account) => {
      let balance = account.balance.toNumber();
      const transactions = account.transactions;
      transactions.forEach((transaction) => {
        const amount = transaction.amount.toNumber();
        if (transaction.type == "Credit") {
          balance += amount;
        } else {
          balance -= amount;
        }
      });

      const formattedAccount = {
        ...account,
        balance: balance,
        transactions: transactions.length,
      };
      formattedAccounts.push(formattedAccount);
    });
  };

  formatData(accounts);

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <h1 className="font-bold">Accounts</h1>
              <HeaderButtons />
            </div>
          </CardHeader>
          <CardBody>
            <AccountsTable columns={columns} accounts={formattedAccounts} />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Accounts;
