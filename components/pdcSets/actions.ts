"use server";

import prisma from "@/lib/db";
import { PDCSet as PrismaPDCSet } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import { cookies } from "next/headers";
import { PDCSet, CreatePDCSet } from "@/components/pdcSets/types";
import { eachMonthOfInterval, setDate } from "date-fns";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { create as createSchema } from "@/components/pdcSets/schemas";
import { revalidatePath } from "next/cache";

const model = "PDC Set";
const url = "/transaction-history/pdc-sets";

export const format = async (ufRecords: PrismaPDCSet[]) => {
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

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value || "";

  let records;

  try {
    records = await prisma.pDCSet.findMany({
      where: { account_id: accountID },
      include: {
        pdcs: true,
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
    message: `Fetched ${model}s`,
    records: records,
  };
  return response;
};

export const create = async (values: CreatePDCSet) => {
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

  const months = eachMonthOfInterval({
    start: start,
    end: end,
  });

  try {
    let check = Number(values.check);
    const record = await prisma.pDCSet.create({
      data: {
        account: { connect: { id: accountID } },
        name: values.name,
        pay_to: values.pay_to,
        start: start,
        end: end,
        type: values.type,
        amount: values.amount,
      },
    });

    for (const month of months) {
      await prisma.pDC.create({
        data: {
          pdc_set: { connect: { id: record.id } },
          check: `${check}`,
          date: setDate(month, dueDay),
        },
      });
      ++check;
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
