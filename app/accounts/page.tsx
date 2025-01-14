import React from "react";
import { getAll } from "@/components/transactionMonitoring/accounts/actions";
import { Card, CardBody } from "@nextui-org/react";
import { formatAccounts } from "@/components/globals/utils";
import DataTable from "@/components/transactionMonitoring/accounts/dataTable";
import Navbar from "@/components/globals/navbar";

export const dynamic = "force-dynamic";

const Accounts = async () => {
  const columns = [
    { name: "NAME", key: "name", sortable: true },
    { name: "STARTING BALANCE", key: "starting_balance", sortable: true },
    { name: "CURRENT BALANCE", key: "current_balance", sortable: true },
    { name: "TRANSACTIONS", key: "transactions", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = [
    "name",
    "starting_balance",
    "current_balance",
    "transactions",
    "actions",
  ];

  const { accounts } = await getAll();
  const formattedAccounts = formatAccounts(accounts);

  return (
    <>
      <Navbar />
      
      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">Accounts</h1>
            <DataTable
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
