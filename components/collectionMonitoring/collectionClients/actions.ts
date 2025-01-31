"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import {
  create as createSchema,
  update as updateSchema,
} from "@/components/collectionMonitoring/collectionClients/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { formatCollectionClients } from "@/components/globals/utils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const getAll = async () => {
  const session = await cookies();
const accountID = session.get("accountID")?.value || "";

  let account;

  try {
    account = await prisma.account.findUnique({
      where: { id: accountID },
      include: {
        collection_clients: {
          include: {
            collections: true,
          },
        },
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      collectionClients: [],
    };
    return response;
  }

  const collectionClients = formatCollectionClients(
    account?.collection_clients || []
  );
  const response = {
    code: 200,
    message: "Fetched Clients",
    collectionClients: collectionClients,
  };
  return response;
};

export const create = async (values: Prisma.CollectionClientCreateInput) => {
  const session = await cookies();
const accountID = session.get("accountID")?.value || "";

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
        account: { connect: { id: accountID } },
        name: values.name,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/collection-monitoring/collection-clients");
  const response: ActionResponse = { code: 200, message: "Added Client" };
  return response;
};

export const update = async (values: Prisma.CollectionClientCreateInput) => {
  const session = await cookies();
const accountID = session.get("accountID")?.value || "";

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
        account: { connect: { id: accountID } },
        name: values.name,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/collection-monitoring/collection-clients");
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

  revalidatePath("/collection-monitoring/collection-clients");
  const response: ActionResponse = { code: 200, message: "Deleted Client" };
  return response;
};
