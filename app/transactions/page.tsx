import React from "react";
import { getTransactions } from "@/components/transactionMonitoring/transactions/actions";
import { getAccounts } from "@/components/transactionMonitoring/accounts/actions";
import {
  FormattedTransaction,
  TransactionWithAccount,
  FormattedAccount,
  AccountWithTransactions,
} from "@/components/transactionMonitoring/types";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import TransactionsTable from "@/components/transactionMonitoring/transactions/transactionsTable";
import HeaderButtons from "@/components/transactionMonitoring/transactions/headerButtons";

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
  const formattedTransactions: FormattedTransaction[] = [];

  const formatTransactionsData = (transactions: TransactionWithAccount[]) => {
    transactions.forEach((transaction) => {
      const account = transaction.account;
      const balance = account?.balance.toNumber();
      const amount = transaction.amount.toNumber();

      const formattedTransaction = {
        ...transaction,
        account: {
          ...account,
          id: account?.id as string,
          name: account?.name as string,
          balance: balance as number,
        },
        account_id: transaction.account_id as string,
        amount: amount,
      };
      formattedTransactions.push(formattedTransaction);
    });
  };

  formatTransactionsData(transactions);

  const { accounts } = await getAccounts();
  const formattedAccounts: FormattedAccount[] = [];

  const formatAccountsData = (accounts: AccountWithTransactions[]) => {
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

  formatAccountsData(accounts);

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <h1 className="font-bold">Transactions</h1>
              <div className="flex gap-2">
                <HeaderButtons accounts={formattedAccounts} />
              </div>
            </div>
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
