"use server";

import prisma from "@/lib/db";
import { Prisma, PDC as PrismaPDC } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import { cookies } from "next/headers";
import { PDC, PDCSet } from "@/components/pdcs/types";
import { eachMonthOfInterval } from "date-fns";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { create as createSchema } from "@/components/pdcs/schemas";
import { revalidatePath } from "next/cache";

const model = "PDC";
const url = "/transaction-history/pdcs";

export const format = async (ufRecords: PrismaPDC[]) => {
  const records: PDC[] = [];

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
    records = await prisma.pDC.findMany({
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

export const create = async (values: PDCSet) => {
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

  const dueDay = new Date(values.start).getDate();
  console.log(dueDay)
  const months = eachMonthOfInterval({
    start: new Date(new Date(values.start).setUTCHours(0, 0, 0, 0)),
    end: new Date(new Date(values.end).setUTCHours(0, 0, 0, 0)),
  });

  try {
    let check = Number(values.check);
    for (const month of months) {
      await prisma.pDC.create({
        data: {
          account: { connect: { id: accountID } },
          name: values.name,
          pay_to: values.pay_to,
          date: month,
          check: `${check}`,
          type: values.type,
          amount: values.amount,
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
