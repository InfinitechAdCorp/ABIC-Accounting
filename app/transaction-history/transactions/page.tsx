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

const Transactions = async () => {
  const { account } = await getAccount();
  const { transactions } = await getTransactions();
  const { transactionClients } = await getTransactionClients();
  const { blobs } = await list();

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
      <Navbar account={account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <DataTable
              model="Transactions"
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
