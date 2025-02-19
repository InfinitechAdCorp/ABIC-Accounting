import React from "react";
import { get as getAccount } from "@/components/accounts/actions";
import {
  getAll,
  tableFormat,
} from "@/components/transactionHistory/transactions/actions";
import { getAll as getTClients } from "@/components/transactionHistory/tClients/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderBody from "@/components/transactionHistory/transactions/renderBody";
import CreateTransactionModal from "@/components/transactionHistory/transactions/createModal";
import CreateTClientModal from "@/components/transactionHistory/tClients/createModal";
import {
  computeBalance,
  formatNumber,
  setVoucher,
} from "@/components/globals/utils";
import { retry } from "@/components/globals/serverUtils";
import { Tooltip } from "@heroui/react";

const Transactions = async () => {
  const { record: account } = await retry(getAccount);
  const { records } = await getAll();
  const { records: tClients } = await getTClients();

  const model = "Transactions";

  const result = computeBalance([...records].reverse());

  const columns = [
    { key: "id", name: "ID", sortable: false },
    { key: "date", name: "DATE", sortable: true },
    { key: "voucher", name: "VOUCHER", sortable: true },
    { key: "check", name: "CHECK", sortable: true },
    { key: "client", name: "CLIENT", sortable: true },
    { key: "particulars", name: "PARTICULARS", sortable: true },
    { key: "credit", name: "CREDIT", sortable: true },
    { key: "debit", name: "DEBIT", sortable: true },
    { key: "status", name: "STATUS", sortable: true },
    { key: "proof", name: "PROOF", sortable: false },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  const rows = await tableFormat(columns, records);

  const voucher = setVoucher(records[0]);

  const Buttons = (
    <>
      <div className="hidden sm:flex">
        <CreateTClientModal />
      </div>

      <CreateTransactionModal voucher={voucher} tClients={tClients} />
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
              records={records}
              columns={columns}
              rows={rows}
              filterKey="date"
              dependencies={{
                tClients: tClients,
              }}
              RenderBody={RenderBody}
              Buttons={Buttons}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
