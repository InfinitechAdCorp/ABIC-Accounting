import React from "react";
import {
  get as getCollectionClient,
  getAll as getCollectionClients,
} from "@/components/collectionMonitoring/collectionClients/actions";
import { get as getAccount } from "@/components/accounts/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderCell from "@/components/collectionMonitoring/collections/renderCell";
import CreateModal from "@/components/collectionMonitoring/collections/createModal";

const TransactionClient = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const { account } = await getAccount();
  const { collectionClient } = await getCollectionClient(id);
  const { collectionClients } = await getCollectionClients();

  const locations = [
    { key: "All", name: "All" },
    { key: "Bacoor", name: "Bacoor" },
    { key: "Makati", name: "Makati" },
    { key: "BGC", name: "BGC" },
    { key: "Pasay", name: "Pasay" },
    { key: "Mandaluyong", name: "Mandaluyong" },
    { key: "QC", name: "QC" },
    { key: "Pasig", name: "Pasig" },
    { key: "Paranaque", name: "Paranaque" },
  ];

  const columns = [
    { key: "property", name: "PROPERTY" },
    { key: "location", name: "LOCATION" },
    { key: "start", name: "CONTRACT START" },
    { key: "end", name: "CONTRACT END" },
    { key: "advance", name: "ADVANCE" },
    { key: "deposit", name: "DEPOSIT" },
    { key: "tenant_price", name: "TENANT PRICE" },
    { key: "owner_income", name: "OWNER INCOME" },
    { key: "abic_income", name: "ABIC INCOME" },
    { key: "due", name: "DUE DATE" },
    { key: "status", name: "STATUS" },
    { key: "payments", name: "PAYMENTS" },
    { key: "actions", name: "ACTIONS" },
  ];

  return (
    <>
      <Navbar account={account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <DataTable
              model={`${collectionClient?.name}'s Collections`}
              columns={columns}
              rows={collectionClient?.collections || []}
              searchKey="name"
              RenderCell={RenderCell}
              dependencies={{
                locations: locations,
                collectionClients: collectionClients,
              }}
            >
              <CreateModal locations={locations} collectionClients={collectionClients} />
            </DataTable>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TransactionClient;
