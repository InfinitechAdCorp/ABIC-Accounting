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

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold mb-3">
                {model.toUpperCase()}
              </h1>
              <div>
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
            </div>

            <DataTable
              model={model}
              columns={[
                ...columns,
                { key: "actions", name: "ACTIONS", sortable: false },
              ]}
              records={records}
              RenderBody={RenderBody}
              Buttons={Buttons}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TClients;
