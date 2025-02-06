"use client";

// import React from "react";
// import UpdateModal from "@/components/transactionHistory/transactionClients/updateModal";
// import DestroyModal from "@/components/globals/destroyModal";
// import ViewBtn from "@/components/globals/viewBtn";
// import { destroy } from "@/components/transactionHistory/transactionClients/actions";
import { FormattedTransactionClient } from "@/components/transactionHistory/types";

type Item = FormattedTransactionClient;

const RenderCell = (item: Item, columnKey: string) => {
  console.log(item)
  console.log(columnKey)
  switch (columnKey) {
    case "actions":
      return "";
      // <div className="relative flex justify-end items-center gap-2">
      //   <UpdateModal transactionClient={record} />
      //   <DestroyModal title="Client" action={destroy} id={record.id} />
      //   <ViewBtn
      //     title="View Transactions"
      //     link={`/transaction-history/clients/${record.id}`}
      //   />
      // </div>
    default:
      return item[columnKey as keyof Item];
  }
};

export default RenderCell;
