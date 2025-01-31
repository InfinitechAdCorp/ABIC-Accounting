import React from "react";
import { getAll } from "@/components/collectionMonitoring/collectionClients/actions";
import { Card, CardBody } from "@nextui-org/react";
import DataTable from "@/components/collectionMonitoring/collectionClients/dataTable";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";

const CollectionClients = async () => {
  const { account } = await getAccount();
  const { collectionClients } = await getAll();

  const columns = [
    { name: "NAME", key: "name", sortable: true },
    { name: "COLLECTIONS", key: "collections", sortable: true },
    { name: "ACTIONS", key: "actions" },
  ];

  const initialVisibleColumns = ["name", "collections", "actions"];

  return (
    <>
      <Navbar account={account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <DataTable
              model="Clients"
              columns={columns}
              rows={collectionClients}
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

export default CollectionClients;
