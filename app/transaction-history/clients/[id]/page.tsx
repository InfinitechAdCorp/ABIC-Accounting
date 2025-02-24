import React from "react";
import {
  get,
  getAll as getTClients,
} from "@/components/transactionHistory/tClients/actions";
import {
  getAll as getTransactions,
  displayFormat,
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
import { retry } from "@/components/globals/serverUtils";
import { Tooltip } from "@heroui/react";

const TClient = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { record: account } = await retry(getAccount);
  const { record } = await get((await params).id);
  const { records: tClients } = await getTClients();
  const { records: transactions } = await getTransactions();

  const model = `Transactions`;

  const result = computeBalance([...(record?.transactions || [])].reverse());

  const columns = [
    { key: "date", name: "DATE", sortable: true },
    { key: "voucher", name: "VOUCHER", sortable: true },
    { key: "check", name: "CHECK", sortable: true },
    { key: "particulars", name: "PARTICULARS", sortable: true },
    { key: "credit", name: "CREDIT", sortable: true },
    { key: "debit", name: "DEBIT", sortable: true },
    { key: "status", name: "STATUS", sortable: true },
    { key: "proof", name: "PROOF", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  const voucher = setVoucher(transactions[0]);

  const records = await displayFormat(columns, record?.transactions || []);

  const Buttons = (
    <>
      <CreateModal voucher={voucher} tClients={tClients} />
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
          model={`${record?.name}'s ${model}`}
          columns={columns}
          records={records}
          filterKey="date"
          dependencies={{
            tClients: tClients,
          }}
          RenderBody={RenderBody}
          Buttons={Buttons}
          SideContent={SideContent}
        />
      </div>
    </>
  );
};

export default TClient;
