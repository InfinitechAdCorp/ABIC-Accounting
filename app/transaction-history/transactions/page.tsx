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
import { Account } from "@prisma/client";
import ExportBtn from "@/components/globals/exportModal";

const Transactions = async () => {
  const { record: account } = await getAccount();
  const { records } = await getAll();
  const { records: tClients } = await getTClients();

  const model = "Transactions";
  const runningBalance = formatNumber(computeBalance([...records].reverse()));

  const columns = [
    { key: "date", name: "DATE" },
    { key: "voucher", name: "VOUCHER" },
    { key: "check", name: "CHECK" },
    { key: "client", name: "CLIENT" },
    { key: "particulars", name: "PARTICULARS" },
    { key: "credit", name: "CREDIT" },
    { key: "debit", name: "DEBIT" },
    { key: "proof", name: "PROOF" },
    { key: "actions", name: "ACTIONS" },
  ];

  const rows = await tableFormat(columns.slice(0, -1), records);

  const voucher = setVoucher(records[0]);

  return (
    <>
      <Navbar record={account as Account} />

      <div className="flex justify-center max-h-[93vh]">
        <Card className="m-5 md:m-7 p-3">
          <CardBody>
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold mb-3">
                {model.toUpperCase()}
              </h1>
              <h1 className="text-md font-semibold mb-3">
                RUNNING BALANCE: {runningBalance}
              </h1>
            </div>

            <DataTable
              model={model}
              records={records}
              columns={columns}
              rows={rows}
              searchKey="particulars"
              RenderBody={RenderBody}
              dependencies={{
                tClients: tClients,
              }}
            >
              <>
                <div className="hidden sm:flex">
                  <CreateTClientModal />
                </div>

                <CreateTransactionModal voucher={voucher} tClients={tClients} />

                <ExportBtn model={model} columns={columns.slice(0, -1)} rows={rows} />
              </>
            </DataTable>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Transactions;
