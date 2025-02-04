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
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Destroy } from "@/components/globals/types";

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

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
      accountID: accountID,
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
    accountID: accountID,
  };
  return response;
};

export const get = async (id: string) => {
  let transactionClient;

  try {
    transactionClient = await prisma.transactionClient.findUnique({
      where: { id: id },
      include: {
        transactions: {
          orderBy: {
            date: "asc",
          },
        },
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      transactionClient: null,
    };
    return response;
  }

  const formattedTransactionClient = formatTransactionClients([
    transactionClient,
  ])[0];
  const response = {
    code: 200,
    message: "Fetched Client",
    transactionClient: formattedTransactionClient,
  };
  return response;
};

export const create = async (values: Prisma.TransactionClientCreateInput) => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

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
        account: { connect: { id: accountID } },
        name: values.name,
      },
    });
  } catch {
    const response = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/transaction-history/transaction-clients");
  const response = { code: 200, message: "Added Client" };
  return response;
};

export const update = async (values: Prisma.TransactionClientCreateInput) => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

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
        account: { connect: { id: accountID } },
        name: values.name,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/transaction-history/transaction-clients");
  const response: ActionResponse = { code: 200, message: "Updated Client" };
  return response;
};

export const destroy = async (values: Destroy) => {
  const session = await cookies();
  const otp = session.get("otp")?.value;
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

  if (otp == values.otp) {
    try {
      await prisma.transactionClient.delete({
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

  revalidatePath("/transaction-history/transaction-clients");
  const response: ActionResponse = {
    code: 200,
    message: "Deleted Client",
  };
  return response;
};
