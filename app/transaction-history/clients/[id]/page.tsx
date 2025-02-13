import React from "react";
import {
  get,
  getAll as getTClients,
} from "@/components/transactionHistory/tClients/actions";
import {
  getAll as getTransactions,
  tableFormat,
} from "@/components/transactionHistory/transactions/actions";
import { get as getAccount } from "@/components/accounts/actions";
import { Card, CardBody } from "@heroui/react";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import RenderBody from "@/components/transactionHistory/transactions/renderBody";
import CreateModal from "@/components/transactionHistory/transactions/createModal";
import {
  computeBalance,
  formatNumber,
  setVoucher,
} from "@/components/globals/utils";
import ExportRangeModal from "@/components/globals/exportRangeModal";
import { retry } from "@/components/globals/serverUtils";

const TClient = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { record: account } = await retry(getAccount);
  const { record } = await get((await params).id);
  const { records: tClients } = await getTClients();
  const { records: transactions } = await getTransactions();

  const model = `Transactions`;
  const runningBalance = formatNumber(
    computeBalance([...(record?.transactions || [])].reverse())
  );

  const columns = [
    { key: "id", name: "ID" },
    { key: "date", name: "DATE" },
    { key: "voucher", name: "VOUCHER" },
    { key: "check", name: "CHECK" },
    { key: "particulars", name: "PARTICULARS" },
    { key: "credit", name: "CREDIT" },
    { key: "debit", name: "DEBIT" },
    { key: "status", name: "STATUS" },
    { key: "proof", name: "PROOF" },
    { key: "actions", name: "ACTIONS" },
  ];

  const rows = await tableFormat(columns, record?.transactions || []);

  const voucher = setVoucher(transactions[0]);

  const Buttons = (
    <>
      <CreateModal voucher={voucher} tClients={tClients} />
      <ExportRangeModal
        model={model}
        columns={columns}
        rows={rows}
        filterKey="date"
      />
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
                {`${record?.name}'s ${model}`.toUpperCase()}
              </h1>
              <h1 className="text-md font-semibold mb-3">
                RUNNING BALANCE: {runningBalance}
              </h1>
            </div>

            <DataTable
              model={model}
              records={record?.transactions || []}
              columns={columns}
              rows={rows}
              searchKey="name"
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

export default TClient;
