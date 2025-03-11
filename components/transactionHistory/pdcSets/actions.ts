"use server";

import prisma from "@/lib/db";
import { ActionResponse } from "@/components/globals/types";
import { cookies } from "next/headers";
import {
  PDCSet,
  PDCSetDisplayFormat,
  PDCSetWithPDCs,
} from "@/components/transactionHistory/pdcSets/types";
import { eachMonthOfInterval, setDate } from "date-fns";
import { formatDate, formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { create as createSchema } from "@/components/transactionHistory/pdcSets/schemas";
import { revalidatePath } from "next/cache";
import { Column, Destroy } from "@/components/globals/types";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { Prisma } from "@prisma/client";
import { Transaction } from "@prisma/client";

const model = "PDC Set";
const url = "/transaction-history/pdc-sets";

export const format = async (ufRecords: PDCSetWithPDCs[]) => {
  const records: PDCSet[] = [];

  ufRecords.forEach((ufRecord) => {
    const record = {
      ...ufRecord,
      amount: Number(ufRecord.amount),
    };

    records.push(record);
  });

  return records;
};

export const displayFormat = async (columns: Column[], records: PDCSet[]) => {
  records.forEach((record) => {
    const display_format = {
      name: "",
      pay_to: "",
      start: "",
      end: "",
      pdcs: "",
      type: "",
      total: "",
    };

    columns.forEach((column) => {
      const key = column.key;
      let value;
      const pdcs = record.pdcs?.length;

      switch (key) {
        case "start":
          value = formatDate(record[key as keyof PDCSet] as Date);
          break;
        case "end":
          value = formatDate(record[key as keyof PDCSet] as Date);
          break;
        case "pdcs":
          value = pdcs;
          break;
        case "total":
          value = record.amount * (pdcs || 0);
          break;
        default:
          value = record[key as keyof PDCSet];
          break;
      }

      if (value || value == 0) {
        display_format[key as keyof PDCSetDisplayFormat] = `${value}`;
      }
    });

    record.display_format = display_format;
  });

  return records;
};

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value || "";

  let records;

  try {
    records = await prisma.pDCSet.findMany({
      include: {
        pdcs: true,
      },
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

  records = await format(records || []);

  const response = {
    code: 200,
    message: `Fetched ${model}s`,
    records: records,
  };
  return response;
};

export const create = async (values: Prisma.PDCSetCreateInput) => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value || "";

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

  const dueDay = new Date(values.start).getDate() + 1;
  let start = new Date(new Date(values.start).setUTCHours(0, 0, 0, 0));
  let end = new Date(new Date(values.end).setUTCHours(0, 0, 0, 0));

  const dates = eachMonthOfInterval({
    start: start,
    end: end,
  });

  let checkNumber = Number(values.check_number);
  const lastCheckNumber = checkNumber + dates.length - 1;

  const checkNumbers: number[] = [];
  const records: Transaction[] = await prisma.transaction.findMany();
  records.forEach((record) => {
    if (record.check_number) {
      checkNumbers.push(record.check_number);
    }
  });

  const isTaken = checkNumbers.some((item) => {
    return item >= checkNumber && item <= lastCheckNumber;
  });

  if (isTaken) {
    const response: ActionResponse = {
      code: 429,
      message: "Check Numbers are Already Taken",
      errors: {
        check_number: "Check Numbers are Already Taken",
      },
    };
    return response;
  }

  try {
    const record = await prisma.pDCSet.create({
      data: {
        account: { connect: { id: accountID } },
        name: values.name,
        pay_to: values.pay_to,
        start: start,
        end: end,
        check_number: checkNumber,
        type: values.type,
        amount: values.amount,
      },
    });

    for (const date of dates) {
      await prisma.pDC.create({
        data: {
          pdc_set: { connect: { id: record.id } },
          check_number: checkNumber,
          date: setDate(date, dueDay),
        },
      });

      ++checkNumber;
    }
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
      await prisma.pDCSet.delete({
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
