"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import {
  create as createSchema,
  update as updateSchema,
  cancel as cancelSchema,
} from "@/components/transactionHistory/transactions/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { formatTransactions } from "@/components/globals/utils";

type TransactionCreateInput = Prisma.TransactionCreateInput & {
  transaction_client_id?: string;
};

export const getAll = async (accountID: string) => {
  let transactions;

  try {
    transactions = await prisma.transaction.findMany({
      where: {
        transaction_client: {
          account_id: accountID,
        },
      },
      include: {
        transaction_client: true,
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      transactions: [],
    };
    return response;
  }

  transactions = formatTransactions(transactions || []);
  const response = {
    code: 200,
    message: "Fetched Transactions",
    transactions: transactions,
  };
  return response;
};

export const create = async (values: TransactionCreateInput) => {
  const schema = createSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (errors) {
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  try {
    await prisma.transaction.create({
      data: {
        transaction_client: { connect: { id: values.transaction_client_id } },
        date: new Date(new Date(values.date).setUTCHours(0, 0, 0, 0)),
        voucher: values.voucher,
        check: values.check,
        particulars: values.particulars,
        type: values.type,
        amount: values.amount,
        status: values.status,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  const response: ActionResponse = { code: 200, message: "Added Transaction" };
  return response;
};

export const update = async (values: TransactionCreateInput) => {
  const schema = updateSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (errors) {
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  try {
    await prisma.transaction.update({
      where: { id: values.id },
      data: {
        transaction_client: { connect: { id: values.transaction_client_id } },
        date: new Date(new Date(values.date).setUTCHours(0, 0, 0, 0)),
        voucher: values.voucher,
        check: values.check,
        particulars: values.particulars,
        type: values.type,
        amount: values.amount,
        status: values.status,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  const response: ActionResponse = {
    code: 200,
    message: "Updated Transaction",
  };
  return response;
};

export const destroy = async (values: { id: string }) => {
  const schema = destroySchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (errors) {
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  try {
    await prisma.transaction.delete({
      where: { id: values.id },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  const response: ActionResponse = {
    code: 200,
    message: "Deleted Transaction",
  };
  return response;
};

export const cancel = async (values: TransactionCreateInput) => {
  const schema = cancelSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (errors) {
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  try {
    await prisma.transaction.update({
      where: { id: values.id },
      data: {
        status: "Cancelled",
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  const response: ActionResponse = {
    code: 200,
    message: "Cancelled Transaction",
  };
  return response;
};
