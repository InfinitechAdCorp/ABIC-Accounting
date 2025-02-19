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

const Transactions = async () => {
  const { record: account } = await retry(getAccount);
  const { records } = await getAll();
  const { records: tClients } = await getTClients();

  const model = "Transactions";
  const runningBalance = formatNumber(computeBalance([...records].reverse()));

  const columns = [
    { key: "id", name: "ID", searchable: false, },
    { key: "date", name: "DATE", searchable: true, },
    { key: "voucher", name: "VOUCHER", searchable: true, },
    { key: "check", name: "CHECK", searchable: true, },
    { key: "client", name: "CLIENT", searchable: true, },
    { key: "particulars", name: "PARTICULARS", searchable: true, },
    { key: "credit", name: "CREDIT", searchable: true, },
    { key: "debit", name: "DEBIT", searchable: true, },
    { key: "status", name: "STATUS", searchable: true, },
    { key: "proof", name: "PROOF", searchable: false, },
    { key: "actions", name: "ACTIONS", searchable: false, },
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
