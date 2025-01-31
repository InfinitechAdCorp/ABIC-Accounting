"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import {
  create as createSchema,
  update as updateSchema,
} from "@/components/transactionHistory/transactionClients/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { formatTransactionClients } from "@/components/globals/utils";

type TransactionClientCreateInput = Prisma.TransactionClientCreateInput & {
  account_id?: string;
};

export const getAll = async (accountID: string) => {
  let account;

  try {
    account = await prisma.account.findUnique({
      where: { id: accountID },
      include: {
        transaction_clients: {
          include: {
            transactions: {
              orderBy: {
                date: "asc",
              },
            },
          },
        },
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      transactionClients: [],
    };
    return response;
  }

  const transactionClients = formatTransactionClients(
    account?.transaction_clients || []
  );
  const response = {
    code: 200,
    message: "Fetched Clients",
    transactionClients: transactionClients,
  };
  return response;
};


export const create = async (values: TransactionClientCreateInput) => {
  const schema = createSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (errors) {
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

    const response = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  try {
    await prisma.transactionClient.create({
      data: {
        account: { connect: { id: values.account_id } },
        name: values.name,
      },
    });
  } catch {
    const response = { code: 500, message: "Server Error" };
    return response;
  }

  const response = { code: 200, message: "Added Client" };
  return response;
};

export const update = async (values: TransactionClientCreateInput) => {
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
    await prisma.transactionClient.update({
      where: {
        id: values.id,
      },
      data: {
        account: { connect: { id: values.account_id } },
        name: values.name,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  const response: ActionResponse = { code: 200, message: "Updated Client" };
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
    await prisma.transactionClient.delete({
      where: { id: values.id },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  const response: ActionResponse = {
    code: 200,
    message: "Deleted Client",
  };
  return response;
};
