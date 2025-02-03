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
    { key: "name", name: "NAME" },
    { key: "transactions", name: "TRANSACTIONS" },
    { key: "starting_balance", name: "STARTING BALANCE" },
    { key: "current_balance", name: "CURRENT BALANCE" },
    { key: "actions", name: "ACTIONS" },
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
              searchKey="name"
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TransactionClients;
