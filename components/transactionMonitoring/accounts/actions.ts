"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import { revalidatePath } from "next/cache";
import {
  create as createSchema,
  update as updateSchema,
} from "@/components/transactionMonitoring/accounts/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";

export const getAll = async () => {
  let accounts = [];

  try {
    accounts = await prisma.account.findMany({
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
    message: "Fetched Accounts",
    accounts: accounts,
  };
  return response;
};

export const create = async (values: Prisma.AccountCreateInput) => {
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

  const nameExists = await prisma.account.findFirst({
    where: { name: values.name },
  });

  if (!nameExists) {
    try {
      await prisma.account.create({ data: { ...values } });
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

  revalidatePath("/accounts");
  const response: ActionResponse = { code: 200, message: "Added Account" };
  return response;
};

export const update = async (values: Prisma.AccountCreateInput) => {
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

  const nameExists = await prisma.account.findFirst({
    where: { name: values.name },
  });

  const account = await prisma.account.findFirst({
    where: { id: values.id }
  });

  if (!nameExists || account?.name == values.name) {
    try {
      await prisma.account.update({
        where: {
          id: values.id,
        },
        data: {
          name: values.name,
          starting_balance: values.starting_balance,
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

  revalidatePath("/accounts");
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
    await prisma.account.delete({
      where: { id: values.id },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/accounts");
  const response: ActionResponse = {
    code: 200,
    message: "Deleted Account",
  };
  return response;
};
