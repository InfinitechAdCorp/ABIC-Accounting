import React from "react";
import {
  getAll,
  displayFormat,
} from "@/components/transactionHistory/tClients/actions";
import { getAll as getTransactions } from "@/components/transactionHistory/transactions/actions";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/transactionHistory/tClients/renderBody";
import { computeBalance, formatNumber } from "@/components/globals/utils";
import { Tooltip } from "@heroui/react";
import { get as getCookies } from "@/components/globals/auth";

const TClients = async () => {
  const { record: cookies } = await getCookies();
  const { records: ufRecords } = await getAll();
  const { records: transactions } = await getTransactions();

  const model = "Clients";

  const result = computeBalance(transactions);

  const columns = [
    { key: "name", name: "NAME", sortable: true },
    { key: "transactions", name: "TRANSACTIONS", sortable: true },
    { key: "starting_fund", name: "STARTING FUND", sortable: true },
    { key: "credit", name: "CREDIT", sortable: true },
    { key: "debit", name: "DEBIT", sortable: true },
    { key: "running_balance", name: "RUNNING BALANCE", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  const records = await displayFormat(columns, ufRecords);

  const SideContent = (
    <div className="text-end">
      <Tooltip
        content={
          <>
            <h3>Credit: {formatNumber(result.credit)}</h3>
            <h3>Debit: {formatNumber(result.debit)}</h3>
          </>
        }
      >
        <h1 className="inline text-md font-semibold" role="button">
          RUNNING BALANCE: {formatNumber(result.balance)}
        </h1>
      </Tooltip>
    </div>
  );

  return (
    <>
      <Navbar record={cookies} />

      <div className="max-h-screen">
        <DataTable
          baseModel={model}
          columns={columns}
          records={records}
          RenderBody={RenderBody}
          SideContent={SideContent}
        />
      </div>
    </>
  );
};

export default TClients;
