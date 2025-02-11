"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import { addMonths, getDate, setDate } from "date-fns";
import {
  create as createSchema,
  update as updateSchema,
  markAsPaid as markAsPaidSchema,
} from "@/components/collectionMonitoring/collections/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { Column } from "@/components/globals/types";
import {
  Collection,
  CollectionRow,
  CollectionWithCClient,
} from "@/components/collectionMonitoring/types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Destroy } from "@/components/globals/types";
import { formatDate, formatNumber } from "@/components/globals/utils";
import { differenceInDays, differenceInMonths } from "date-fns";

type CollectionCreateInput = Prisma.CollectionCreateInput & {
  c_client_id?: string;
};

const model = "Collection";
const url = "/collection-monitoring/collections";

export const format = async (ufRecords: CollectionWithCClient[]) => {
  const records: Collection[] = [];

  ufRecords.forEach((ufRecord) => {
    const cClient = ufRecord.c_client;

    const record = {
      ...ufRecord,
      c_client: {
        ...cClient,
        id: cClient?.id as string,
        account_id: cClient?.account_id as string,
        name: cClient?.name as string,
      },
      c_client_id: ufRecord.c_client_id as string,
      tenant_price: ufRecord.tenant_price?.toNumber() as number,
      owner_income: ufRecord.owner_income?.toNumber() as number,
      abic_income: ufRecord.abic_income?.toNumber() as number,
    };

    records.push(record);
  });

  return records;
};

export const tableFormat = async (columns: Column[], records: Collection[]) => {
  const rows: CollectionRow[] = [];

  records.forEach((record) => {
    const row = {
      client: "",
      property: "",
      location: "",
      start: "",
      end: "",
      advance: "",
      deposit: "",
      tenant_price: "",
      owner_income: "",
      abic_income: "",
      due: "",
      status: "",
      payments: "",
    };

    columns.forEach((column) => {
      const key = column.key;
      let value;

      switch (key) {
        case "client":
          value = record.c_client?.name;
          break;
        case "start":
        case "end":
        case "due":
          value = formatDate(record[key as keyof Collection] as Date);
          break;
        case "tenant_price":
        case "owner_income":
        case "abic_income":
          value = formatNumber(record[key as keyof Collection] as number);
          break;
        case "status":
          const today = new Date(new Date().setHours(0, 0, 0, 0));
          const diff = differenceInDays(record.due.setHours(0, 0, 0, 0), today);

          if (diff > 0) {
            value = `${diff} Days Remaining`;
          } else if (diff < 0) {
            value = `${diff} Days Past Due`.replace("-", "");
          } else if (diff == 0) {
            value = "Today";
          }
          break;
        case "payments":
          value = differenceInMonths(record.due, record.start) - 1;
          if (value < 0) {
            value = 0;
          }
          break;
        default:
          value = record[key as keyof Collection];
          break;
      }

      if (value || value == 0) {
        row[key as keyof CollectionRow] = `${value}`;
      }
    });

    rows.push(row);
  });

  return rows;
};

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

  let records;

  try {
    records = await prisma.collection.findMany({
      where: {
        c_client: {
          account_id: accountID,
        },
      },
      include: {
        c_client: true,
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      records: [],
    };
    return response;
  }

  records = await format(records || []);
  const response = {
    code: 200,
    message: `Fetched ${model}`,
    records: records,
  };
  return response;
};

export const create = async (values: CollectionCreateInput) => {
  const schema = createSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: errors,
    };
    return response;
  }

  try {
    await prisma.collection.create({
      data: {
        c_client: { connect: { id: values.c_client_id } },
        property: values.property,
        location: values.location,
        start: new Date(new Date(values.start).setUTCHours(0, 0, 0, 0)),
        end: new Date(new Date(values.end).setUTCHours(0, 0, 0, 0)),
        advance: Number(values.advance),
        deposit: Number(values.deposit),
        tenant_price: values.tenant_price,
        owner_income: values.owner_income,
        abic_income: values.abic_income,
        due: new Date(new Date(values.due).setUTCHours(0, 0, 0, 0)),
      },
    });
  } catch {
    const response: ActionResponse = {
      code: 500,
      message: "Server Error",
    };
    return response;
  }

  revalidatePath(url);
  const response: ActionResponse = { code: 200, message: `Added ${model}` };
  return response;
};

export const update = async (values: CollectionCreateInput) => {
  const schema = updateSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: errors,
    };
    return response;
  }

  try {
    await prisma.collection.update({
      where: { id: values.id },
      data: {
        c_client: { connect: { id: values.c_client_id } },
        property: values.property,
        location: values.location,
        start: new Date(new Date(values.start).setUTCHours(0, 0, 0, 0)),
        end: new Date(new Date(values.end).setUTCHours(0, 0, 0, 0)),
        advance: Number(values.advance),
        deposit: Number(values.deposit),
        tenant_price: values.tenant_price,
        owner_income: values.owner_income,
        abic_income: values.abic_income,
        due: new Date(new Date(values.due).setUTCHours(0, 0, 0, 0)),
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath(url);
  const response: ActionResponse = { code: 200, message: `Updated ${model}` };
  return response;
};

export const destroy = async (values: Destroy) => {
  const session = await cookies();
  const otp = session.get("otp")?.value;

  const schema = destroySchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: errors,
    };
    return response;
  }

  if (otp == values.otp) {
    try {
      await prisma.collection.delete({
        where: { id: values.id },
      });
    } catch {
      const response: ActionResponse = { code: 500, message: "Server Error" };
      return response;
    }

    session.delete("otp");
  } else {
    const response: ActionResponse = {
      code: 401,
      message: "Invalid Token",
    };
    return response;
  }

  revalidatePath(url);
  const response: ActionResponse = { code: 200, message: `Deleted ${model}` };
  return response;
};

export const markAsPaid = async (values: { id: string }) => {
  const schema = markAsPaidSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: errors,
    };
    return response;
  }

  const id = values.id;
  const record = await prisma.collection.findUnique({ where: { id: id } });

  const day = getDate(record?.start as Date);
  let due = addMonths(record?.due as Date, 1);
  due = setDate(due, day);

  try {
    await prisma.collection.update({
      where: { id: id },
      data: { due: due },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath(url);
  const response: ActionResponse = {
    code: 200,
    message: "Successfully Made Payment",
  };
  return response;
};
