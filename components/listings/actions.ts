"use server";

import prisma from "@/lib/db";
import { Listing as PrismaListing, Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import {
  create as createSchema,
  update as updateSchema,
} from "@/components/listings/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { Column } from "@/components/globals/types";
import { Listing, ListingDisplayFormat } from "@/components/listings/types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Destroy } from "@/components/globals/types";
import { formatDate, formatNumber } from "@/components/globals/utils";
import { differenceInDays } from "date-fns";

const model = "Listing";
const url = "/listings";

export const format = async (ufRecords: PrismaListing[]) => {
  const records: Listing[] = [];

  if (ufRecords) {
    ufRecords.forEach((ufRecord) => {
      const record = {
        ...ufRecord,
        list_price: Number(ufRecord.list_price),
        total_price: Number(ufRecord.total_price),
      };
      records.push(record);
    });
  }

  return records;
};

export const displayFormat = async (columns: Column[], records: Listing[]) => {
  records.forEach((record) => {
    const display_format = {
      client: "",
      type: "",
      project: "",
      unit: "",
      res: "",
      terms: "",
      specialist: "",
      manager: "",
      list_price: "",
      total_price: "",
      status: "",
      source: "",
      extension: "",
      aging: "",
      closed: "",
    };

    columns.forEach((column) => {
      const key = column.key;
      let value;

      switch (key) {
        case "res":
        case "extension":
        case "closed":
          value = formatDate(record[key as keyof Listing] as Date);
          break;
        case "aging":
          const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
          value = differenceInDays(today, record.res.setUTCHours(0, 0, 0, 0));
          break;
        case "list_price":
        case "total_price":
          value = formatNumber(record[key as keyof Listing] as number);
          break;
        default:
          value = record[key as keyof Listing];
          break;
      }

      if (value || value == 0) {
        display_format[key as keyof ListingDisplayFormat] = `${value}`;
      }
    });

    record.display_format = display_format;
  });

  return records;
};

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("id")?.value;

  let records;

  try {
    records = await prisma.listing.findMany({
      where: { account_id: accountID },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      records: [],
    };
    return response;
  }

  records = await format(records);
  const response = {
    code: 200,
    message: `Fetched ${model}s`,
    records: records,
  };
  return response;
};

export const create = async (values: Prisma.ListingCreateInput) => {
  const session = await cookies();
  const accountID = session.get("id")?.value;

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

  let extension;
  if (values.extension) {
    extension = new Date(new Date(values.extension).setUTCHours(0, 0, 0, 0));
  }

  let closed;
  if (values.closed) {
    closed = new Date(new Date(values.closed).setUTCHours(0, 0, 0, 0));
  }

  try {
    await prisma.listing.create({
      data: {
        account: { connect: { id: accountID } },
        client: values.client,
        type: values.type,
        project: values.project,
        unit: values.unit,
        res: new Date(new Date(values.res).setUTCHours(0, 0, 0, 0)),
        terms: values.terms,
        specialist: values.specialist,
        manager: values.manager,
        list_price: Number(values.list_price),
        total_price: Number(values.total_price),
        status: values.status,
        source: values.source,
        extension: extension,
        closed: closed,
      },
    });
  } catch (error) {
    const response: ActionResponse = {
      code: 500,
      message: "Server Error",
      error: error,
    };
    return response;
  }

  revalidatePath(url);
  const response: ActionResponse = { code: 200, message: `Added ${model}` };
  return response;
};

export const update = async (values: Prisma.ListingCreateInput) => {
  const session = await cookies();
  const accountID = session.get("id")?.value;

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

  let extension;
  if (values.extension) {
    extension = new Date(new Date(values.extension).setUTCHours(0, 0, 0, 0));
  }

  let closed;
  if (values.closed) {
    closed = new Date(new Date(values.closed).setUTCHours(0, 0, 0, 0));
  }

  try {
    await prisma.listing.update({
      where: {
        id: values.id,
      },
      data: {
        account: { connect: { id: accountID } },
        client: values.client,
        type: values.type,
        project: values.project,
        unit: values.unit,
        res: new Date(new Date(values.res).setUTCHours(0, 0, 0, 0)),
        terms: values.terms,
        specialist: values.specialist,
        manager: values.manager,
        list_price: Number(values.list_price),
        total_price: Number(values.total_price),
        status: values.status,
        source: values.source,
        extension: extension,
        closed: closed,
      },
    });
  } catch (error) {
    const response: ActionResponse = {
      code: 500,
      message: "Server Error",
      error: error,
    };
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
      await prisma.listing.delete({
        where: { id: values.id },
      });
    } catch (error) {
      const response: ActionResponse = {
        code: 500,
        message: "Server Error",
        error: error,
      };
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
