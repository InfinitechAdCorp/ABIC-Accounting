"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import {
  create as createSchema,
  update as updateSchema,
} from "@/components/transactionHistory/tClients/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import * as Yup from "yup";
import { Column } from "@/components/globals/types";
import {
  TClient,
  TClientDisplayFormat,
  TClientWithTransactions,
  Transaction,
} from "@/components/transactionHistory/types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Destroy } from "@/components/globals/types";
import {
  formatErrors,
  formatNumber,
  computeBalance,
  isPending,
} from "@/components/globals/utils";

const model = "Client";
const url = "/transaction-history/clients";

export const format = async (ufRecords: TClientWithTransactions[]) => {
  const records: TClient[] = [];

  if (ufRecords) {
    ufRecords.forEach((ufRecord) => {
      const transactions: Transaction[] = [];
      ufRecord.transactions.forEach((ufTransaction) => {
        const transaction = {
          ...ufTransaction,
          amount: Number(ufTransaction.amount),
        };
        transactions.push(transaction);
      });

      const record = {
        ...ufRecord,
        transactions: transactions,
      };
      records.push(record);
    });
  }

  return records;
};

export const displayFormat = async (columns: Column[], records: TClient[]) => {
  records.forEach((record) => {
    const display_format = {
      name: "",
      transactions: "",
      starting_fund: "",
      running_balance: "",
    };

    columns.forEach((column) => {
      const key = column.key;
      let value;
      const transactions = record.transactions;

      switch (key) {
        case "transactions":
          value = record.transactions?.length;
          break;
        case "starting_fund":
          value = 0;
          const transaction = transactions?.find((transaction) => {
            if (
              transaction.status != "Cancelled" &&
              !isPending(transaction.date)
            ) {
              return transaction;
            }
          });

          if (transaction) {
            if (transaction.type == "Credit") {
              value += transaction.amount;
            } else {
              value -= transaction.amount;
            }
          }

          value = formatNumber(value);
          break;
        case "running_balance":
          const result = computeBalance(transactions || []);
          value = formatNumber(result.balance);
          break;
        default:
          value = record[key as keyof TClient];
          break;
      }

      if (value || value == 0) {
        display_format[key as keyof TClientDisplayFormat] = `${value}`;
      }
    });

    record.display_format = display_format
  });

  return records;
};

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

  let records;

  try {
    records = await prisma.tClient.findMany({
      where: { account_id: accountID },
      include: {
        transactions: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      records: [],
      accountID: accountID,
    };
    return response;
  }

  records = await format(records || []);
  const response = {
    code: 200,
    message: `Fetched ${model}s`,
    records: records,
    accountID: accountID,
  };
  return response;
};

export const get = async (id: string) => {
  let record;

  try {
    record = await prisma.tClient.findUnique({
      where: { id: id },
      include: {
        transactions: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      record: null,
    };
    return response;
  }

  if (record) {
    record = (await format([record]))[0];
    const response = {
      code: 200,
      message: `Fetched ${model}`,
      record: record,
    };
    return response;
  } else {
    const response = {
      code: 404,
      message: `${model} Not Found`,
      record: null,
    };
    return response;
  }
};

export const create = async (values: Prisma.TClientCreateInput) => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

  const schema = createSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response = {
      code: 429,
      message: "Validation Error",
      errors: errors,
    };
    return response;
  }

  try {
    await prisma.tClient.create({
      data: {
        account: { connect: { id: accountID } },
        name: values.name,
      },
    });
  } catch (error) {
    const response = { code: 500, message: "Server Error", error: error };
    return response;
  }

  revalidatePath(url);
  const response = { code: 200, message: `Added ${model}` };
  return response;
};

export const update = async (values: Prisma.TClientCreateInput) => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

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
    await prisma.tClient.update({
      where: {
        id: values.id,
      },
      data: {
        account: { connect: { id: accountID } },
        name: values.name,
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
      await prisma.tClient.delete({
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
  const response: ActionResponse = {
    code: 200,
    message: `Deleted ${model}`,
  };
  return response;
};
