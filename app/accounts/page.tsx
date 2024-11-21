import React from "react";
import { getAccounts } from "@/components/transactionMonitoring/accounts/actions";
import {
  FormattedAccount,
  AccountWithTransactions,
} from "@/components/transactionMonitoring/types";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import AccountsTable from "@/components/transactionMonitoring/accounts/accountsTable";
import Header from "@/components/globals/header";
import AddAccountModal from "@/components/transactionMonitoring/accounts/addAccountModal";

const Accounts = async () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "balance", label: "Balance" },
    { key: "transactions", label: "Transactions" },
    { key: "action", label: "Action" },
  ];

  const { accounts } = await getAccounts();

  const formatData = (accounts: AccountWithTransactions[]) => {
    const formattedAccounts: FormattedAccount[] = [];

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

    return formattedAccounts;
  };

  const formattedAccounts = formatData(accounts);

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardHeader>
            <Header title="Accounts">
              <AddAccountModal />
            </Header>
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
