import React from "react";
import {
  get,
  getAll as getTClients,
} from "@/components/transactionHistory/tClients/actions";
import { getAll as getTransactions } from "@/components/transactionHistory/transactions/actions";
import { get as getAccount } from "@/components/accounts/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderCell from "@/components/transactionHistory/transactions/renderCell";
import CreateModal from "@/components/transactionHistory/transactions/createModal";
import { list } from "@vercel/blob";
import { computeBalance, formatNumber } from "@/components/globals/utils";
import { Account } from "@prisma/client";
import ExportBtn from "@/components/globals/exportBtn";
import { Transaction } from "@/components/transactionHistory/types";

const TClient = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const { record: account } = await getAccount();
  const { record } = await get(id);
  const { records: tClients } = await getTClients();
  const { records: transactions } = await getTransactions();
  const { blobs } = await list();

  const model = `${record?.name}'s Transactions`;
  const runningBalance = formatNumber(
    computeBalance([...(record?.transactions || [])].reverse())
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

  const setVoucher = (transaction: Transaction) => {
    let id = 1;
    if (transaction) {
      id = Number(transaction.voucher) + 1;
    }
    const voucher = `${id}`.padStart(5, "0");
    return voucher;
  };

  const voucher = setVoucher(transactions[0]);

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
              columns={columns}
              rows={record?.transactions || []}
              searchKey="name"
              RenderCell={RenderCell}
              dependencies={{
                blobs: blobs,
                tClients: tClients,
              }}
            >
              <>
                <CreateModal voucher={voucher} tClients={tClients} />
                <ExportBtn />
              </>
            </DataTable>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TClient;
