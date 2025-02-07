"use client";

import React from "react";
import { Chip } from "@heroui/react";
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
  Collection as Record,
  CClient,
} from "@/components/collectionMonitoring/types";


const RenderCell = (
  columnKey: string,
  record: Record,
  dependencies: {
    locations: {
      key: string;
      name: string;
    }[];
    cClients: CClient[];
  }
) => {
  switch (columnKey) {
    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <UpdateModal
            record={record}
            locations={dependencies.locations}
            cClients={dependencies.cClients}
          />
          <DestroyModal title="Collection" action={destroy} id={record.id} />
          <PaymentModal action={markAsPaid} id={record.id} />
        </div>
      );
    case "client":
      return record.c_client?.name;
    case "start":
    case "end":
    case "due":
      return formatDate(record[columnKey as keyof Record] as Date);
    case "tenant_price":
    case "owner_income":
    case "abic_income":
      return formatNumber(record[columnKey as keyof Record] as number);
    case "status":
      const today = new Date(new Date().setHours(0, 0, 0, 0));
      const diff = differenceInDays(record.due.setHours(0, 0, 0, 0), today);

      type Color = "success" | "danger" | "primary";

      let color;
      let status;

      if (diff > 0) {
        color = "success";
        status = `${diff} Days Remaining`;
      } else if (diff < 0) {
        color = "danger";
        status = `${diff} Days Past Due`.replace("-", "");
      } else if (diff == 0) {
        color = "primary";
        status = "Today";
      }

      return (
        <Chip color={color as Color} size="sm" variant="flat">
          {status}
        </Chip>
      );
    case "payments":
      let payments = differenceInMonths(record.due, record.start) - 1;
      if (payments < 0) {
        payments = 0;
      }
      return payments;
    default:
      return record[columnKey as keyof Record];
  }
};

export default RenderCell;
