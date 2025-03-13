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
  } catch (error) {
    const response = {
      code: 500,
      message: "Server Error",
      records: [],
      error: error,
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
  const id = session.get("id")?.value;

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
        collections_access: values.collections_access,
        listings_access: values.listings_access,
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

  revalidatePath("/accounts");
  const response: ActionResponse = { code: 200, message: `Added ${model}` };
  return response;
};
