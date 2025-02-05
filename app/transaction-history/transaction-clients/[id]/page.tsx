import React from "react";
import {
  get as getTransactionClient,
  getAll as getTransactionClients,
} from "@/components/transactionHistory/transactionClients/actions";
import { get as getAccount } from "@/components/accounts/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderCell from "@/components/transactionHistory/transactions/renderCell";
import CreateModal from "@/components/transactionHistory/transactions/createModal";
import { list } from "@vercel/blob";
import { computeBalance, formatNumber } from "@/components/globals/utils";
import { Account } from "@prisma/client";

const TransactionClient = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const { account } = await getAccount();
  const { transactionClient } = await getTransactionClient(id);
  const { transactionClients } = await getTransactionClients();
  const { blobs } = await list();

  const model = `${transactionClient?.name}'s Transactions`;
  const runningBalance = computeBalance(
    [...(transactionClient?.transactions || [])].reverse()
  );

  const columns = [
    { key: "date", name: "DATE" },
    { key: "voucher", name: "VOUCHER" },
    { key: "check", name: "CHECK" },
    { key: "particulars", name: "PARTICULARS" },
    { key: "credit", name: "CREDIT" },
    { key: "debit", name: "DEBIT" },
    { key: "proof", name: "PROOF" },
    { key: "actions", name: "ACTIONS" },
  ];

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
              rows={transactionClient?.transactions || []}
              searchKey="name"
              RenderCell={RenderCell}
              dependencies={{
                blobs: blobs,
                transactionClients: transactionClients,
              }}
            >
              <CreateModal transactionClients={transactionClients} />
            </DataTable>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TransactionClient;
