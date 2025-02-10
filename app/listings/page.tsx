import React from "react";
import {
  getAll,
//   tableFormat,
} from "@/components/listings/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
// import DataTable from "@/components/globals/dataTable";
// import CreateModal from "@/components/listings/createModal";
import { Account } from "@prisma/client";
// import ExportBtn from "@/components/globals/exportBtn";
// import RenderBody from "@/components/listings/renderBody";

const Listings = async () => {
  const { record: account } = await getAccount();
  const { records } = await getAll();

    console.log(records)

  const model = "Listings";

//   const columns = [
//     { key: "name", name: "NAME" },
//     { key: "collections", name: "COLLECTIONS" },
//     { key: "actions", name: "ACTIONS" },
//   ];

//   const rows = await tableFormat(columns.slice(0, -1), records);

  return (
    <>
      <Navbar record={account as Account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <h1 className="text-lg font-semibold mb-3">
              {model.toUpperCase()}
            </h1>
            {/* <CreateModal /> */}
            {/* <DataTable
              model={model}
              records={records}
              columns={columns}
              rows={rows}
              searchKey="name"
              RenderBody={RenderBody}
            >
              <>
                <CreateModal />
                <ExportBtn columns={columns.slice(0, -1)} rows={rows} />
              </>
            </DataTable> */}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Listings;
