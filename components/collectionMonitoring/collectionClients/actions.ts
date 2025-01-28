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

export const getAll = async () => {
  let clients = [];

  try {
    clients = await prisma.client.findMany({
      include: { contracts: true },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      clients: [],
    };
    return response;
  }

  const response = { code: 200, message: "Fetched Clients", clients: clients };
  return response;
};

export const create = async (values: Prisma.ClientCreateInput) => {
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

  const nameExists = await prisma.client.findFirst({
    where: { name: values.name },
  });

  if (!nameExists) {
    try {
      await prisma.client.create({ data: { ...values } });
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

  revalidatePath("/clients");
  const response: ActionResponse = { code: 200, message: "Added Client" };
  return response;
};

export const update = async (values: Prisma.ClientCreateInput) => {
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

  const nameExists = await prisma.client.findFirst({
    where: { name: values.name },
  });

  const client = await prisma.client.findFirst({
    where: { id: values.id },
  });

  if (!nameExists || client?.name == values.name) {
    try {
      await prisma.client.update({
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

  revalidatePath("/clients");
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
    await prisma.client.delete({
      where: { id: values.id },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/clients");
  const response: ActionResponse = { code: 200, message: "Deleted Client" };
  return response;
};
