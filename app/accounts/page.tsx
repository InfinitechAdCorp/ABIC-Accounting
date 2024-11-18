import React from "react";
import { getAccounts } from "@/components/transactionMonitoring/accounts/actions";
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

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardHeader>
            <div className="flex justify-between">
              <h1 className="font-bold">Accounts</h1>
              <div className="flex gap-3">
                <HeaderButtons />
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <AccountsTable columns={columns} accounts={accounts} />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Accounts;
