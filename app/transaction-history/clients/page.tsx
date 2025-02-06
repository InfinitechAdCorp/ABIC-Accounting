import React from "react";
import { getAll as getTransactionClients } from "@/components/transactionHistory/transactionClients/actions";
import { getAll as getTransactions } from "@/components/transactionHistory/transactions/actions";
import { get as getAccount } from "@/components/accounts/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderCell from "@/components/transactionHistory/transactionClients/renderCell";
import CreateModal from "@/components/transactionHistory/transactionClients/createModal";
import {
  computeBalance,
  displayFormatTransactionClients,
  formatNumber,
} from "@/components/globals/utils";
import { Account } from "@prisma/client";
import ExportBtn from "@/components/globals/exportBtn";

const TransactionClients = async () => {
  const { account } = await getAccount();
  const { transactionClients } = await getTransactionClients();
  const { transactions } = await getTransactions();

  const model = "Clients";
  const runningBalance = computeBalance([...transactions].reverse());

  const columns = [
    { key: "name", name: "NAME" },
    { key: "transactions", name: "TRANSACTIONS" },
    { key: "starting_fund", name: "STARTING FUND" },
    { key: "running_balance", name: "RUNNING BALANCE" },
    { key: "actions", name: "ACTIONS" },
  ];

  const { columnNames, rows } = displayFormatTransactionClients(
    columns.slice(0, -1),
    transactionClients
  );

  return (
    <>
      <Navbar account={account as Account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold mb-3">
                {model.toUpperCase()}
              </h1>
              <h1 className="text-md font-semibold mb-3">
                RUNNING BALANCE: {formatNumber(runningBalance)}
              </h1>
            </div>

            <DataTable
              model={model}
              columns={columns}
              rows={transactionClients}
              searchKey="name"
              RenderCell={RenderCell}
            >
              <>
                <CreateModal />
                <ExportBtn columns={columnNames} rows={rows} />
              </>
            </DataTable>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TransactionClients;
