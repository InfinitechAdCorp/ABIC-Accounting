import React from "react";
import { getTransactions } from "@/components/transactionMonitoring/transactions/actions";
import {
  FormattedTransaction,
  TransactionWithAccount,
} from "@/components/transactionMonitoring/types";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import TransactionsTable from "@/components/transactionMonitoring/transactions/transactionsTable";

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
            <TransactionsTable columns={columns} transactions={formattedTransactions} />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
