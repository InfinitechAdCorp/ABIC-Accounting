import React from "react";
import { get as getAccount } from "@/components/accounts/actions";
import { getAll as getTransactions } from "@/components/transactionHistory/transactions/actions";
import { getAll as getTransactionClients } from "@/components/transactionHistory/transactionClients/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderCell from "@/components/transactionHistory/transactions/renderCell";
import CreateTransactionModal from "@/components/transactionHistory/transactions/createModal";
import CreateTransactionClientModal from "@/components/transactionHistory/transactionClients/createModal";
import { list } from "@vercel/blob";
import { computeBalance, formatNumber } from "@/components/globals/utils";
import { Account } from "@prisma/client";

const Transactions = async () => {
  const { account } = await getAccount();
  const { transactions } = await getTransactions();
  const { transactionClients } = await getTransactionClients();
  const { blobs } = await list();

  const model = "Transactions";
  const runningBalance = computeBalance([...transactions].reverse());

  const columns = [
    { key: "date", name: "DATE" },
    { key: "voucher", name: "VOUCHER" },
    { key: "check", name: "CHECK" },
    { key: "client", name: "CLIENT" },
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
              rows={transactions || []}
              searchKey="particulars"
              RenderCell={RenderCell}
              dependencies={{
                blobs: blobs,
                transactionClients: transactionClients,
              }}
            >
              <>
                <div className="hidden sm:flex">
                  <CreateTransactionClientModal />
                </div>

                <CreateTransactionModal
                  transactionClients={transactionClients}
                />
              </>
            </DataTable>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
