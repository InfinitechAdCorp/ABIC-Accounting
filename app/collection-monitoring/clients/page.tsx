import React from "react";
import { getAll } from "@/components/collectionMonitoring/collectionClients/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import DataTable from "@/components/globals/dataTable";
import RenderCell from "@/components/collectionMonitoring/collectionClients/renderCell";
import CreateModal from "@/components/collectionMonitoring/collectionClients/createModal";
import { Account } from "@prisma/client";
import ExportBtn from "@/components/globals/exportBtn";

const CollectionClients = async () => {
  const { account } = await getAccount();
  const { collectionClients } = await getAll();

  const model = "Clients";

  const columns = [
    { key: "name", name: "NAME" },
    { key: "collections", name: "COLLECTIONS" },
    { key: "actions", name: "ACTIONS" },
  ];

  return (
    <>
      <Navbar account={account as Account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">{model.toUpperCase()}</h1>
            <DataTable
              model={model}
              columns={columns}
              rows={collectionClients}
              searchKey="name"
              RenderCell={RenderCell}
            >
              <>
              <CreateModal />
              
              <ExportBtn />
              </>
            </DataTable>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default CollectionClients;
