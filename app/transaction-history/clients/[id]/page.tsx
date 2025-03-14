import React from "react";
import {
  get,
  getAll as getTClients,
} from "@/components/transactionHistory/tClients/actions";
import {
  getAll as getTransactions,
  displayFormat,
} from "@/components/transactionHistory/transactions/actions";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/transactionHistory/transactions/renderBody";
import CreateModal from "@/components/transactionHistory/transactions/createModal";
import {
  computeBalance,
  formatNumber,
  setVoucherNumber,
} from "@/components/globals/utils";
import { Tooltip } from "@heroui/react";
import { get as getCookies } from "@/components/globals/auth";

const TClient = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { record: cookies } = await getCookies();
  const { record } = await get((await params).id);
  const { records: tClients } = await getTClients();
  const { records: transactions } = await getTransactions();

  const model = `Transactions`;

  const result = computeBalance(record?.transactions || []);

  const columns = [
    { key: "date", name: "DATE", sortable: true },
    { key: "voucher_number", name: "VOUCHER", sortable: true },
    { key: "check_number", name: "CHECK", sortable: true },
    { key: "particulars", name: "PARTICULARS", sortable: true },
    { key: "credit", name: "CREDIT", sortable: true },
    { key: "debit", name: "DEBIT", sortable: true },
    { key: "status", name: "STATUS", sortable: true },
    { key: "proof", name: "PROOF", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  const last = transactions.findLast((transaction) => {
    return transaction.voucher_number;
  });

  const voucherNumber = setVoucherNumber(last?.voucher_number || null);

  const records = await displayFormat(columns, record?.transactions || []);

  const Buttons = (
    <>
      <CreateModal voucherNumber={voucherNumber} tClients={tClients} />
    </>
  );

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

      <div className="max-h-[93vh]">
        <DataTable
          baseModel={model}
          model={`${record?.name}'s ${model}`}
          columns={columns}
          records={records}
          filterKey="date"
          RenderBody={RenderBody}
          Buttons={Buttons}
          SideContent={SideContent}
          dependencies={{
            tClients: tClients,
          }}
        />
      </div>
    </>
  );
};

export default TClient;
