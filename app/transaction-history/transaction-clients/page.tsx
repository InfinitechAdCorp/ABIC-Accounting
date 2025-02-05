import React from "react";
import { getAll } from "@/components/transactionHistory/transactionClients/actions";
import { get as getAccount } from "@/components/accounts/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderCell from "@/components/transactionHistory/transactionClients/renderCell";
import CreateModal from "@/components/transactionHistory/transactionClients/createModal";

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
              RenderCell={RenderCell}
            >
              <CreateModal />
            </DataTable>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TransactionClients;
