"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "@/components/globals/types";
import {
  create as createSchema,
  update as updateSchema,
} from "@/components/collectionMonitoring/collectionClients/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";

type CollectionClientCreateInput = Prisma.CollectionClientCreateInput & {
  account_id?: string;
};

export const getAll = async () => {
  let collectionClients = [];

  try {
    collectionClients = await prisma.collectionClient.findMany({
      include: { collections: true },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      clients: [],
    };
    return response;
  }

  const response = {
    code: 200,
    message: "Fetched Clients",
    collectionClients: collectionClients,
  };
  return response;
};

export const create = async (values: CollectionClientCreateInput) => {
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
    await prisma.collectionClient.create({
      data: {
        account: { connect: { id: values.account_id } },
        name: values.name,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/collection-clients");
  const response: ActionResponse = { code: 200, message: "Added Client" };
  return response;
};

export const update = async (values: CollectionClientCreateInput) => {
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
    await prisma.collectionClient.update({
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

  revalidatePath("/collection-clients");
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
    await prisma.collectionClient.delete({
      where: { id: values.id },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/collection-clients");
  const response: ActionResponse = { code: 200, message: "Deleted Client" };
  return response;
};
