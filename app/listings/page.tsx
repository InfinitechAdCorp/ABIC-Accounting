import React from "react";
import { getAll, tableFormat } from "@/components/listings/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import DataTable from "@/components/globals/dataTable";
import CreateModal from "@/components/listings/createModal";
import ExportRangeModal from "@/components/globals/exportRangeModal";
import RenderBody from "@/components/listings/renderBody";
import { retry } from "@/components/globals/serverUtils";
import { getUniques } from "@/components/globals/utils";

const Listings = async () => {
  const { record: account } = await retry(getAccount);
  const { records } = await getAll();

  const model = "Listings";

  const columns = [
    { key: "id", name: "ID" },
    { key: "client", name: "CLIENT" },
    { key: "type", name: "TYPE" },
    { key: "project", name: "PROJECT" },
    { key: "unit", name: "UNIT" },
    { key: "res", name: "DATE RES" },
    { key: "terms", name: "TERMS" },
    { key: "consultant", name: "CONSULTANT" },
    { key: "manager", name: "MANAGER" },
    { key: "list_price", name: "LIST PRICE" },
    { key: "total_price", name: "TOTAL PRICE" },
    { key: "status", name: "STATUS" },
    { key: "source", name: "SOURCE" },
    { key: "extension", name: "EXTENSION" },
    { key: "aging", name: "AGING" },
    { key: "closed", name: "CLOSED DATE" },
    { key: "actions", name: "ACTIONS" },
  ];

  const rows = await tableFormat(columns, records);

  const uniqueNames = getUniques(records, 'client');


  const Buttons = (
    <>
      <CreateModal />
      <ExportRangeModal
        model={model}
        columns={columns}
        rows={rows}
        filterKey="res"
      />
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
