import React from "react";
import {
  getAll,
  tableFormat,
} from "@/components/transactionHistory/tClients/actions";
import { getAll as getTransactions } from "@/components/transactionHistory/transactions/actions";
import { get as getAccount } from "@/components/accounts/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderBody from "@/components/transactionHistory/tClients/renderBody";
import CreateModal from "@/components/transactionHistory/tClients/createModal";
import { computeBalance, formatNumber } from "@/components/globals/utils";
import { Account } from "@prisma/client";
import ExportBtn from "@/components/globals/exportBtn";

const TClients = async () => {
  const { record: account } = await getAccount();
  const { records } = await getAll();
  const { records: transactions } = await getTransactions();

  const model = "Clients";
  const runningBalance = formatNumber(
    computeBalance([...transactions].reverse())
  );

  const columns = [
    { key: "name", name: "NAME" },
    { key: "transactions", name: "TRANSACTIONS" },
    { key: "starting_fund", name: "STARTING FUND" },
    { key: "running_balance", name: "RUNNING BALANCE" },
    { key: "actions", name: "ACTIONS" },
  ];

  const rows = await tableFormat(columns.slice(0, -1), records);

  return (
    <>
      <Navbar record={account as Account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold mb-3">
                {model.toUpperCase()}
              </h1>
              <h1 className="text-md font-semibold mb-3">
                RUNNING BALANCE: {runningBalance}
              </h1>
            </div>

            <DataTable
              model={model}
              records={records}
              columns={columns}
              rows={rows}
              searchKey="name"
              RenderBody={RenderBody}
            >
              <>
                <CreateModal />
                <ExportBtn columns={columns.slice(0, -1)} rows={rows} />
              </>
            </DataTable>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TClients;
