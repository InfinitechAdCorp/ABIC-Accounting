import React from "react";
import { get as getAccount } from "@/components/accounts/actions";
import {
  getAll,
  displayFormat,
} from "@/components/transactionHistory/transactions/actions";
import { getAll as getTClients } from "@/components/transactionHistory/tClients/actions";
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
  const { records: ufRecords } = await getAll();
  const { records: tClients } = await getTClients();

  const model = "Transactions";

  const result = computeBalance([...ufRecords].reverse());

  const columns = [
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

  const voucher = setVoucher(ufRecords[0]);

  const records = await displayFormat(columns, ufRecords);

  const Buttons = (
    <>
      <div className="hidden sm:flex">
        <CreateTClientModal />
      </div>

      <CreateTransactionModal voucher={voucher} tClients={tClients} />
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
        <h3 className="inline text-md font-semibold" role="button">
          RUNNING BALANCE: {formatNumber(result.balance)}
        </h3>
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

export default Transactions;
