import React from "react";
import { getTransactions } from "@/components/transactionMonitoring/transactions/actions";
import {
  FormattedTransaction,
  TransactionWithAccount,
} from "@/components/transactionMonitoring/types";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

const Transactions = async () => {
  const { transactions } = await getTransactions();
  console.log("🚀 ~ Transactions ~ transactions:", transactions);
  const formattedTransactions: FormattedTransaction[] = [];

  const formatData = (transactions: TransactionWithAccount[]) => {
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

  formatData(transactions);

  console.log(formattedTransactions);

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <h1 className="font-bold">Transactions</h1>
              {/* <HeaderButtons /> */}
            </div>
          </CardHeader>
          <CardBody>
            {/* <AccountsTable columns={columns} accounts={formattedAccounts} /> */}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
