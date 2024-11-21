import React from "react";
import { getAccounts } from "@/components/transactionMonitoring/accounts/actions";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import AccountsTable from "@/components/transactionMonitoring/accounts/accountsTable";
import Header from "@/components/globals/header";
import AddAccountModal from "@/components/transactionMonitoring/accounts/addAccountModal";
import { formatAccounts } from "@/components/globals/functions";

const Accounts = async () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "balance", label: "Balance" },
    { key: "transactions", label: "Transactions" },
    { key: "action", label: "Action" },
  ];

  const { accounts } = await getAccounts();
  const formattedAccounts = formatAccounts(accounts);

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