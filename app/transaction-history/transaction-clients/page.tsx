import React from "react";
import { getAll } from "@/components/transactionHistory/transactionClients/actions";
import { Card, CardBody } from "@nextui-org/react";
import DataTable from "@/components/transactionHistory/transactionClients/dataTable";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";

const TransactionClients = async () => {
  const { account } = await getAccount();
  const { transactionClients } = await getAll();

  const columns = [
    { name: "NAME", key: "name", sortable: true },
    { name: "TRANSACTIONS", key: "transactions", sortable: true },
    { name: "STARTING BALANCE", key: "starting_balance", sortable: true },
    { name: "CURRENT BALANCE", key: "current_balance", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = [
    "name",
    "transactions",
    "starting_balance",
    "current_balance",
    "actions",
  ];

  return (
    <>
      <Navbar account={account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <DataTable
              model="Clients"
              columns={columns}
              rows={transactionClients}
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

export default TransactionClients;
