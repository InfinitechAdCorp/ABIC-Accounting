"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import {
  create as createSchema,
  update as updateSchema,
} from "@/components/transactionHistory/tClients/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { formatTClients } from "@/components/globals/utils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Destroy } from "@/components/globals/types";

const model = "Client";
const url = "/transaction-history/clients";

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

  let account;

  try {
    account = await prisma.account.findUnique({
      where: { id: accountID },
      include: {
        t_clients: {
          include: {
            transactions: {
              orderBy: {
                date: "desc",
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
      records: [],
      accountID: accountID,
    };
    return response;
  }

  const records = formatTClients(
    account?.t_clients || []
  );
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

  record = formatTClients([
    record,
  ])[0];
  const response = {
    code: 200,
    message: `Fetched ${model}`,
    record: record,
  };
  return response;
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
  } catch {
    const response = { code: 500, message: "Server Error" };
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
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
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

  revalidatePath(url);
  const response: ActionResponse = {
    code: 200,
    message: `Deleted ${model}`,
  };
  return response;
};
