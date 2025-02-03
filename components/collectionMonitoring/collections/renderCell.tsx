"use client";

import React from "react";
import { Chip } from "@nextui-org/react";
import { formatDate, formatNumber } from "@/components/globals/utils";
import { differenceInDays, differenceInMonths } from "date-fns";
import UpdateModal from "@/components/collectionMonitoring/collections/updateModal";
import DestroyModal from "@/components/globals/destroyModal";
import PaymentModal from "@/components/collectionMonitoring/collections/paymentModal";
import {
  destroy,
  markAsPaid,
} from "@/components/collectionMonitoring/collections/actions";
import {
    FormattedCollection,
    FormattedTransactionClient,
  } from "@/components/transactionHistory/types";

const renderCell = (row: Row, columnKey: string) => {
  const dateColumns = ["start", "end", "due"];
  const moneyColumns = ["tenant_price", "owner_income", "abic_income"];

  if (columnKey == "actions") {
    return (
      <div className="relative flex justify-end items-center gap-2">
        <UpdateModal
          collection={row}
          locations={locations}
          collectionClients={collectionClients}
        />
        <DestroyModal title="Collection" action={destroy} id={row.id} />
        <PaymentModal action={markAsPaid} id={row.id} />
      </div>
    );
  } else if (columnKey == "client") {
    return row.collection_client?.name;
  } else if (dateColumns.includes(columnKey)) {
    return formatDate(row[columnKey as keyof Row] as Date);
  } else if (moneyColumns.includes(columnKey)) {
    return formatNumber(row[columnKey as keyof Row] as number);
  } else if (columnKey == "status") {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const difference = differenceInDays(row.due.setHours(0, 0, 0, 0), today);

    type Color =
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger";

    let color;
    let status;
    if (difference > 0) {
      color = "success";
      status = `${difference} Days Remaining`;
    } else if (difference < 0) {
      color = "danger";
      status = `${difference} Days Past Due`.replace("-", "");
    } else if (difference == 0) {
      color = "primary";
      status = "Today";
    }

    return (
      <Chip color={color as Color} size="sm" variant="flat">
        {status}
      </Chip>
    );
  } else if (columnKey == "payments") {
    let payments = differenceInMonths(row.due, row.start) - 1;
    if (payments < 0) {
      payments = 0;
    }
    return payments;
  } else {
    return row[columnKey as keyof Row];
  }
};

export default renderCell;
