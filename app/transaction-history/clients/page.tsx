import React from "react";
import {
  getAll,
  displayFormat,
} from "@/components/transactionHistory/tClients/actions";
import { getAll as getTransactions } from "@/components/transactionHistory/transactions/actions";
import { get as getAccount } from "@/components/accounts/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderBody from "@/components/transactionHistory/tClients/renderBody";
import CreateModal from "@/components/transactionHistory/tClients/createModal";
import { computeBalance, formatNumber } from "@/components/globals/utils";
import { retry } from "@/components/globals/serverUtils";
import { Tooltip } from "@heroui/react";

const TClients = async () => {
  const { record: account } = await retry(getAccount);
  const { records: ufRecords } = await getAll();
  const { records: transactions } = await getTransactions();

  const model = "Clients";

  const result = computeBalance([...transactions].reverse());

  const columns = [
    { key: "name", name: "NAME", sortable: true },
    { key: "transactions", name: "TRANSACTIONS", sortable: true },
    { key: "starting_fund", name: "STARTING FUND", sortable: true },
    { key: "running_balance", name: "RUNNING BALANCE", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  const records = await displayFormat(columns, ufRecords);

  const Buttons = (
    <>
      <CreateModal />
    </>
  );

  const SideContent = (
    <div role="button">
      <Tooltip
        content={
          <>
            <h3>Credit: {formatNumber(result.credit)}</h3>
            <h3>Debit: {formatNumber(result.debit)}</h3>
          </>
        }
      >
        <h1 className="text-md font-semibold mb-3">
          RUNNING BALANCE: {formatNumber(result.balance)}
        </h1>
      </Tooltip>
    </div>
  );

  return (
    <>
      <Navbar record={account!} />

      <div className="max-h-[93vh]">
        <DataTable
          model={model}
          columns={columns}
          records={records}
          RenderBody={RenderBody}
          Buttons={Buttons}
          SideContent={SideContent}
        />
      </div>
    </>
  );
};

export default TClients;
