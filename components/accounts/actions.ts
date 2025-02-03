"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import { create as createSchema } from "@/components/accounts/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getAll = async () => {
  let accounts = [];

  try {
    accounts = await prisma.account.findMany();
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

export const get = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

  let account;

  try {
    account = await prisma.account.findUnique({
      where: {
        id: accountID,
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      account: account,
    };
    return response;
  }

  const response = {
    code: 200,
    message: "Fetched Account",
    account: account,
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

  try {
    await prisma.account.create({
      data: {
        name: values.name,
        transaction_history_access: values.transaction_history_access,
        income_expenses_access: values.income_expenses_access,
        collection_monitoring_access: values.collection_monitoring_access,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/accounts");
  const response: ActionResponse = { code: 200, message: "Added Account" };
  return response;
};
