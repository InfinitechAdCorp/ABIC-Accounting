import React from "react";
import { getTransactions } from "@/components/transactionMonitoring/transactions/actions";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

const Transactions = async () => {
  const { transactions } = await getTransactions();
  console.log("🚀 ~ Transactions ~ transactions:", transactions);
  
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
