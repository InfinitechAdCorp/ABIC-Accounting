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
  FormattedCollectionClient,
} from "@/components/collectionMonitoring/types";

type Row = FormattedCollection;

const RenderCell = (
  row: Row,
  columnKey: string,
  dependencies: {
    locations: {
      key: string;
      name: string;
    }[];
    collectionClients: FormattedCollectionClient[];
  }
) => {
  switch (columnKey) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal
            collection={row}
            locations={dependencies.locations}
            collectionClients={dependencies.collectionClients}
          />
          <DestroyModal title="Collection" action={destroy} id={row.id} />
          <PaymentModal action={markAsPaid} id={row.id} />
        </div>
      );
    case "client":
      return row.collection_client?.name;
    case "start":
    case "end":
    case "due":
      return formatDate(row[columnKey as keyof Row] as Date);
    case "tenant_price":
    case "owner_income":
    case "abic_income":
      return formatNumber(row[columnKey as keyof Row] as number);
    case "status":
      const today = new Date(new Date().setHours(0, 0, 0, 0));
      const difference = differenceInDays(row.due.setHours(0, 0, 0, 0), today);

      type Color = "success" | "danger" | "primary";

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
    case "payments":
      let payments = differenceInMonths(row.due, row.start) - 1;
      if (payments < 0) {
        payments = 0;
      }
      return payments;
    default:
      return row[columnKey as keyof Row];
  }
};

export default RenderCell;
