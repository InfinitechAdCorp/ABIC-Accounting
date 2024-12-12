"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import { revalidatePath } from "next/cache";
import {
  create as createSchema,
  update as updateSchema,
} from "@/components/transactionMonitoring/transactions/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";

type TransactionCreateInput = Prisma.TransactionCreateInput & { account_id?: string };

export const getAll = async () => {
  let transactions = [];

  try {
    transactions = await prisma.transaction.findMany({
      include: {
        account: true,
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

  const response = {
    code: 200,
    message: "Fetched Transactions",
    transactions: transactions,
  };
  return response;
}

export const create = async (values: TransactionCreateInput) => {
  const schema = createSchema

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
        date: new Date(new Date(values.date).setUTCHours(0)),
        voucher: values.voucher,
        check: values.check,
        particulars: values.particulars,
        type: values.type,
        amount: values.amount,
        account: { connect: { id: values.account_id } },
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/transactions");
  const response: ActionResponse = { code: 200, message: "Added Transaction" };
  return response;
}

export const update = async (values: TransactionCreateInput) => {
  const schema = updateSchema

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
        date: new Date(new Date(values.date).setUTCHours(0)),
        voucher: values.voucher,
        check: values.check,
        particulars: values.particulars,
        type: values.type,
        amount: values.amount,
        account: { connect: { id: values.account_id } },
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/transactions");
  const response: ActionResponse = {
    code: 200,
    message: "Updated Transaction",
  };
  return response;
}

export const destroy = async (values: { id: string }) => {
  const schema = destroySchema

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

  revalidatePath("/transactions");
  const response: ActionResponse = {
    code: 200,
    message: "Deleted Transaction",
  };
  return response;
}