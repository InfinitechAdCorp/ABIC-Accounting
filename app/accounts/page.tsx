import React from "react";
import { getAccounts } from "@/components/transactionMonitoring/accounts/actions";
import { Card, CardBody } from "@nextui-org/react";
import { formatAccounts } from "@/components/globals/utils";
import AccountsTable from "@/components/transactionMonitoring/accounts/accountsTable";

const Accounts = async () => {
  const columns = [
    { name: "NAME", key: "name", sortable: true },
    { name: "BALANCE", key: "balance", sortable: true },
    { name: "TRANSACTIONS", key: "transactions", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = ["name", "balance", "transactions", "actions"];

  const { accounts } = await getAccounts();
  const formattedAccounts = formatAccounts(accounts);

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">Accounts</h1>
            <AccountsTable
              model="accounts"
              columns={columns}
              rows={formattedAccounts}
              initialVisibleColumns={initialVisibleColumns}
              searchKey="name"
              sortKey="name"
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Accounts;
