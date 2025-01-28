"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import { revalidatePath } from "next/cache";
import {
  create as createSchema,
  update as updateSchema,
} from "@/components/transactionHistory/transactionClients/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";

export const getAll = async () => {
  let accounts = [];

  try {
    accounts = await prisma.transactionClient.findMany({
      include: { transactions: true },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      accounts: [],
    };
    return response;
  }

  const response = {
    code: 200,
    message: "Fetched Clients",
    accounts: accounts,
  };
  return response;
};

export const create = async (values: Prisma.TransactionClientCreateInput) => {
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

  const nameExists = await prisma.transactionClient.findFirst({
    where: { name: values.name },
  });

  if (!nameExists) {
    try {
      await prisma.transactionClient.create({ data: { ...values } });
    } catch {
      const response: ActionResponse = { code: 500, message: "Server Error" };
      return response;
    }
  } else {
    const response: ActionResponse = {
      code: 429,
      message: "Name Is Already Taken",
    };
    return response;
  }

  revalidatePath("/transaction-clients");
  const response: ActionResponse = { code: 200, message: "Added Client" };
  return response;
};

export const update = async (values: Prisma.TransactionClientCreateInput) => {
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

  const nameExists = await prisma.transactionClient.findFirst({
    where: { name: values.name },
  });

  const transactionClient = await prisma.transactionClient.findFirst({
    where: { id: values.id },
  });

  if (!nameExists || transactionClient?.name == values.name) {
    try {
      await prisma.transactionClient.update({
        where: {
          id: values.id,
        },
        data: {
          name: values.name,
        },
      });
    } catch {
      const response: ActionResponse = { code: 500, message: "Server Error" };
      return response;
    }
  } else {
    const response: ActionResponse = {
      code: 429,
      message: "Name Is Already Taken",
    };
    return response;
  }

  revalidatePath("/transaction-clients");
  const response: ActionResponse = { code: 200, message: "Updated Account" };
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

  revalidatePath("/transaction-clients");
  const response: ActionResponse = {
    code: 200,
    message: "Deleted Account",
  };
  return response;
};


