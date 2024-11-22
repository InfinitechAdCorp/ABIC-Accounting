import React from "react";
import { getAccounts } from "@/components/transactionMonitoring/accounts/actions";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Header from "@/components/globals/header";
import AddAccountModal from "@/components/transactionMonitoring/accounts/addAccountModal";
import { formatAccounts } from "@/components/globals/utils";
import DataTable from "@/components/globals/dataTable";
import AccountsTable from "@/components/transactionMonitoring/accounts/accountsTable";

const Accounts = async () => {
  const oldColumns = [
    { key: "name", label: "Name" },
    { key: "balance", label: "Balance" },
    { key: "transactions", label: "Transactions" },
    { key: "action", label: "Action" },
  ];

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
          <CardHeader>
            <Header title="Accounts">
              <AddAccountModal />
            </Header>
          </CardHeader>
          <CardBody>
            <AccountsTable columns={oldColumns} accounts={formattedAccounts} />
          </CardBody>
        </Card>
      </div>

      <div className="flex justify-center">
        <Card>
          <CardBody>
            <DataTable
              model="accounts"
              columns={columns}
              rows={formattedAccounts}
              initialVisibleColumns={initialVisibleColumns}
              sortKey="name"
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Accounts;
