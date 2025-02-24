import React from "react";
import { getAll, displayFormat } from "@/components/listings/actions";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import DataTable from "@/components/globals/dataTable";
import CreateModal from "@/components/listings/createModal";
import RenderBody from "@/components/listings/renderBody";
import { retry } from "@/components/globals/serverUtils";

const Listings = async () => {
  const { record: account } = await retry(getAccount);
  const { records: ufRecords } = await getAll();

  const model = "Listings";

  const columns = [
    { key: "client", name: "CLIENT", sortable: true },
    { key: "type", name: "TYPE", sortable: true },
    { key: "project", name: "PROJECT", sortable: true },
    { key: "unit", name: "UNIT", sortable: true },
    { key: "res", name: "DATE RES", sortable: true },
    { key: "terms", name: "TERMS", sortable: true },
    { key: "specialist", name: "PROPERTY SPECIALIST", sortable: true },
    { key: "manager", name: "SALES MANAGER", sortable: true },
    { key: "list_price", name: "LIST PRICE", sortable: true },
    { key: "total_price", name: "TOTAL PRICE", sortable: true },
    { key: "status", name: "STATUS", sortable: true },
    { key: "source", name: "SOURCE", sortable: true },
    { key: "extension", name: "EXTENSION", sortable: true },
    { key: "aging", name: "AGING", sortable: true },
    { key: "closed", name: "CLOSED DATE", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  const records = await displayFormat(columns, ufRecords);

  const Buttons = (
    <>
      <CreateModal />
    </>
  );

  return (
    <>
      <Navbar record={account!} />

      <div className="max-h-[93vh]">
        <DataTable
          model={model}
          columns={columns}
          records={records}
          filterKey="res"
          RenderBody={RenderBody}
          Buttons={Buttons}
        />
      </div>
    </>
  );
};

export default Listings;
