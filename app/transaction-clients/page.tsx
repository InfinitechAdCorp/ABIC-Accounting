import React from "react";
import { getAll } from "@/components/transactionHistory/transactionClients/actions";
import { Card, CardBody } from "@nextui-org/react";
import { formatTransactionClients } from "@/components/globals/utils";
import DataTable from "@/components/transactionHistory/transactionClients/dataTable";
import Navbar from "@/components/globals/navbar";

export const dynamic = "force-dynamic";

const TransactionClients = async () => {
  const columns = [
    { name: "NAME", key: "name", sortable: true },
    { name: "TRANSACTIONS", key: "transactions", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = [
    "name",
    "transactions",
    "actions",
  ];

  const { transactionClients } = await getAll();
  const formattedTransactionClients = formatTransactionClients(transactionClients);

  return (
    <>
      <Navbar />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">Clients</h1>
            <DataTable
              model="clients"
              columns={columns}
              rows={formattedTransactionClients}
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
