import React from "react";
import {
  getAll,
  displayFormat,
} from "@/components/transactionHistory/transactions/actions";
import { getAll as getTClients } from "@/components/transactionHistory/tClients/actions";
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
import { checkPDCs } from "@/components/transactionHistory/transactions/actions";

const Transactions = async () => {
  await checkPDCs();
  const { records: ufRecords } = await getAll();
  const { records: tClients } = await getTClients();

  const model = "Transactions";

  const result = computeBalance(ufRecords);

  const columns = [
    { key: "date", name: "DATE", sortable: true },
    { key: "voucher_number", name: "VOUCHER", sortable: true },
    { key: "check_number", name: "CHECK", sortable: true },
    { key: "client", name: "CLIENT", sortable: true },
    { key: "particulars", name: "PARTICULARS", sortable: true },
    { key: "credit", name: "CREDIT", sortable: true },
    { key: "debit", name: "DEBIT", sortable: true },
    { key: "status", name: "STATUS", sortable: true },
    { key: "proof", name: "PROOF", sortable: false },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  const last = ufRecords.findLast((ufRecord) => {
    return ufRecord.voucher_number;
  });

  const voucherNumber = setVoucherNumber(last);

  const records = await displayFormat(columns, ufRecords);

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
        <h3 className="inline text-md font-semibold" role="button">
          RUNNING BALANCE: {formatNumber(result.balance)}
        </h3>
      </Tooltip>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="max-h-[93vh]">
        <DataTable
          baseModel={model}
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

export default Transactions;
