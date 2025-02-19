import React from "react";
import { getAll, tableFormat } from "@/components/listings/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import DataTable from "@/components/globals/dataTable";
import CreateModal from "@/components/listings/createModal";
import RenderBody from "@/components/listings/renderBody";
import { retry } from "@/components/globals/serverUtils";

const Listings = async () => {
  const { record: account } = await retry(getAccount);
  const { records } = await getAll();

  const model = "Listings";

  const columns = [
    { key: "id", name: "ID", sortable: false },
    { key: "client", name: "CLIENT", sortable: true },
    { key: "type", name: "TYPE", sortable: true },
    { key: "project", name: "PROJECT", sortable: true },
    { key: "unit", name: "UNIT", sortable: true },
    { key: "res", name: "DATE RES", sortable: true },
    { key: "terms", name: "TERMS", sortable: true },
    { key: "consultant", name: "CONSULTANT", sortable: true },
    { key: "manager", name: "MANAGER", sortable: true },
    { key: "list_price", name: "LIST PRICE", sortable: true },
    { key: "total_price", name: "TOTAL PRICE", sortable: true },
    { key: "status", name: "STATUS", sortable: true },
    { key: "source", name: "SOURCE", sortable: true },
    { key: "extension", name: "EXTENSION", sortable: true },
    { key: "aging", name: "AGING", sortable: true },
    { key: "closed", name: "CLOSED DATE", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  const rows = await tableFormat(columns, records);

  const Buttons = (
    <>
      <CreateModal />
    </>
  );

  return (
    <>
      <Navbar record={account!} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">
              {model.toUpperCase()}
            </h1>
            <DataTable
              model={model}
              records={records}
              columns={columns}
              rows={rows}
              searchKey="client"
              filterKey="res"
              RenderBody={RenderBody}
              Buttons={Buttons}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Listings;
