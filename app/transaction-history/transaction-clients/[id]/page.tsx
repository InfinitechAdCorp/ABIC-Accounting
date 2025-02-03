import React from "react";
import {
  get as getTransactionClient,
  getAll as getTransactionClients,
} from "@/components/transactionHistory/transactionClients/actions";
import { get as getAccount } from "@/components/accounts/actions";
import { Card, CardBody } from "@nextui-org/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderCell from "@/components/transactionHistory/transactions/renderCell";
import CreateModal from "@/components/transactionHistory/transactions/createModal";

const TransactionClient = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const { account } = await getAccount();
  const { transactionClient } = await getTransactionClient(id);
  const { transactionClients } = await getTransactionClients();

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
              model={`Transactions of ${transactionClient.name}`}
              columns={columns}
              rows={transactionClient.transactions}
              searchKey="name"
              RenderCell={RenderCell}
              dependencies={{ transactionClients: transactionClients }}
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
