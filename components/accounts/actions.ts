"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import { create as createSchema } from "@/components/accounts/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const model = "Account";

export const getAll = async () => {
  let records = [];

  try {
    records = await prisma.account.findMany();
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      records: [],
    };
    return response;
  }

  const response = {
    code: 200,
    message: `Fetched ${model}s`,
    records: records,
  };
  return response;
};

export const get = async () => {
  const session = await cookies();
  const id = session.get("accountID")?.value;

  let record;

  try {
    record = await prisma.account.findUnique({
      where: {
        id: id,
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      record: record,
    };
    return response;
  }

  const response = {
    code: 200,
    message: `Fetched ${model}`,
    record: record,
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
        th_access: values.th_access,
        cm_access: values.cm_access,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/accounts");
  const response: ActionResponse = { code: 200, message: `Added ${model}` };
  return response;
};
